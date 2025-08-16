import { Moon, Sun } from "lucide-react";

import { Button } from "@/web/components/ui/button";
import { useTheme } from "../integrations/app-mode/root-provider";

/**
 * A button component that changes app theme between light & dark color scheme on click.
 */
export function ModeToggleButton() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else {
      const systemTheme = globalThis.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      const decisionTheme = systemTheme === "dark" ? "light" : "dark";

      setTheme(decisionTheme);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="size-8"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
