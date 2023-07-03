import { useEffect, useState } from "react";
import API from "../../../config/api";
import { IoAdd } from "react-icons/io5";
import { getAuthUser } from "../../../util/localstorage";
import Button from "../../form/Button";
import CreateAgent from "./CreateAgent";
import { Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";

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

      <div className={`${!createAgentFormOpen ? "hidden" : "block"}`}>
        <CreateAgent
          setCreateAgentFormOpen={setCreateAgentFormOpen}
          setAgentCreated={setAgentCreated}
        />
      </div>

      <div className="flex flex-row justify-between py-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Agents</h2>

        {!createAgentFormOpen && (
          <Button
            onClick={() => setCreateAgentFormOpen(true)}
            className={"flex flex-row items-center justify-center gap-2"}
          >
            <IoAdd />
            <p>add</p>
          </Button>
        )}
      </div>

      <div className="flex flex-col">
        {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium">
                  {/* <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"> */}
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {agents &&
                    agents.map((agent, index) => (
                      <tr className="border-b bg-neutral-100" key={agent.id}>
                        {/* <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"> */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {agent.user.username}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {agent.user.role}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {agent.user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {agent.user.phone}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {agent.user.status}
                        </td>
                        <td
                          onClick={() =>
                            navigate("/admin-dashboard/agent-detail", {
                              state: { agentId: agent.id },
                            })
                          }
                          className="whitespace-nowrap px-6 py-4 text-sm text-green-600 underline hover:cursor-pointer"
                        >
                          view detail
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
