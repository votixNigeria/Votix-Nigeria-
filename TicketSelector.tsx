import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Minus, Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  formatEventDate,
  formatEventTime,
  formatPrice,
  type EventRecord,
  type TicketTier,
} from "@/data/events";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { startCheckout } from "@/lib/checkout.functions";

const MAX_QUANTITY = 10;

export function TicketSelector({ event }: { event: EventRecord }) {
  const tiers = event.ticketTiers;
  const firstAvailable = tiers.find((tier) => tier.available) ?? tiers[0];
  const [selectedId, setSelectedId] = useState<string | undefined>(firstAvailable?.id);

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { user } = useAuth();
  const checkout = useServerFn(startCheckout);

  const selected: TicketTier | undefined =
    tiers.find((tier) => tier.id === selectedId) ?? firstAvailable;
  const total = (selected?.price ?? 0) * quantity;

  if (!selected) return null;

  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQuantity = () => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1));

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold">Tickets</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a category and quantity.
        </p>

        <ul className="mt-5 space-y-3">
          {event.ticketTiers.map((tier) => {
            const isSelected = tier.id === selected.id;
            return (
              <li key={tier.id}>
                <button
                  type="button"
                  disabled={!tier.available}
                  onClick={() => {
                    setSelectedId(tier.id);
                    setQuantity(1);
                  }}
                  aria-pressed={isSelected}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-colors",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-muted-foreground",
                    !tier.available && "cursor-not-allowed opacity-50",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{tier.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {formatPrice(tier.price, event.currency)}
                    </span>
                  </div>
                  {!tier.available && (
                    <span className="mt-2 inline-block text-xs font-medium text-muted-foreground">
                      Sold out
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium">Quantity</span>
          <QuantityStepper
            quantity={quantity}
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-bold">{formatPrice(total, event.currency)}</span>
        </div>

        <Button
          type="button"
          size="lg"
          disabled={!selected.available}
          onClick={() => setIsOpen(true)}
          className="mt-5 w-full shadow-glow"
        >
          Buy Ticket
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Secure card payment powered by Paystack. Tickets are issued instantly.
        </p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg">
          <div className="bg-gradient-primary p-6 text-primary-foreground">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Ticket className="size-5" aria-hidden="true" />
                Order Summary
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/80">
                Review your selection before confirming.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 p-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Event</p>
              <p className="font-display text-lg font-semibold">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatEventDate(event.startsAt)} · {formatEventTime(event.startsAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                {event.venue}, {event.city}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Ticket</p>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{selected.name}</p>
                  <p className="text-sm text-muted-foreground">{selected.description}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-primary">
                  {formatPrice(selected.price, event.currency)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
                <span className="text-sm font-medium">Quantity</span>
                <QuantityStepper
                  quantity={quantity}
                  onDecrease={decreaseQuantity}
                  onIncrease={increaseQuantity}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(total, event.currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fees</span>
                <span className="text-muted-foreground">Included</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(total, event.currency)}
                </span>
              </div>
            </div>

            {!user && (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center">
                <p className="text-sm font-medium text-foreground">Sign in to continue</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  You need a VOTIX account so we can store your digital tickets.
                </p>
                <Button asChild size="sm" variant="secondary" className="mt-3">
                  <Link to="/login">Log in or sign up</Link>
                </Button>
              </div>
            )}

            {error && <p className="text-center text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter className="gap-3 border-t border-border p-6 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!user || pending}
              onClick={async () => {
                setError(null);
                setPending(true);
                try {
                  const result = await checkout({
                    data: {
                      eventId: event.id,
                      tierId: selected.id,
                      quantity,
                      callbackUrl: `${window.location.origin}/payment/callback`,
                    },
                  });
                  if (result.ok) {
                    window.location.href = result.url;
                    return;
                  }
                  setError(result.error);
                } catch {
                  setError("Something went wrong starting your payment.");
                }
                setPending(false);
              }}
              className="w-full bg-gradient-primary text-primary-foreground shadow-glow sm:w-auto"
            >
              {pending ? "Redirecting…" : "Pay now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={onDecrease}
      >
        <Minus className="size-4" />
      </Button>
      <span aria-live="polite" className="w-8 text-center text-base font-semibold">
        {quantity}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Increase quantity"
        disabled={quantity >= MAX_QUANTITY}
        onClick={onIncrease}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
