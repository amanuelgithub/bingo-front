import { useEffect, useState } from "react";
import API from "../../../config/api";
import { IoAdd } from "react-icons/io5";
import { getAuthUser } from "../../../util/localstorage";
import Button from "../../form/Button";
import CreateAgent from "./CreateAgent";

function Agents() {
  const [createAgent, setCreateAgent] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    const { id, isLoggedIn, accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/agents").then((result) => {
      console.log("agents: ", result.data);
      setAgents(result.data);
    });
  }, []);

  return (
    <div className="px-2">
      <div className={`${!createAgent ? "hidden" : "block"}`}>
        <CreateAgent onCreateAgent={setCreateAgent} />
      </div>

      <div className="flex flex-row justify-between py-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Agents</h2>

        {!createAgent && (
          <Button
            onClick={() => setCreateAgent(true)}
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
                  </tr>
                </thead>
                <tbody>
                  {agents.map((branch) => (
                    <tr className="border-b bg-neutral-100">
                      {/* <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"> */}
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {branch.userId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.user.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.user.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.user.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.user.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agents;
