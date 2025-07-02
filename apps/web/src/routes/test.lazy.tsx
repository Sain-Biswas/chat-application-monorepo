import { createLazyFileRoute } from "@tanstack/react-router";
import { Card } from "@zaptalk/ui/components/ui/card.tsx";
import { SuggestionChip } from "@zaptalk/ui/components/ui/chips.tsx";
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
          gap: 20,
        }}
      >
        <SuggestionChip text="Suggestion Chip" />
        <SuggestionChip text="Suggestion Chip" isElevated />
        <SuggestionChip text="Suggestion Chip" Icon={SunIcon} />
        <SuggestionChip text="Suggestion Chip" isElevated Icon={SunIcon} />
        <p>disabled</p>
        <SuggestionChip text="Suggestion Chip" disabled />
        <SuggestionChip text="Suggestion Chip" isElevated disabled />
        <SuggestionChip text="Suggestion Chip" disabled Icon={SunIcon} />
        <SuggestionChip text="Suggestion Chip" isElevated disabled Icon={SunIcon} />
      </div>

    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
