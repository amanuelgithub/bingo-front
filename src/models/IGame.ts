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

export interface IGameData {
  gameState: GameStateEnum;
  currentIndex: number;
  playingNumbers: number[];
}

export interface IGameSocketMessage {
  room?: string; // gameId + cashierId
  gameId?: string;
  soundLang: "am" | "or" | string;
  soundUrl: string;
  gameData: IGameData;
}
