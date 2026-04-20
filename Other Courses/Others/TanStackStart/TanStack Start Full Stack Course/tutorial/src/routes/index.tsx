import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "#/components/web/navbar.tsx";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
