import { TYPE_COLORS, cap } from "@/lib/pokemon";

export const TypeBadge = ({ type }: { type: string }) => (
  <span
    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white shadow-sm"
    style={{ backgroundColor: TYPE_COLORS[type] ?? "hsl(var(--muted))" }}
  >
    {cap(type)}
  </span>
);
