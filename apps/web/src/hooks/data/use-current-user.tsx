import { getSession } from "@/web/lib/auth";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  return useSuspenseQuery({
    queryKey: ["user", "current"],
    queryFn: async () => {
      const session = await getSession();

      // eslint-disable-next-line unicorn/no-null
      return session.data?.user || null;
    },
  });
}
