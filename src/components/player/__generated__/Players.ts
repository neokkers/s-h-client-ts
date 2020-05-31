/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: player
// ====================================================

export interface Players_players {
  __typename: "Player";
  id: string;
  elo: number;
  name: string;
  image: string;
  won: number;
  lost: number;
  mainVillain: number;
}

export interface Players {
  players: Players_players[];
}
