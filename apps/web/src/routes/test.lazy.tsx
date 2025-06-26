import { createLazyFileRoute } from "@tanstack/react-router";
import Button from "@zaptalk/ui/components/button.tsx";
import SunIcon from "@zaptalk/ui/icons/sun-icon.js";
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
        <Button size="xtra-small" Icon={SunIcon}>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="small" Icon={SunIcon}>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="medium" Icon={SunIcon}>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="large" Icon={SunIcon}>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large" Icon={SunIcon}>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <h1>Mode Toggle</h1>
        <ModeToggle />
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
