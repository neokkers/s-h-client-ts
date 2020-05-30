import React, { useEffect, useState } from "react";
import { server } from "../../lib/api/server";
import {
  PlayersData,
  DeletePlayerData,
  DeletePlayerVariables,
  Player,
} from "./types";
import { useQuery } from "../../lib/api/useQuery";

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
  const { data, refetch } = useQuery<PlayersData>(PLAYERS);

  const deletePlayer = async (id: string) => {
    const { data } = await server.fetch<
      DeletePlayerData,
      DeletePlayerVariables
    >({ query: DELETE_PLAYER, variables: { id } });
    console.log("player deleted");
    await refetch();
  };

  const players = data ? data.players : null;

  const playersList = players && (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          {player.name}
          <button onClick={() => deletePlayer(player.id)}>delete</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2>{title}</h2>
      {/*<button onClick={fetchPlayers}>Fetch players</button>*/}
      {/*<button onClick={deletePlayer}>Delete player</button>*/}
      <hr />
      {playersList}
    </div>
  );
};
