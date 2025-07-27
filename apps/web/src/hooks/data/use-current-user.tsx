import { getSession } from "@/web/lib/auth";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  return useSuspenseQuery({
    queryKey: ["user", "current"],
    queryFn: async () => {
      const session = await getSession();
      return session.data?.user;
    },
  });
}
