import friendRequestStatusMap, { friendRequestStatusMapKeys } from "@/web/assets/maps/friend-request-status.map";
import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import DataTableFacetedFilter from "../../column/data-table-faceted-filter";
import { DataTableViewOptions } from "../../column/data-table-view-options";

interface FriendPendingRequestToolbarProps<TData> {
  table: Table<TData>;
}

/**
 * Toolbar for managing friend request status.
 */
export default function FriendPendingRequestToolbar<TData>({ table }: FriendPendingRequestToolbarProps<TData>) {
  "use no memo";

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter sent requests..."
          value={(table.getColumn("sentFrom")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("sentFrom")?.setFilterValue(event.target.value)}
          className="h-8 w-full md:w-[300px]"
        />
        {
          table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              optionKeys={friendRequestStatusMapKeys}
              options={friendRequestStatusMap}
            />
          )
        }
        {
          isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
              Reset
              <XIcon />
            </Button>
          )
        }
      </div>
      <div className="flex gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
