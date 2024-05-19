import { ColumnDef } from "@tanstack/react-table";

import IBranch from "../../../models/IBranch";
import { DataTableColumnHeader } from "..";

export const columns: ColumnDef<IBranch>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
    cell: ({ row }) => (
      <div className="">
        {
          String(row.getValue("id")).length > 10
            ? String(row.getValue("id")).substring(0, 10) + "..."
            : row.getValue("id")

          // row.getValue("id")
        }
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "houseEdge",
    header: ({ column }) => <DataTableColumnHeader column={column} title="House Edge" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue("houseEdge")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    // cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
