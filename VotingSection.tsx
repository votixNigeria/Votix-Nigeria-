import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VotingBadge } from "./VotingBadge";
import { formatEventDate, type EventRecord } from "@/data/events";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { castVote } from "@/lib/votes.functions";

export function VotingSection({ event }: { event: EventRecord }) {
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isOpen = event.votingStatus === "open";
  const { user } = useAuth();
  const vote = useServerFn(castVote);

  async function submitVotes() {
    setStatus(null);
    setPending(true);
    const results: string[] = [];
    for (const [categoryId, nomineeId] of Object.entries(selection)) {
      try {
        const result = await vote({ data: { categoryId, nomineeId } });
        if (!result.ok) results.push(result.error);
      } catch {
        results.push("Could not record one of your votes.");
      }
    }
    setPending(false);
    setStatus(results.length > 0 ? results[0]! : "Your vote has been recorded. Thank you!");
  }

  return (
    <section
      aria-labelledby="voting-heading"
      className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="voting-heading" className="text-xl font-semibold">
          Voting
        </h2>
        <VotingBadge status={event.votingStatus} />
      </div>
      {isOpen && event.votingClosesAt && (
        <p className="mt-2 text-sm text-muted-foreground">
          Voting closes {formatEventDate(event.votingClosesAt)}.
        </p>
      )}
      {!isOpen && (
        <p className="mt-2 text-sm text-muted-foreground">
          Voting for this event is closed. Final results are shown below.
        </p>
      )}

      <div className="mt-6 space-y-8">
        {event.voteCategories.map((category) => {
          const totalVotes = category.nominees.reduce((sum, n) => sum + n.votes, 0);
          return (
            <div key={category.id}>
              <h3 className="text-base font-semibold">{category.name}</h3>
              <ul className="mt-4 space-y-3">
                {category.nominees.map((nominee) => {
                  const share = totalVotes ? Math.round((nominee.votes / totalVotes) * 100) : 0;
                  const picked = selection[category.id] === nominee.id;
                  return (
                    <li key={nominee.id}>
                      <button
                        type="button"
                        disabled={!isOpen}
                        aria-pressed={picked}
                        onClick={() =>
                          setSelection((prev) => ({ ...prev, [category.id]: nominee.id }))
                        }
                        className={cn(
                          "w-full overflow-hidden rounded-xl border p-4 text-left transition-colors",
                          picked ? "border-primary bg-primary/10" : "border-border",
                          isOpen ? "hover:border-muted-foreground" : "cursor-default",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="flex items-center gap-2 font-medium">
                              {nominee.name}
                              {picked && (
                                <Check className="size-4 text-primary" aria-hidden="true" />
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {nominee.subtitle}
                            </p>
                          </div>
                          <span className="shrink-0 text-sm font-semibold">{share}%</span>
                        </div>
                        <div
                          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                          role="presentation"
                        >
                          <div
                            className="h-full rounded-full bg-gradient-primary"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <>
          {user ? (
            <>
              <Button
                type="button"
                size="lg"
                className="mt-6 w-full"
                disabled={Object.keys(selection).length === 0 || pending}
                onClick={() => void submitVotes()}
              >
                {pending ? "Submitting…" : "Submit Vote"}
              </Button>
              {status && <p className="mt-3 text-center text-sm text-primary">{status}</p>}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                One vote per category, per account.
              </p>
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-center">
              <p className="text-sm font-medium">Sign in to vote</p>
              <Button asChild size="sm" variant="secondary" className="mt-3">
                <Link to="/login">Log in or sign up</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
