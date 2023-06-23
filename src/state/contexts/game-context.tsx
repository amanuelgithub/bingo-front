import React, { useReducer, createContext, useMemo } from "react";
import { GameState, initialGameState } from "../states/game-state";
import { GameActions } from "../actions/game-actions";
import useGameReducer from "../reducers/game-reducer";

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
}>({ state: initialGameState, dispatch: () => undefined });

export default function GameContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(useGameReducer, initialGameState);

  const authProviderValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <GameContext.Provider value={authProviderValue}>
      {children}
    </GameContext.Provider>
  );
}
