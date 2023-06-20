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

  accessToken: string;
  isLoggedIn: boolean;
}

export const AUTH_USER_STORE_NAME = "bingo-auth-user";
export const BOOKING_STORE_NAME = "bookingData";

/** stores authenticated user data to - localstorage */
export function storeAuthUser(authUser: IAuthUser) {
  window.localStorage.setItem(AUTH_USER_STORE_NAME, JSON.stringify(authUser));
}

/** returns authenticated user data from - localstorage */
export function getAuthUser(): IAuthUser {
  return JSON.parse(
    window.localStorage.getItem(AUTH_USER_STORE_NAME) ?? ""
  ) as IAuthUser;
}
