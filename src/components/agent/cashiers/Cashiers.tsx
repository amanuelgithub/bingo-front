import { useEffect, useState } from "react";
import API from "../../../config/api";
import { IoAdd } from "react-icons/io5";
import { getAuthUser } from "../../../util/localstorage";
import Button from "../../form/Button";
import CreateCashier from "./CreateCashier";
import { Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

function Cashiers() {
  const [cashierCreated, setCashierCreated] = useState(false);
  const [createAgentFormOpen, setCreateAgentFormOpen] = useState(false);
  const [cashiers, setCashiers] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchCashiers = () => {
    const { accessToken, agentId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/cashiers/agent-branches/${agentId}`)
      .then((result) => {
        setCashiers(result.data);
        console.log("cashiers:  ", result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  // cashier-created -> refetch cashiers
  useEffect(() => {
    if (cashierCreated) {
      fetchCashiers();
    }

    return () => {
      setCashierCreated(false);
    };
  }, [cashierCreated]);

  return (
    <div className="px-2">
      <Toaster />

      <div className={`${!createAgentFormOpen ? "hidden" : "block"}`}>
        <CreateCashier
          cashierCreated={cashierCreated}
          setCreateCashierFormOpen={setCreateAgentFormOpen}
          setCashierCreated={setCashierCreated}
        />
      </div>

      <div className="flex flex-row justify-between py-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Cashiers</h2>

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
                      Branch
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cashiers &&
                    cashiers.map((cashier, index) => (
                      <tr className="border-b bg-neutral-100">
                        {/* <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"> */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashier.user.username}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashier.user.role}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashier.user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashier.user.phone}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashier.branch.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cashier.user.status}
                        </td>
                        <td
                          onClick={() =>
                            navigate("/agent-dashboard/cashier-detail", {
                              state: { cashierId: cashier.id },
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
      {cashiers && cashiers.length <= 0 ? (
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

export default Cashiers;
