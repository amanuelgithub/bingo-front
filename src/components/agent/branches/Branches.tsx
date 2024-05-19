import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { getAuthUser } from "../../../util/localstorage";
import API from "../../../config/api";
import { DataTable, DataTableColumnHeader } from "../../data-table";
import EditBranch from "./EditBranch";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import IBranch from "../../../models/IBranch";
import getBranchColumns from "./columns";

export default function Branches() {
  const { agentId, accessToken } = getAuthUser();
  const [branches, setBranches] = useState([]);
  const [branchUpdated, setBranchUpdated] = useState(false);

  // selected branch id
  const [branchId, setBranchId] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleEditBranch = (branchId: string) => {
    console.log("Edit branch: ", branchId);
    setBranchId(branchId);
    handleModalOpen();
  };

  const columns: ColumnDef<IBranch>[] = getBranchColumns(handleEditBranch);

  // columns end

  useEffect(() => {
    fetchAgentBranches();
  }, []);

  // branch-created -> refetch branches
  useEffect(() => {
    if (branchUpdated) {
      fetchAgentBranches();
    }

    return () => {
      setBranchUpdated(false);
    };
  }, [branchUpdated]);

  const fetchAgentBranches = () => {
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    API.get(`/branches/${agentId}`)
      .then((result) => {
        setBranches(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <Card>
      <CardHeader>
        <h2>Branches</h2>
      </CardHeader>
      <CardContent>
        <EditBranch
          handleModalOpen={handleModalOpen}
          isOpen={isOpen}
          setBranchUpdated={setBranchUpdated}
          branchId={branchId}
        />

        <DataTable data={branches} columns={columns} />
      </CardContent>
    </Card>
  );
}
