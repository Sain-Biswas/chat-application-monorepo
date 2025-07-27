import { RPCFetchError } from "@/web/lib/fetch-error";
import { useSuspenseQuery } from "@tanstack/react-query";
import client, { type InferResponseType } from "@zaptalk/api-client/index.js";

export default function useCurrentFriends() {
  return useSuspenseQuery<InferResponseType<
    typeof client.api.friends.$get, 200
  >["data"], RPCFetchError>({
    queryKey: ["friends", "current"],
    queryFn: async () => {
      const response = await client.api.friends.$get();

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }

      const error = await response.json();

      throw new RPCFetchError(error);
    },
  });
};
