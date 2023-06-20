import React, { useContext, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Button from "../../form/Button";
import { AuthContext } from "../../../state/contexts/auth-context";
import { logoutUser } from "../../../state/reducers/auth-reducer";
import { AUTH_USER_STORE_NAME } from "../../../util/localstorage";
import { useNavigate } from "react-router-dom";

interface Props {
  onOpenSidebar: any;
}

function Navbar({ onOpenSidebar }: Props) {
  const { state, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    window.localStorage.removeItem(AUTH_USER_STORE_NAME);
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-between bg-blue-700 border-b border-blue-900 px-2">
      {/* menu button */}
      <button
        className="p-2 hover:rounded-full hover:bg-blue-50 hover:bg-opacity-50 md:hidden"
        onClick={onOpenSidebar}
      >
        <FiMenu className="text-white " />
      </button>

      <h3 className="px-4 py-2 text-xl font-semibold text-white sm:text-3xl">
        Virtual Bingo
      </h3>

      <div className="flex flex-row gap-2 justify-center items-center">
        <p className="text-white text-sm">{state.username}</p>

        <Button
          onClick={handleLogout}
          className="bg-inherit border border-blue-900"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
