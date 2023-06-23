import { GameStateEnum } from "../../models/IGame";

export enum GameActionTypes {
  CREATED = "CREATED",
}

export interface GameCreated {
  type: GameActionTypes.CREATED;
  id: string;
  branchId: string;
  cashierId: string;
  money: number;
  state: GameStateEnum | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
}

export type GameActions = GameCreated;
