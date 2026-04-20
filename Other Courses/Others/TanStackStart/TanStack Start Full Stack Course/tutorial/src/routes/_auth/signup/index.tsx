import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "#/components/web/auth/signup-form.tsx";

export const Route = createFileRoute("/_auth/signup/")({
  component: RouteComponent
});

function RouteComponent() {
  return <SignupForm />;
}
