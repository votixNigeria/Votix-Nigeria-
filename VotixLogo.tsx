export function VotixLogo({ showWordmark = true }: { showWordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src="/votix-mark.png"
        alt="VOTIX logo"
        width={40}
        height={40}
        className="size-9 object-contain"
      />
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight">VOTIX</span>
      )}
    </span>
  );
}
