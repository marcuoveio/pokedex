import { STAT_LABELS } from "@/lib/pokemon";

export const StatBar = ({ name, value }: { name: string; value: number }) => {
  const pct = Math.min(100, (value / 200) * 100);
  return (
    <div className="grid grid-cols-[90px_40px_1fr] items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {STAT_LABELS[name] ?? name}
      </span>
      <span className="text-sm font-bold tabular-nums">{value}</span>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-hero rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
