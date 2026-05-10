import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import { TYPE_COLORS, cap, spriteUrl, type EvoNode } from "@/lib/pokemon";

interface Props {
  pokemon: any;
  species: any;
  evolution: EvoNode[];
  onSelect: (name: string) => void;
}

export const PokemonCard = ({ pokemon, species, evolution, onSelect }: Props) => {
  const primaryType = pokemon.types[0].type.name;
  const flavor =
    species?.flavor_text_entries?.find((e: any) => e.language.name === "en")?.flavor_text?.replace(/\f/g, " ") ?? "";

  return (
    <div className="animate-fade-up grid lg:grid-cols-[1.1fr_1fr] gap-6">
      {/* Hero panel */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden shadow-card border border-border"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${TYPE_COLORS[primaryType]}55, transparent 60%), var(--gradient-card)`,
        }}
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 animate-spin-slow"
          style={{ background: `conic-gradient(${TYPE_COLORS[primaryType]}, transparent, ${TYPE_COLORS[primaryType]})` }}
        />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-mono text-muted-foreground">#{String(pokemon.id).padStart(4, "0")}</p>
              <h2 className="text-5xl md:text-6xl font-bold mt-1">{cap(pokemon.name)}</h2>
              <div className="flex gap-2 mt-4">
                {pokemon.types.map((t: any) => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-6">
            <img
              src={spriteUrl(pokemon.id)}
              alt={pokemon.name}
              className="w-64 h-64 object-contain drop-shadow-2xl animate-float"
              onError={(e) => ((e.target as HTMLImageElement).src = pokemon.sprites.front_default)}
            />
          </div>

          {flavor && (
            <p className="text-sm text-muted-foreground leading-relaxed italic">"{flavor}"</p>
          )}

          <div className="grid grid-cols-3 gap-3 mt-6">
            <Metric label="Height" value={`${pokemon.height / 10} m`} />
            <Metric label="Weight" value={`${pokemon.weight / 10} kg`} />
            <Metric label="Base XP" value={pokemon.base_experience ?? "—"} />
          </div>
        </div>
      </div>

      {/* Details panel */}
      <div className="space-y-6">
        <Section title="Base Stats">
          <div className="space-y-3">
            {pokemon.stats.map((s: any) => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </Section>

        <Section title="Abilities">
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((a: any) => (
              <span
                key={a.ability.name}
                className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium border border-border"
              >
                {cap(a.ability.name)}
                {a.is_hidden && <span className="ml-1.5 text-xs text-secondary">★</span>}
              </span>
            ))}
          </div>
        </Section>

        {evolution.length > 1 && (
          <Section title="Evolution">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {evolution.map((e, i) => (
                <div key={e.name} className="flex items-center gap-2">
                  <button
                    onClick={() => onSelect(e.name)}
                    className={`flex flex-col items-center p-3 rounded-2xl transition hover:bg-muted ${
                      e.name === pokemon.name ? "bg-muted ring-2 ring-primary" : ""
                    }`}
                  >
                    <img src={spriteUrl(e.id)} alt={e.name} className="w-16 h-16 object-contain" />
                    <span className="text-xs font-medium mt-1">{cap(e.name)}</span>
                  </button>
                  {i < evolution.length - 1 && <span className="text-primary text-xl">→</span>}
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Moves">
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {pokemon.moves.slice(0, 24).map((m: any) => (
              <span key={m.move.name} className="text-xs px-2 py-1 rounded-md bg-muted/60 border border-border/50">
                {cap(m.move.name)}
              </span>
            ))}
            {pokemon.moves.length > 24 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">+{pokemon.moves.length - 24} more</span>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: any }) => (
  <div className="rounded-xl bg-background/40 backdrop-blur border border-border p-3">
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="text-lg font-bold mt-0.5">{value}</p>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-gradient-card border border-border p-6 shadow-card">
    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{title}</h3>
    {children}
  </div>
);
