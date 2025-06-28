import { createLazyFileRoute } from "@tanstack/react-router";
import { Card } from "@zaptalk/ui/components/ui/card.tsx";
import CheckBox from "@zaptalk/ui/components/ui/check-box.tsx";
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
          gap: 20,
        }}
      >
        <Card variant="elevated">Elevated Card Sample</Card>

        <Card variant="filled">Filled Card Sample</Card>

        <Card variant="outlined">Outlined Card Sample</Card>
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
        <p>Check Box</p>
        <CheckBox />
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
