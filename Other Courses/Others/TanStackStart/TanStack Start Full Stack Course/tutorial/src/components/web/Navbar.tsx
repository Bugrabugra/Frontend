import { Button, buttonVariants } from "#/components/ui/button.tsx";
import { ThemeToggle } from "#/components/web/theme-toggle.tsx";
import { Link, useNavigate } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client.ts";
import { toast } from "sonner";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          navigate({ to: "/" });
        },
        onError: ({ error }) => {
          toast.error(error.message);
        }
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img
            src="https://tanstack.com/images/logos/logo-color-banner-600.png"
            alt="TanStack Start Logo"
            className="size-8"
          />
          <h1 className="text-lg font-semibold">TanStack Start</h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isPending ? null : session ? (
            <>
              <Button variant="secondary" onClick={handleSignOut}>
                Logout
              </Button>
              <Link to="/dashboard" className={buttonVariants()}>
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Login
              </Link>
              <Link to="/signup" className={buttonVariants()}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
