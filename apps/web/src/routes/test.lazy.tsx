import { createLazyFileRoute } from "@tanstack/react-router";
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
    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
