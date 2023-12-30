import { useEffect, useState } from "react";
import API from "../../../config/api";
import { IoAdd } from "react-icons/io5";
import { getAuthUser } from "../../../util/localstorage";
import CreateAgent from "./CreateAgent";
import { Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../ui/DataTable";
import { columns } from "./agents-columns";
import { Button } from "../../ui/button";

function Agents() {
  const [agentCreated, setAgentCreated] = useState(false);
  const [createAgentFormOpen, setCreateAgentFormOpen] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchAgents = () => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/agents")
      .then((result) => {
        setAgents(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // agent-created -> refetch agents
  useEffect(() => {
    if (agentCreated) {
      fetchAgents();
    }

    return () => {
      setAgentCreated(false);
    };
  }, [agentCreated]);

  return (
    <div className="px-2">
      <Toaster />

      <div className="flex flex-row justify-between py-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Agents</h2>
        <CreateAgent setAgentCreated={setAgentCreated} />
      </div>

      <DataTable columns={columns} data={agents} />

      {/* Loading */}
      {agents && agents.length <= 0 ? (
        <div className="flex w-full items-center justify-center">
          <ReactLoading
            type={"spokes"}
            color={"#4d4dff"}
            height={32}
            width={32}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Agents;
