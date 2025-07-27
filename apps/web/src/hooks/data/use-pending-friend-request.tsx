import { RPCFetchError } from "@/web/lib/fetch-error";
import { useSuspenseQuery } from "@tanstack/react-query";
import client, { type InferResponseType } from "@zaptalk/api-client/index.js";


export default function usePendingFriendRequest() {
    return useSuspenseQuery<InferResponseType<typeof client.api.friends.request.pending.$get, 200>["data"], RPCFetchError>({
        queryKey: ["friend", "pending"],
        queryFn: async () => {
            const response = await client.api.friends.request.pending.$get();

            if (response.ok)
                return (await response.json()).data;

            const error = await response.json();

            throw new RPCFetchError(error);
        }
    })
}
