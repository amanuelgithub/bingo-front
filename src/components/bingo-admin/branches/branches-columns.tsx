import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import IBranch from "../../../models/IBranch";

export const columns: ColumnDef<IBranch>[] = [
  { accessorKey: "id", header: "# ID" },
  { accessorKey: "name", header: "Branch Name" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "modifiedAt", header: "Modified At" },
];
