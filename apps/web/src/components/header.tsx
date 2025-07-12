import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="flex justify-between gap-2 p-2">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>
      </nav>
    </header>
  );
}
