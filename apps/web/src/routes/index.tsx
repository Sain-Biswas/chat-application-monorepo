import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { signOut, useSession } from "../lib/auth";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data } = useSession();

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
    </div>
  );
}
