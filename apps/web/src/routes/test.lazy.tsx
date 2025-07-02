import { createLazyFileRoute } from "@tanstack/react-router";
import { Card } from "@zaptalk/ui/components/ui/card.tsx";
import CheckBox from "@zaptalk/ui/components/ui/check-box.tsx";
import { AssistChip, FilterChip } from "@zaptalk/ui/components/ui/chips.tsx";
import SunIcon from "@zaptalk/ui/icons/sun-icon.tsx";
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
        <CheckBox variant="error" />
        <CheckBox disabled defaultChecked />
        <CheckBox isDeterminate />
        <CheckBox isDeterminate variant="error" />
        <CheckBox isDeterminate disabled defaultChecked />
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
        <p>Assist Chips</p>
        <AssistChip text="Sun Icon" Icon={SunIcon} />
        <AssistChip text="No Icon" />
        <AssistChip text="Sun Icon" Icon={SunIcon} isElevated />
        <AssistChip text="No Icon" isElevated />
        <p>Disabled</p>
        <AssistChip text="Sun Icon" Icon={SunIcon} disabled />
        <AssistChip text="No Icon" disabled />
        <AssistChip text="Sun Icon" Icon={SunIcon} isElevated disabled />
        <AssistChip text="No Icon" isElevated disabled />
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
        <p>Filter Chips</p>
        <FilterChip text="Sample Chip" />
        <FilterChip text="Sample Chip" Icon={SunIcon} />
        <FilterChip text="Sample Chip" isElevated />
        <FilterChip text="Sample Chip" Icon={SunIcon} isElevated />
        <p>Disabled</p>
        <FilterChip text="Sample Chip" disabled />
        <FilterChip text="Sample Chip" Icon={SunIcon} disabled defaultChecked />
        <FilterChip text="Sample Chip" isElevated disabled />
        <FilterChip text="Sample Chip" Icon={SunIcon} isElevated disabled />
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
