import { UserStatusEnum, UserRoleEnum } from "../../models/IUser";

export interface AuthState {
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

export const initialAuthState: AuthState = {
  id: "",
  username: "",
  phone: "",
  email: "",
  isEmailVerified: undefined,
  role: undefined,
  status: undefined,

  branchId: undefined,

  // ADDITIONAL INFORMATION TO STORE //
  access_token: "",
  isLoggedIn: false,
};
