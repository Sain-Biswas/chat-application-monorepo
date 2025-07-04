import { cn } from "../lib/cn";

export default function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={cn("icon", className)}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M280-440q-17 0-28.5-11.5T240-480q0-17 11.5-28.5T280-520h400q17 0 28.5 11.5T720-480q0 17-11.5 28.5T680-440H280Z" />
    </svg>
  );
}
