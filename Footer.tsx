import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { VotixLogo } from "./VotixLogo";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/contact.functions";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-start sm:justify-between lg:px-8">
        <div>
          <VotixLogo />
          <p className="mt-3 text-sm text-muted-foreground">
            Tickets. Votes. Experiences.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden="true" />
              <span className="break-all">{SUPPORT_EMAIL}</span>
            </a>
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>{SUPPORT_PHONE}</span>
            </a>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/events" className="text-muted-foreground hover:text-foreground">
            Events
          </Link>
          <Link to="/voting" className="text-muted-foreground hover:text-foreground">
            Voting
          </Link>
          <Link
            to="/how-it-works"
            className="text-muted-foreground hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            to="/create-event"
            className="text-muted-foreground hover:text-foreground"
          >
            Create an Event
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} VOTIX. All rights reserved.
      </div>
    </footer>
  );
}
