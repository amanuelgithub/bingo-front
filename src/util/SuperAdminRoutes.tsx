import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRoleEnum } from "../models/IUser";
import { AUTH_USER_STORE_NAME } from "./localstorage";

export default function SuperAdminRoutes() {
  if (localStorage.getItem(AUTH_USER_STORE_NAME)) {
    const { isLoggedIn, role } = JSON.parse(
      localStorage.getItem(AUTH_USER_STORE_NAME) ?? ""
    );

    console.log("from localstorage: isLogggedIn:", isLoggedIn);

    return isLoggedIn && role === UserRoleEnum.SUPER_ADMIN ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" />
    );
  }

  return <Navigate to="/signin" />;
}
