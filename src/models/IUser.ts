export enum UserRoleEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  AGENT = "AGENT",
  CASHIER = "CASHIER",
}

export enum UserStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUser {
  id: string;
  username: string;
  phone: string;
  email: string;
  isEmailVerified: boolean | undefined;
  role: UserRoleEnum | undefined;
  status: UserStatusEnum | undefined;
}
