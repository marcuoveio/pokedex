import { useEffect, useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PokemonCard } from "@/components/PokemonCard";
import {
  fetchPokemon,
  fetchSpecies,
  fetchEvolutionChain,
  flattenEvolution,
  type EvoNode,
} from "@/lib/pokemon";
import { useToast } from "@/hooks/use-toast";

const SUGGESTIONS = ["pikachu", "charizard", "mewtwo", "gengar", "lucario", "garchomp"];

const Index = () => {
  const [query, setQuery] = useState("pikachu");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [evolution, setEvolution] = useState<EvoNode[]>([]);
  const { toast } = useToast();

  const search = async (name: string) => {
    setLoading(true);
    try {
      const p = await fetchPokemon(name);
      setPokemon(p);
      const s = await fetchSpecies(p.species.url);
      setSpecies(s);
      const ev = await fetchEvolutionChain(s.evolution_chain.url);
      setEvolution(flattenEvolution(ev.chain));
      setQuery(p.name);
    } catch (e: any) {
      toast({ title: "Not found", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search("pikachu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  return (
    <main className="min-h-screen px-4 py-10 md:py-16 max-w-6xl mx-auto">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-4">
          <Sparkles className="w-3 h-3 text-secondary" />
          Powered by PokéAPI
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          The <span className="text-gradient">Pokédex</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Search any Pokémon by name or number — explore stats, abilities, evolutions and more.
        </p>
      </header>

      <form onSubmit={onSubmit} className="relative max-w-xl mx-auto mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'charizard' or '25'…"
          className="h-14 pl-12 pr-32 rounded-2xl bg-card border-border text-base shadow-card"
        />
        <Button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-xl bg-gradient-hero hover:opacity-90 shadow-glow border-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
        </Button>
      </form>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => search(s)}
            className="text-xs px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition"
          >
            {s}
          </button>
        ))}
      </div>

      {pokemon && (
        <PokemonCard pokemon={pokemon} species={species} evolution={evolution} onSelect={search} />
      )}

      <footer className="text-center text-xs text-muted-foreground mt-16">
        Data from <a className="underline hover:text-foreground" href="https://pokeapi.co">pokeapi.co</a>
      </footer>
    </main>
  );
};

export default Index;
