import client from "@/web/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    // eslint-disable-next-line require-await
    queryFn: async () => client.api.$get().then((response) => response.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div>{data?.message}</div>
    </div>
  );
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});
