export enum CardStateEnum {
  NORMAL = "NORMAL",
  WIN = "WIN",
}

export interface IPlay {
  id: string;
  branchId: string;
  cashierId: string;
  gameId: string;
  cardId: string;
  money: number;
  cardState: CardStateEnum;
}
