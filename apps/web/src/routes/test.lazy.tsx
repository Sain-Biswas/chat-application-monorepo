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
        <h1>Mode Toggle</h1>
        <ModeToggle />
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button size="xtra-small" Icon={SunIcon} shape="square">
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
        <Button size="large" Icon={SunIcon} shape="square">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large" Icon={SunIcon} disabled>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button size="xtra-small" Icon={SunIcon} variant="outlined">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="small" Icon={SunIcon} variant="outlined">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="medium" Icon={SunIcon} variant="outlined">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="large" Icon={SunIcon} variant="outlined">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large" Icon={SunIcon} variant="outlined" disabled>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button size="xtra-small" Icon={SunIcon} variant="tonal">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="small" Icon={SunIcon} variant="tonal">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="medium" Icon={SunIcon} variant="tonal">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="large" Icon={SunIcon} variant="tonal">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large" Icon={SunIcon} variant="tonal" disabled>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button size="xtra-small" Icon={SunIcon} variant="elevated">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="small" Icon={SunIcon} variant="elevated">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="medium" Icon={SunIcon} variant="elevated">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="large" Icon={SunIcon} variant="elevated">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large" Icon={SunIcon} variant="elevated" disabled>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button size="xtra-small" Icon={SunIcon} variant="text">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="small" Icon={SunIcon} variant="text">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="medium" Icon={SunIcon} variant="text">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="large" Icon={SunIcon} variant="text" shape="square">
          <p>Hello</p>
          <p>Testing</p>
        </Button>
        <Button size="xtra-large" Icon={SunIcon} variant="text" disabled>
          <p>Hello</p>
          <p>Testing</p>
        </Button>
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
