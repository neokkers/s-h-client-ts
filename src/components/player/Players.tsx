import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   PlayersData,
//   DeletePlayerData,
//   DeletePlayerVariables,
//   Player,
// } from "./types";
import { Players as PlayersData } from "./__generated__/Players";
import {
  DeletePlayer as DeletePlayerData,
  DeletePlayerVariables,
} from "./__generated__/DeletePlayer";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
// import { useMutation } from "../../lib/api/useMutation";
import { fetchPlayers, selectPlayers } from "../../redux/slices/playerSlice";

const PLAYERS = gql`
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

const DELETE_PLAYER = gql`
  mutation DeletePlayer($id: ID!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Players = ({ title }: Props) => {
  // redux

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchPlayers());
  // }, []);
  //
  // const players = useSelector(selectPlayers);

  // ----------

  // apollo

  const { data, refetch, loading, error } = useQuery<PlayersData>(PLAYERS);
  const [
    deletePlayer,
    { loading: deletePlayerLoading, error: deletePlayerError },
  ] = useMutation<DeletePlayerData, DeletePlayerVariables>(DELETE_PLAYER);

  const handleDeletePlayer = async (id: string) => {
    await deletePlayer({ variables: { id } });
    console.log("player deleted");
    refetch();
  };

  const players = data ? data.players : null;

  const playersList = players && (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          {player.name}
          <button onClick={() => handleDeletePlayer(player.id)}>delete</button>
        </li>
      ))}
    </ul>
  );

  if (loading) return <h2>loading...</h2>;
  if (error) return <h2>Sorry somthg went wrong</h2>;

  const deletePlayerLoadingMessage = deletePlayerLoading ? (
    <h4>Deleting...</h4>
  ) : null;
  const deletePlayerErrorMessage = deletePlayerError ? (
    <h4>Something went wrong in deleting</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {/*<button onClick={fetchPlayers}>Fetch players</button>*/}
      {/*<button onClick={deletePlayer}>Delete player</button>*/}
      <hr />
      {playersList}
      {deletePlayerLoadingMessage}
      {deletePlayerErrorMessage}

      {/* --redux-- */}
      {/*{players && players.map((el) => <h2 key={el.id}>{el.name}</h2>)}*/}
    </div>
  );
};
