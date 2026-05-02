import { Layout } from "@/components/Layout";
import { MedalBadge } from "@/components/MedalBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import type { LeaderboardEntry } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { BarChart2, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import heroImg from "/assets/generated/cricket-hero.dim_1400x560.jpg";

function TopPerformerCard({
  entry,
  isHero,
  statType = "runs",
}: {
  entry: LeaderboardEntry;
  isHero?: boolean;
  statType?: "runs" | "wickets";
}) {
  const navigate = useNavigate();
  const highlightRuns = statType === "runs";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (entry.rank - 1) * 0.1 }}
      className={isHero ? "md:col-span-1 order-first md:order-none" : ""}
    >
      <Card
        onClick={() =>
          navigate({
            to: "/players/$playerId",
            params: { playerId: entry.player.id },
          })
        }
        className={`card-elevated-dark bg-card border-border cursor-pointer transition-elevation hover:-translate-y-1 ${
          entry.rank === 1 ? "ring-1 ring-primary/40" : ""
        }`}
        data-ocid={`top_${statType}_performers.item.${entry.rank}`}
      >
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <MedalBadge
              rank={entry.rank}
              size={entry.rank === 1 ? "lg" : "md"}
            />
            <div className="min-w-0">
              <p className="font-display font-bold text-foreground text-base truncate">
                {entry.player.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.player.country}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted/40 rounded-md p-2 text-center">
              <p className="text-xs text-muted-foreground">Runs</p>
              <p
                className={`font-display font-bold text-sm ${
                  highlightRuns ? "text-primary" : "text-foreground"
                }`}
              >
                {entry.player.totalRuns}
              </p>
            </div>
            <div className="bg-muted/40 rounded-md p-2 text-center">
              <p className="text-xs text-muted-foreground">Wkts</p>
              <p
                className={`font-display font-bold text-sm ${
                  !highlightRuns ? "text-primary" : "text-foreground"
                }`}
              >
                {entry.player.totalWickets}
              </p>
            </div>
            <div className="bg-muted/40 rounded-md p-2 text-center">
              <p className="text-xs text-muted-foreground">Matches</p>
              <p className="font-display font-bold text-foreground text-sm">
                {entry.player.matchCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { data: runsLeaderboard, isLoading: runsLoading } =
    useLeaderboard("runs");
  const { data: wicketsLeaderboard, isLoading: wicketsLoading } =
    useLeaderboard("wickets");

  const topThreeRuns = (runsLeaderboard ?? []).slice(0, 3);
  const topThreeWickets = (wicketsLeaderboard ?? []).slice(0, 3);
  const top5Runs = (runsLeaderboard ?? []).slice(0, 5);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative rounded-2xl overflow-hidden mb-10"
        style={{ minHeight: 320 }}
        data-ocid="hero.section"
      >
        <img
          src={heroImg}
          alt="Cricket Analytics Hero"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-40"
        />
        <div className="relative z-10 flex flex-col items-start justify-end h-full px-8 py-10 min-h-[320px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-body font-semibold uppercase tracking-widest mb-2">
              Premium Cricket Analytics
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3 leading-tight">
              Where Stats Meet
              <br />
              <span className="text-primary">Performance</span>
            </h1>
            <p className="text-muted-foreground text-base mb-6 max-w-lg">
              Deep statistics, player trends, and leaderboards — all calculated
              dynamically in real time.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate({ to: "/players" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
                data-ocid="hero.explore_players_button"
              >
                <Users className="w-4 h-4 mr-2" />
                Explore Players
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: "/leaderboard" })}
                className="border-border text-foreground hover:bg-muted"
                data-ocid="hero.view_leaderboard_button"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top 3 Run Scorers */}
      <section className="mb-10" data-ocid="top_run_scorers.section">
        <h2 className="text-xl font-display font-bold text-foreground mb-1">
          Top Run Scorers
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Medal rankings based on total runs
        </p>
        {runsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : topThreeRuns.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-xl"
            data-ocid="top_run_scorers.empty_state"
          >
            <BarChart2 className="w-8 h-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No players yet — add some via the admin panel
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThreeRuns.map((entry) => (
              <TopPerformerCard
                key={entry.rank}
                entry={entry}
                isHero={entry.rank === 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* Top 3 Wicket Takers */}
      <section className="mb-10" data-ocid="top_wicket_takers.section">
        <h2 className="text-xl font-display font-bold text-foreground mb-1">
          Top Wicket Takers
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Medal rankings based on total wickets
        </p>
        {wicketsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : topThreeWickets.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-xl"
            data-ocid="top_wicket_takers.empty_state"
          >
            <BarChart2 className="w-8 h-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No players yet — add some via the admin panel
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThreeWickets.map((entry) => (
              <TopPerformerCard
                key={entry.rank}
                entry={entry}
                statType="wickets"
              />
            ))}
          </div>
        )}
      </section>

      {/* Top 5 Leaderboard Preview */}
      <section data-ocid="leaderboard_preview.section">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">
              Top 5 Run Scorers
            </h2>
            <p className="text-sm text-muted-foreground">Leaderboard preview</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/leaderboard" })}
            className="text-primary border-primary/30 hover:bg-primary/10"
            data-ocid="leaderboard_preview.view_full_button"
          >
            View Full Leaderboard →
          </Button>
        </div>
        {runsLoading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 rounded-xl" />
            ))}
          </div>
        ) : top5Runs.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-xl"
            data-ocid="leaderboard_preview.empty_state"
          >
            <Trophy className="w-8 h-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data yet — add players via the admin panel
            </p>
          </div>
        ) : (
          <Card className="bg-card border-border card-elevated-dark">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-muted-foreground font-body font-medium w-12">
                      Rank
                    </th>
                    <th className="text-left px-3 py-3 text-muted-foreground font-body font-medium">
                      Player
                    </th>
                    <th className="text-left px-3 py-3 text-muted-foreground font-body font-medium">
                      Country
                    </th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-body font-medium">
                      Runs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {top5Runs.map((entry) => (
                    <tr
                      key={entry.rank}
                      tabIndex={0}
                      className="border-b border-border/50 hover:bg-muted/20 transition-smooth cursor-pointer"
                      onClick={() =>
                        navigate({
                          to: "/players/$playerId",
                          params: { playerId: entry.player.id },
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          navigate({
                            to: "/players/$playerId",
                            params: { playerId: entry.player.id },
                          });
                      }}
                      data-ocid={`leaderboard_preview.item.${entry.rank}`}
                    >
                      <td className="px-5 py-3">
                        <MedalBadge rank={entry.rank} size="sm" />
                      </td>
                      <td className="px-3 py-3 font-display font-semibold text-foreground">
                        {entry.player.name}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {entry.player.country}
                      </td>
                      <td className="px-5 py-3 text-right font-display font-bold text-primary">
                        {entry.statValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </section>
    </Layout>
  );
}
