import Button from "@zaptalk/ui/components/button.js";
import MoonIcon from "@zaptalk/ui/icons/moon-icon.tsx";
import SunIcon from "@zaptalk/ui/icons/sun-icon.tsx";
import { useTheme } from "../hooks/use-theme";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else {
      // eslint-disable-next-line unicorn/prefer-global-this
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      const decisionTheme = systemTheme === "dark" ? "light" : "dark";

      setTheme(decisionTheme);
    }
  }

  return (
    <Button size="small" className="mode-toggle" onClick={toggleTheme}>
      <SunIcon className="mode-toggle__light-mode h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="mode-toggle__dark-mode absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
