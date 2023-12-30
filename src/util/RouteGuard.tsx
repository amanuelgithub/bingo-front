import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRoleEnum } from "../models/IUser";
import { AUTH_USER_STORE_NAME } from "./localstorage";

export default function RouteGuard({
  allowedRole,
}: {
  allowedRole: UserRoleEnum;
}) {
  if (localStorage.getItem(AUTH_USER_STORE_NAME)) {
    const { isLoggedIn, role } = JSON.parse(
      localStorage.getItem(AUTH_USER_STORE_NAME) ?? ""
    );

    return isLoggedIn && role === allowedRole ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" />
    );
  }

  return <Navigate to="/signin" />;
}
