import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import client from "@zaptalk/api-client/index.js";
import { Button } from "../components/ui/button";
import { signOut, useSession } from "../lib/auth";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data } = useSession();

  const { data: routeData, isPending } = useQuery({
    queryKey: ["home"],
    // eslint-disable-next-line unicorn/no-await-expression-member
    queryFn: async () => (await client.api.$get()).json(),
  });

  return (
    <div>
      <header>
        <nav>
          <Link to="/signin">Signin</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>
      <p>
        {JSON.stringify(data)}
      </p>
      <Button onClick={() => signOut()}>
        Sign out
      </Button>
      {!isPending && (
        <div>
          {JSON.stringify(routeData)}
        </div>
      )}
    </div>
  );
}
