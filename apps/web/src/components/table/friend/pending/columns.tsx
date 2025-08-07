import friendRequestStatusMap from "@/web/assets/maps/friend-request-status.map";
import { Avatar, AvatarFallback, AvatarImage } from "@/web/components/ui/avatar";
import type { ColumnDef } from "@tanstack/react-table";
import type client from "@zaptalk/api-client/index.js";
import type { InferResponseType } from "@zaptalk/api-client/index.js";
import { DataTableColumnHeader } from "../../column/data-table-column-header";
import FriendRequestPendingActions from "./actions";

export type TPendingFriendList = InferResponseType<
typeof client.api.friends.request.pending.$get,
200
>["data"][0];

export const columns: ColumnDef<TPendingFriendList>[] = [
  {
    accessorKey: "sentFrom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent from" />
    ),
    cell: ({ row }) => {
      const data = row.original.sentFrom;

      return (
        <div className="flex items-center gap-3 ml-3" key={data.id}>
          <Avatar>
            <AvatarImage src={data.image || undefined} />
            <AvatarFallback>
              {
                data.name.split(" ").map((c) => c.at(0)?.toUpperCase()).join("")
              }
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p>
              <span className="text-sm font-medium hover:underline">
                {data.name}
              </span>
            </p>

            <p className="text-muted-foreground text-xs">

              {data.email}
            </p>
          </div>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      const data = row.original.sentFrom;

      return data.name.includes(value) || data.name.includes(value);
    },
    sortingFn: (rowA, rowB) => {
      const dataA = rowA.original.sentFrom;
      const dataB = rowB.original.sentFrom;

      if (dataA.name === dataB.name) return dataA.email.localeCompare(dataB.email);
      return dataA.name.localeCompare(dataB.name);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const display = friendRequestStatusMap[status];

      return (
        <div className="flex gap-3 items-center">
          <display.icon />
          <p>{display.title}</p>
        </div>
      );
    }, filterFn: (row, _id, value: string[]) => {
      const data = row.original.status;
      return value.includes(data);
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent on" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <p className="text-sm">
          {date.toLocaleDateString()}
          {" "}
          {date.toLocaleTimeString()}
        </p>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => (
      <FriendRequestPendingActions data={row.original} />
    ),
  },
];
