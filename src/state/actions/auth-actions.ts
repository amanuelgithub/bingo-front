import { UserStatusEnum, UserRoleEnum } from "../../models/IUser";
// import { UserTypeEnum } from "../../models/IUser";

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface LoginUser {
  type: AuthActionTypes.LOGIN;
  id: string;
  username: string;
  phone: string;
  email: string;
  isEmailVerified: boolean | undefined;
  role: UserRoleEnum | undefined;
  status: UserStatusEnum | undefined;

  branchId: string | undefined;

  // ADDITIONAL INFORMATION TO STORE //
  access_token: string;
  isLoggedIn: boolean;
}

export interface LogoutUser {
  type: AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginUser | LogoutUser;
