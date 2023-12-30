import { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../state/contexts/auth-context";
import { logoutUser } from "../../state/reducers/auth-reducer";
import { AUTH_USER_STORE_NAME } from "../../util/localstorage";
import { Button } from "../ui/button";

interface Props {
  handleOpenSidebar: () => void;
}

function Navbar({ handleOpenSidebar }: Props) {
  const { state, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    window.localStorage.removeItem(AUTH_USER_STORE_NAME);
    navigate("/signin");
  };

  return (
    <div className="flex flex-row items-center justify-between px-6">
      {/* menu button */}
      <Button
        variant={"ghost"}
        onClick={handleOpenSidebar}
        className="rounded-full"
      >
        <FiMenu />
      </Button>

      <h3 className="px-4 py-2 text-xl font-semibold  sm:text-3xl">
        Virtual Bingo
      </h3>

      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-sm">{state.username}</p>

        <Button variant={"outline"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
