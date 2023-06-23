export enum GameStateEnum {
  CREATED = "CREATED",
  PAUSED = "PAUSED",
  PLAYING = "PLAYING",
  END = "END",
}

export interface IGame {
  id: string;
  branchId: string;
  cashierId: string;
  money: number;
  state: GameStateEnum | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
}
