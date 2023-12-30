import { ColumnDef } from "@tanstack/react-table";
import IAgent from "../../../models/IAgent";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export const columns: ColumnDef<IAgent>[] = [
  { accessorKey: "user.username", header: "Username" },
  { accessorKey: "user.phone", header: "Phone No" },
  { accessorKey: "user.email", header: "Email" },
  { accessorKey: "user.status", header: "User Status" },
  {
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => {
      const id: string = row.getValue("id");

      return (
        <Link to={`/admin-dashboard/agent-detail/${id}`}>
          <Button size={"sm"} variant={"link"}>
            Detail
          </Button>
        </Link>
      );
    },
  },
];
