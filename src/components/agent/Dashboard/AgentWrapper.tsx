import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../state/contexts/auth-context";
import API from "../../../config/api";
import { getAuthUser, storeAuthUser } from "../../../util/localstorage";
import Dashboard from "./Dashboard";
import { AuthActionTypes } from "../../../state/actions/auth-actions";

function AgentWrapper() {
  const [completed, setCompleted] = useState(false);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const { id, isLoggedIn, accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/users/${id}`).then((result) => {
      const user = result.data;

      console.log("find one user: ", user.agent.branchId);

      dispatch({
        type: AuthActionTypes.LOGIN,
        id: user.id,
        username: user.username,
        phone: user.phone,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        role: user.role,
        status: user.status,

        branchId: user.agent.branchId,

        agentId: user.agent.id,
        cashierId: undefined,

        access_token: accessToken,
        isLoggedIn,
      });

      storeAuthUser({
        ...getAuthUser(),
        branchId: user.agent.branchId,
        agentId: user.agent.id,
        cashierId: undefined,
      });

      setCompleted(true);
    });
  }, []);

  return <div>{completed && <Dashboard />}</div>;
}

export default AgentWrapper;
