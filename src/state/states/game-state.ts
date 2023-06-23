import { GameStateEnum } from "../../models/IGame";

export interface GameState {
  id: string;
  branchId: string;
  cashierId: string;
  money: number;
  state: GameStateEnum | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
}

export const initialGameState: GameState = {
  id: "",
  branchId: "",
  cashierId: "",
  money: 10,
  state: undefined,
  startTime: undefined,
  endTime: undefined,
};
