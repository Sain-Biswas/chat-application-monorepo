
import { RPCFetchError } from "@/web/lib/fetch-error";
import { useMutation } from "@tanstack/react-query";
import client, { type InferResponseType } from "@zaptalk/api-client/index.js";


export default function useSendFriendRequestMutation() {
    const { data, error, isPending, mutate } = useMutation<InferResponseType<typeof client.api.friends.request.$post, 200>, RPCFetchError, string>({
        mutationFn: async (email: string) => {
            const response = await client.api.friends.request.$post({
                form: {
                    email
                }
            })

            if (response.ok)
                return await response.json();

            const error = await response.json();
            throw new RPCFetchError(error);
        },
        mutationKey: ["friend"]
    })

    return { data, error, isPending, mutate };
}
