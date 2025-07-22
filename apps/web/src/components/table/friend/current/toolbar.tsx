import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { DataTableViewOptions } from "../../column/data-table-view-options";
import NewFriendRequestDialog from "./new-friend-request-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  "use no memo";

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)}
          className="h-8 w-full md:w-[300px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <DataTableViewOptions table={table} />
        <NewFriendRequestDialog />
      </div>
    </div>
  );
}
