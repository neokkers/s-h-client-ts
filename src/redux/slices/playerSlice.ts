import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { Player, PlayersData } from "../../components/player/types";
import { server } from "../../lib/api/server";

const PLAYERS = `
  query Players {
    players {
      id
      elo
      name
      image
      won
      lost
      mainVillain
    }
  }
`;

const DELETE_PLAYER = `
  mutation DeletePlayer($id: ID!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

interface InfoStates {
  loading: boolean;
  error: boolean;
}

interface PlayerState {
  players: Player[] | null;
  query: InfoStates;
  mutation: InfoStates;
}

const initialState: PlayerState = {
  players: null,
  query: {
    loading: false,
    error: false,
  },
  mutation: {
    loading: false,
    error: false,
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    setQuery: (state, action: PayloadAction<InfoStates>) => {
      state.query = action.payload;
    },
    setMutation: (state, action: PayloadAction<InfoStates>) => {
      state.mutation = action.payload;
    },
  },
});

export const { setPlayers, setQuery, setMutation } = playerSlice.actions;

export const fetchPlayers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setQuery({ loading: true, error: false }));
    const { data, errors } = await server.fetch<PlayersData>({
      query: PLAYERS,
    });
    console.log(data);
    if (errors && errors.length) throw new Error(errors[0].message);
    dispatch(setPlayers(data.players));
    dispatch(setQuery({ loading: false, error: false }));
    console.log(`${data} loaded (useQuery hook)`);
  } catch (e) {
    dispatch(setQuery({ loading: false, error: true }));
    throw console.error(e);
  }
};

export const selectPlayers = (state: RootState) => state.player.players;
export const selectQuery = (state: RootState) => state.player.query;
export const selectMutation = (state: RootState) => state.player.mutation;

export default playerSlice.reducer;
