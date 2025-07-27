import { RPCFetchError } from "@/web/lib/fetch-error";
import { useSuspenseQuery } from "@tanstack/react-query";
import client, { type InferResponseType } from "@zaptalk/api-client/index.js";

export default function useFriendRequestStatus() {
  return useSuspenseQuery<
    InferResponseType<typeof client.api.friends.request.status.$get, 200>["data"],
    RPCFetchError
  >({
    queryKey: ["friend", "status"],
    queryFn: async () => {
      const response = await client.api.friends.request.status.$get();

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }

      const error = await response.json();
      throw new RPCFetchError(error);
    },
  });
}
