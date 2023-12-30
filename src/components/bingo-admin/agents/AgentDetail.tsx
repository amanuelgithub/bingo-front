import { useEffect, useState } from "react";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

function AgentDetail() {
  const [query, setQuery] = useState<any>();
  const [agents, setAgents] = useState<any>();
  const [agent, setAgent] = useState<any>();

  const { id: agentId } = useParams();

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
    console.log("branches: ", branches);
  }, [branches]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleBranchSelection = (e: any) => {
    setSelectedBranchId(e);
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
    if (agentId) {
      // @ts-ignore
      fetchAgent(agentId);
    }
    // @ts-ignore
  }, [agentId]);

  useEffect(() => {
    setQuery("");
  }, [agent]);

  return (
    <div className="p-2">
      <Input
        placeholder="search agent by email..."
        onChange={(e) => handleQueryChange(e)}
      />

      <div className="mt-4  border border-gray-300">
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
        <div className="flex flex-col items-start justify-center gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {/* left section */}

          <Card className="flex w-full flex-col gap-1">
            <CardHeader>
              <CardTitle>Agent Info</CardTitle>

              <hr />
            </CardHeader>
            {/* <h1 className="text-lg font-bold text-gray-800"></h1> */}

            <CardContent>
              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Username
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"} </span>{" "}
                  {agent?.user?.username ?? ""}
                </span>
              </p>

              <hr />

              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Phone
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"} </span>{" "}
                  {agent?.user?.Phone ?? ""}
                </span>
              </p>

              <hr />

              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Email
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"}</span>{" "}
                  {agent?.user?.email ?? ""}
                </span>
              </p>

              <hr />

              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Email Verified
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"}</span>{" "}
                  {agent?.user?.isEmailVerified ?? ""}
                </span>
              </p>

              <hr />

              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Role
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"} </span>{" "}
                  {agent?.user?.role ?? ""}
                </span>
              </p>

              <hr />

              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Status
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"} </span>{" "}
                  {agent?.user?.status ?? ""}
                </span>
              </p>

              <hr />

              <p className="flex items-center justify-between gap-2">
                <h3 className="w-2/5 text-start text-base font-semibold uppercase text-muted-foreground">
                  * Phone
                </h3>

                <span className="w-3/5 text-start">
                  <span className="text-lg font-bold"> {"=>"}</span>{" "}
                  {agent?.user?.Phone ?? ""}
                </span>
              </p>

              <hr />
            </CardContent>
          </Card>

          {/* right section */}
          <div className="flex w-full flex-col justify-end">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="w-full">
                {/* BranchId */}
                <Select
                  name="branchId"
                  onValueChange={(e: string) => handleBranchSelection(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Branches</SelectLabel>

                      {branches && (
                        <>
                          {branches.map((branch) => (
                            <SelectItem value={branch.id}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                onClick={handleAddBranchToAgent}
                size={"sm"}
                // className="flex items-center justify-end gap-2 border border-green-500 bg-green-500 px-4 py-2 text-white"
              >
                <AiOutlinePlus className="text-white" />
                Add
              </Button>
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
                            Agent's Branches
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
