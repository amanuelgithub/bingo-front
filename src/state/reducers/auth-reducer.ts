import {
  AuthActions,
  AuthActionTypes,
  LogoutUser,
} from "../actions/auth-actions";
import { AuthState } from "../states/auth-state";

export default function useAuthReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        id: action.id,
        username: action.username,
        phone: action.phone,
        email: action.email,
        isEmailVerified: action.isEmailVerified,
        role: action.role,
        status: action.status,

        access_token: action.access_token,
        isLoggedIn: true,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        id: "",
        username: "",
        phone: "",
        email: "",
        isEmailVerified: undefined,
        role: undefined,
        status: undefined,

        access_token: "",
        isLoggedIn: false,
      };
    }
    default:
      throw new Error("Invalid action");
  }
}

export const logoutUser = (): LogoutUser => ({
  type: AuthActionTypes.LOGOUT,
});
