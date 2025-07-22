import { useQuery } from "@tanstack/react-query";
import client from "@zaptalk/api-client/index.js";

export const useCurrentFriends = (userId: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["friends", "current", userId],
    queryFn: async () => {
      const response = await client.api.friends.$get();

      if (response.ok) {
        const data = await response.json();
        return { data, error: undefined };
      }

      const error = await response.json();

      return { data: undefined, error };
    },
  });

  return { data, isPending, error };
};
