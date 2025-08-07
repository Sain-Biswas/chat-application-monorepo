import { RPCFetchError } from "@/web/lib/fetch-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client, { type InferResponseType } from "@zaptalk/api-client/index.js";
import { toast } from "sonner";

export default function useEndFriendshipMutation() {
  const queryClient = useQueryClient();
  return useMutation<InferResponseType<typeof client.api.friends.$delete, 200>, RPCFetchError, {
    friendID: string;
    requestID: string;
  }>({
    mutationFn: async ({ friendID, requestID }) => {
      const response = await client.api.friends.request.$delete({
        json: {
          friendID: friendID,
          requestID: requestID,
        },
      });

      if (response.ok)
        return await response.json();

      const error = await response.json();
      throw new RPCFetchError(error);
    },
    mutationKey: ["friends", "current"],
    onSuccess(data) {
      toast.success(data.message, {
        description: data.detail,
      });
      queryClient.invalidateQueries({
        queryKey: ["friends", "current"],
      });
    },
    onError(error) {
      toast.error(error.message, {
        description: error.detail,
      });
    },
  });
}
