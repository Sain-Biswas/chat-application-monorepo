import type { ColumnDef } from "@tanstack/react-table";
import type client from "@zaptalk/api-client/index.js";
import type { InferResponseType } from "@zaptalk/api-client/index.js";
import { DataTableColumnHeader } from "../../column/data-table-column-header";

export type TSendRequestStatusList = InferResponseType<typeof client.api.friends.request.status.$get, 200>["data"][0];

export const columns: ColumnDef<TSendRequestStatusList>[] = [
    {
        accessorKey: "sentTo",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sent to" />
        ),
    },
];
