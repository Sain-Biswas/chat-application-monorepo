import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import client from "@zaptalk/api-client/index.js";
import { Button } from "../components/ui/button";
import useCurrentUser from "../hooks/data/use-current-user";
import { signOut } from "../lib/auth";

function App() {
  const { data } = useCurrentUser();

  const { data: routeData } = useSuspenseQuery({
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
        { data && JSON.stringify(data)}
      </p>
      <Button onClick={() => signOut()}>
        Sign out
      </Button>
      <div>
        {JSON.stringify(routeData)}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: App,
});
