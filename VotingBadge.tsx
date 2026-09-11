import { Vote } from "lucide-react";
import type { VotingStatus } from "@/data/events";
import { cn } from "@/lib/utils";

const labels: Record<VotingStatus, string> = {
  open: "Voting open",
  closed: "Voting closed",
  none: "No voting",
};

export function VotingBadge({
  status,
  className,
}: {
  status: VotingStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        status === "open"
          ? "bg-primary/15 text-primary"
          : "bg-secondary text-muted-foreground",
        className,
      )}
    >
      <Vote className="size-3.5" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
