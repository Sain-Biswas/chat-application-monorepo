import { createLazyFileRoute } from "@tanstack/react-router";
import Button from "@zaptalk/ui/components/button.tsx";

function TestPage() {
  return (
    <main>
      <Button>
        <p>Hello</p>
        <p>Testing</p>
      </Button>
    </main>
  )
  ;
}

export const Route = createLazyFileRoute("/test")({
  component: TestPage,
});
