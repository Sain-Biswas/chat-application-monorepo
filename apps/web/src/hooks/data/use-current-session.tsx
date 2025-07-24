import { getSession } from "@/web/lib/auth";
import { useSuspenseQuery } from "@tanstack/react-query";


export default function useCurrentSession() {
    return useSuspenseQuery({
        queryKey: ["user", "session"],
        queryFn: async () => (await getSession()).data
    })
}
