import React from "react";
import { server } from "../../lib/api/server";

const PLAYERS = `
  query Players {
    players {
      id
      elo
      name
    }
  }
`;

interface Props {
  title: string;
}

export const Players = ({ title }: Props) => {
  const fetchPlayers = async () => {
    const players = await server.fetch({ query: PLAYERS });
    console.log(players);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchPlayers}>Fetch players</button>
    </div>
  );
};
