import { GameActionTypes, GameActions } from "../actions/game-actions";
import { GameState } from "../states/game-state";

export default function useGameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case GameActionTypes.CREATED: {
      return {
        ...state,
        id: action.id,
        branchId: action.branchId,
        cashierId: action.cashierId,
        money: action.money,
        state: action.state,
        startTime: action.startTime,
        endTime: action.endTime,
      };
    }

    default:
      throw new Error("Invalid action");
  }
}
