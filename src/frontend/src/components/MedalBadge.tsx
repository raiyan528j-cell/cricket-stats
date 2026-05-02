interface MedalBadgeProps {
  rank: 1 | 2 | 3 | number;
  size?: "sm" | "md" | "lg";
}

const medalLabels: Record<number, string> = { 1: "1st", 2: "2nd", 3: "3rd" };
const medalClasses: Record<number, string> = {
  1: "medal-gold",
  2: "medal-silver",
  3: "medal-bronze",
};
const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export function MedalBadge({ rank, size = "md" }: MedalBadgeProps) {
  const medalClass = medalClasses[rank] ?? "bg-muted";
  const label = medalLabels[rank] ?? `#${rank}`;
  return (
    <div
      className={`${sizeClasses[size]} ${medalClass} rounded-full flex items-center justify-center font-display font-bold text-foreground`}
      aria-label={`Rank ${rank}`}
    >
      {label}
    </div>
  );
}
