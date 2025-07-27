import { RPCFetchError } from "@/web/lib/fetch-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client, { type InferResponseType } from "@zaptalk/api-client/index.js";
import { toast } from "sonner";

export default function useSendFriendRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation<InferResponseType<typeof client.api.friends.request.$post, 200>, RPCFetchError, string>({
    mutationFn: async (email: string) => {
      const response = await client.api.friends.request.$post({
        form: {
          email,
        },
      });

      if (response.ok)
        return await response.json();

      const error = await response.json();
      throw new RPCFetchError(error);
    },
    mutationKey: ["friend", "status"],
    onSuccess(data) {
      toast.success(data.message, {
        description: data.detail,
      });
      queryClient.invalidateQueries({
        queryKey: ["friend", "status"],
      });
    },
    onError(error) {
      toast.error(error.message, {
        description: error.detail,
      });
    },
  });
}
