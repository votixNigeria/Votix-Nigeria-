import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VotixLogo } from "./VotixLogo";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/voting", label: "Voting" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    setOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/login", replace: true });
  }

  return (
    <header className="sticky top-0 z-50 surface-panel">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 lg:h-20 lg:px-8"
      >
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <VotixLogo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link
                to="/my-tickets"
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                My Tickets
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/organizer">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                Sign out
              </Button>
              <Button asChild size="sm">
                <Link to="/organizer">Create an Event</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/create-event">Create an Event</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-foreground" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="block border-b border-border py-3 text-base font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link
                  to="/my-tickets"
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3 text-base font-medium text-muted-foreground"
                >
                  My Tickets
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            {user ? (
              <>
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link to="/organizer">Organiser dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={() => void signOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/create-event">Create an Event</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
