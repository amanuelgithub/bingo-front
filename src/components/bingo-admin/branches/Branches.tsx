import { useEffect, useState } from "react";
import Button from "../../form/Button";
import { IoAdd } from "react-icons/io5";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";
import CreateBranch from "./CreateBranch";

function Branches() {
  const [createBranch, setCreateBranch] = useState(false);
  const [branches, setBranches] = useState([
    { id: "", name: "", createdAt: "", modifiedAt: "" },
  ]);

  useEffect(() => {
    const { id, isLoggedIn, accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/branches").then((result) => {
      // console.log("branches: ", result.data);
      setBranches(result.data);
    });
  }, []);

  return (
    <div className="px-2">
      <div className="py-2 sm:px-6 lg:px-8 flex flex-row justify-between">
        <h2 className="text-xl ">Branches</h2>

        {!createBranch && (
          <Button
            onClick={() => setCreateBranch(true)}
            className={"flex flex-row justify-center items-center gap-2"}
          >
            <IoAdd />
            <p>add</p>
          </Button>
        )}
      </div>

      <div className={`${!createBranch ? "hidden" : "block"}`}>
        <CreateBranch onCreateBranch={setCreateBranch} />
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
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Create At
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Modified At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr className="border-b bg-neutral-100">
                      {/* <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"> */}
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {branch.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.createdAt}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {branch.modifiedAt}
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

export default Branches;
