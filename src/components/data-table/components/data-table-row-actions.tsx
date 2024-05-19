import { Pencil1Icon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "../../ui/button";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  return (
    <div>
      <Button variant={"outline"} size={"icon"} className="rounded-full text-primary hover:text-primary">
        <Pencil1Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
