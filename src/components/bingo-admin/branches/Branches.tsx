import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import API from "../../../config/api";
import { getAuthUser } from "../../../util/localstorage";
import CreateBranch from "./CreateBranch";
import { Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";
import DataTable from "../../ui/DataTable";
import { columns } from "./branches-columns";
import IBranch from "../../../models/IBranch";
import { Button } from "../../ui/button";

function Branches() {
  const [branchCreated, setBranchCreated] = useState(false);
  const [createBranchFormOpen, setCreateBranchFormOpen] = useState(false);
  const [branches, setBranches] = useState<IBranch[]>([]);

  const fetchBranches = () => {
    const { accessToken } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get("/branches")
      .then((result) => {
        setBranches(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // branch-created -> refetch branches
  useEffect(() => {
    if (branchCreated) {
      fetchBranches();
    }

    return () => {
      setBranchCreated(false);
    };
  }, [branchCreated]);

  return (
    <div className="px-2">
      <Toaster />

      <div className="flex flex-row justify-between py-2 sm:px-6 lg:px-8">
        <h2 className="text-xl ">Branches</h2>

        <CreateBranch setBranchCreated={setBranchCreated} />
      </div>

      <div className={`${!createBranchFormOpen ? "hidden" : "block"}`}></div>

      <DataTable columns={columns} data={branches} />

      {/* Loading */}
      {branches && branches.length <= 0 ? (
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

export default Branches;
