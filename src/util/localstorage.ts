import { IGame } from "../models/IGame";
import { UserRoleEnum, UserStatusEnum } from "../models/IUser";

interface IAuthUser {
  id: string;
  username: string;
  phone: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRoleEnum;
  status: UserStatusEnum;

  branchId: string | undefined;

  // cashierId or agentId
  cashierId: string | undefined;
  agentId: string | undefined;

  accessToken: string;
  isLoggedIn: boolean;
}

export const AUTH_USER_STORE_NAME = "bingo-auth-user";
export const ACTIVE_GAME_STORE_NAME = "active-game";

/** stores authenticated user data to - localstorage */
export function storeAuthUser(authUser: IAuthUser) {
  window.localStorage.setItem(AUTH_USER_STORE_NAME, JSON.stringify(authUser));
}

/** returns authenticated user data from - localstorage */
export function getAuthUser(): IAuthUser {
  if (localStorage.getItem(AUTH_USER_STORE_NAME)) {
    return JSON.parse(
      localStorage.getItem(AUTH_USER_STORE_NAME) ?? ""
    ) as IAuthUser;
  }

  return {} as IAuthUser;
}

/** stores active game data to - localstorage */
export function storeActiveGame(activeGame: IGame) {
  window.localStorage.setItem(
    ACTIVE_GAME_STORE_NAME,
    JSON.stringify(activeGame)
  );
}

/** returns active game data from - localstorage */
export function getActiveGame(): IGame {
  if (localStorage.getItem(ACTIVE_GAME_STORE_NAME)) {
    return JSON.parse(
      localStorage.getItem(ACTIVE_GAME_STORE_NAME) ?? ""
    ) as IGame;
  }

  return {} as IGame;
}
