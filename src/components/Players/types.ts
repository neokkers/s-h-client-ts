export interface Player {
  id: string;
  name: string;
  image: string;
  elo: number;
  won: number;
  lost: number;
  mainVillain: number;
}

export interface PlayersData {
  players: Player[];
}

export interface DeletePlayerData {
  deletePlayer: Player;
}

export interface DeletePlayerVariables {
  id: string;
}
