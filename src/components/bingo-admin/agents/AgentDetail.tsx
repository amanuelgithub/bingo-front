import React, { useEffect, useState } from "react";
import TextField from "../../form/TextField";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";

function AgentDetail() {
  const [query, setQuery] = useState<any>();
  const [agents, setAgents] = useState<any>();
  const [agent, setAgent] = useState<any>();

  const { state } = useLocation();

  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [branches, setBranches] = useState([
    { id: "", name: "", createdAt: "", modifiedAt: "" },
  ]);

  // get list of branches
  useEffect(() => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/branches").then((result) => {
      setBranches(result.data);
    });
  }, []);

  const fetchAgents = () => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/agents")
      .then((result) => {
        setAgents(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const fetchAgent = (agentId: string) => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/agents/${agentId}`)
      .then((result) => {
        setAgent(result.data);
        console.log("agent: ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleBranchSelection = (e: any) => {
    setSelectedBranchId(e.target.value);
  };

  const handleAgentSelection = (agentId: string) => {
    fetchAgent(agentId);
  };

  const handleAddBranchToAgent = () => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.patch(`/agents/add-branch/${agent?.id}/${selectedBranchId}`)
      .then((result) => {
        // setAgent(result.data);
        console.log("add-branch-result: ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    // @ts-ignore
    if (state?.agentId) {
      // @ts-ignore
      fetchAgent(state.agentId);
    }
    // @ts-ignore
  }, [state]);

  useEffect(() => {
    setQuery("");
  }, [agent]);

  return (
    <div className="p-2">
      <TextField
        placeholder="search agent by email..."
        onChange={(e) => handleQueryChange(e)}
      />

      <div className="border border-gray-300">
        {query &&
          agents
            .filter((agent: any) => agent.user.email.includes(query))
            .map((agent: any) => (
              <div
                key={agent.id}
                className="flex flex-row bg-white px-4 py-1 hover:cursor-pointer hover:bg-gray-100"
                onClick={() => handleAgentSelection(agent.id)}
              >
                <p>{agent.user.email}</p>
              </div>
            ))}
      </div>

      {agent && (
        <div className="flex flex-col items-start justify-center sm:flex-row sm:justify-between sm:p-16">
          {/* left section */}
          <div className="flex w-full flex-col gap-1">
            <h1 className="text-lg font-bold text-gray-800">Agent Info</h1>
            <hr />

            <h3>* Username: {agent?.user?.username ?? ""}</h3>
            <hr />
            <h3>* Phone: {agent?.user?.Phone ?? ""}</h3>
            <hr />
            <h3>* Email: {agent?.user?.email ?? ""}</h3>
            <hr />
            <h3>* Email Verified: {agent?.user?.isEmailVerified ?? ""}</h3>
            <hr />
            <h3>* Role: {agent?.user?.role ?? ""}</h3>
            <hr />
            <h3>* Status: {agent?.user?.status ?? ""}</h3>
            <hr />
          </div>

          {/* right section */}
          <div className="flex w-full flex-col justify-end">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="w-full">
                {/* BranchId */}
                <select
                  id="branchId"
                  name="branchId"
                  //   as="select"
                  className="w-full border-2 border-black py-2"
                  onChange={(e) => handleBranchSelection(e)}
                >
                  {branches && (
                    <>
                      <option value="">select branch</option>
                      {branches.map((branch) => (
                        <option value={branch.id}>{branch.name}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              <button
                type="button"
                onClick={handleAddBranchToAgent}
                className="flex items-center justify-end gap-2 border border-green-500 bg-green-500 px-4 py-2 text-white"
              >
                <AiOutlinePlus className="text-white" />
                Add
              </button>
            </div>

            <div className="">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-white font-medium">
                        {/* <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"> */}
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Branch Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {agent?.branches &&
                          agent?.branches?.map((branch: any, index: number) => (
                            <tr className="border-b bg-neutral-100">
                              {/* <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"> */}
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {branch.name}
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
        </div>
      )}
    </div>
  );
}

export default AgentDetail;
