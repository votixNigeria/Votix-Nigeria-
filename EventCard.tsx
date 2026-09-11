import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VotingBadge } from "./VotingBadge";
import {
  formatEventDate,
  formatPrice,
  startingPrice,
  type EventRecord,
} from "@/data/events";

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={`${event.title} cover`}
          width={1280}
          height={800}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          {formatEventDate(event.startsAt)}
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {event.venue}, {event.city}
        </p>

        <div className="mt-4">
          <VotingBadge status={event.votingStatus} />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-sm font-semibold text-primary">
              {formatPrice(startingPrice(event), event.currency)}
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/events/$slug" params={{ slug: event.slug }}>
              View Event
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
