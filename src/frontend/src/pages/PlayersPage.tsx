import { Layout } from "@/components/Layout";
import { PlayerCard } from "@/components/PlayerCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlayers } from "@/hooks/usePlayers";
import { Search, Users } from "lucide-react";
import { useMemo, useState } from "react";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const { data: players, isLoading } = usePlayers();
  const source = players ?? [];

  const filtered = useMemo(
    () =>
      search.trim()
        ? source.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.country.toLowerCase().includes(search.toLowerCase()),
          )
        : source,
    [source, search],
  );

  return (
    <Layout>
      <div className="mb-6" data-ocid="players.page">
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Players
        </h1>
        <p className="text-muted-foreground">
          Browse the complete player roster
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or country…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border"
          data-ocid="players.search_input"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : source.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="players.empty_state"
        >
          <Users className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            No players yet
          </h3>
          <p className="text-muted-foreground text-sm">
            Add players via the admin panel to see them here
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="players.search_empty_state"
        >
          <Search className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            No players found
          </h3>
          <p className="text-muted-foreground text-sm">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((player, i) => (
            <PlayerCard key={player.id} player={player} index={i} />
          ))}
        </div>
      )}
    </Layout>
  );
}
