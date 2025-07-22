import type { ColumnDef } from "@tanstack/react-table";
import type client from "@zaptalk/api-client/index.js";
import type { InferResponseType } from "@zaptalk/api-client/index.js";
import { DataTableColumnHeader } from "../../column/data-table-column-header";
import CurrentFriendListActions from "./actions";

export type TCurrentFriendList = InferResponseType<
 typeof client.api.friends.$get,
 200
>["data"][0];

export const columns: ColumnDef<TCurrentFriendList>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Friend" />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center gap-3 ml-3" key={data.id}>
          <img
            className="shrink-0 rounded-full"
            src={data.image || ""}
            width={40}
            height={40}
            alt="Avatar"
          />
          <div className="space-y-0.5">
            <p>
              <span className="text-sm font-medium hover:underline">
                {data.name}
              </span>
            </p>

            <p className="text-muted-foreground text-xs">
              @
              {data.email}
            </p>
          </div>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      const data = row.original;

      return data.name.includes(value) || data.name.includes(value);
    },
  },
  {
    id: "action",
    cell: ({ row }) => (
      <CurrentFriendListActions data={row.original} />
    ),
  },
];
