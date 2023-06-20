import React, { useReducer, createContext, useMemo } from "react";
import { AuthActions } from "../actions/auth-actions";
import useAuthReducer from "../reducers/auth-reducer";
import { AuthState, initialAuthState } from "../states/auth-state";

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthActions>;
}>({ state: initialAuthState, dispatch: () => undefined });

export default function AuthContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(useAuthReducer, initialAuthState);

  const authProviderValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}
