import React from "react";
import { server } from "../../lib/api/server";
import { PlayersData, DeletePlayerData, DeletePlayerVariables } from "./types";

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

interface Props {
  title: string;
}

export const Players = ({ title }: Props) => {
  const fetchPlayers = async () => {
    const { data } = await server.fetch<PlayersData>({ query: PLAYERS });
    console.log(data);
  };
  const deletePlayer = async () => {
    const { data } = await server.fetch<
      DeletePlayerData,
      DeletePlayerVariables
    >({ query: DELETE_PLAYER, variables: { id: "5ec50ae7363f4be1d80c9e06" } });
    console.log(data);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchPlayers}>Fetch players</button>
      <button onClick={deletePlayer}>Delete player</button>
    </div>
  );
};
