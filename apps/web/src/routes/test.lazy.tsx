import { createLazyFileRoute } from "@tanstack/react-router";
import Button from "@zaptalk/ui/components/button.tsx";
import { ModeToggle } from "../components/mode-toggle";

function TestPage() {
  return (
    <main>
      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <h1>Sizes</h1>
        <Button size="xtra-small">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="small">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="medium">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="large">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>

      <div>
        <ModeToggle />
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
