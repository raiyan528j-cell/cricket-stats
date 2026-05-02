import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlayer } from "@/hooks/usePlayers";
import { useNavigate, useParams } from "@tanstack/react-router";
import { UserX } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const roleLabels: Record<string, string> = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder",
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="font-display font-bold text-primary">
          {payload[0].value} runs
        </p>
      </div>
    );
  }
  return null;
};

export default function PlayerProfilePage() {
  const { playerId } = useParams({ from: "/players/$playerId" });
  const { data: player, isLoading } = usePlayer(playerId);
  const navigate = useNavigate();

  const chartData = (player?.last5Performances ?? []).map((p, i) => ({
    match: `Match ${i + 1}`,
    runs: p.runs,
  }));

  return (
    <Layout>
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-24 rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      ) : !player ? (
        <div
          className="flex flex-col items-center justify-center py-24 gap-4"
          data-ocid="player_profile.not_found"
        >
          <UserX className="w-14 h-14 text-muted-foreground" />
          <h2 className="text-xl font-display font-bold text-foreground">
            Player not found
          </h2>
          <p className="text-muted-foreground text-sm">
            This player may have been removed or the link is invalid.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/players" })}
            data-ocid="player_profile.back_button"
          >
            ← Back to Players
          </Button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div
            className="bg-card rounded-2xl border border-border p-6 mb-6 card-elevated-dark"
            data-ocid="player_profile.card"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-display font-bold text-primary shrink-0">
                {player.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h1 className="text-3xl font-display font-bold text-foreground">
                  {player.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-muted-foreground">
                    {player.country}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {roleLabels[player.role] ?? player.role}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
            data-ocid="player_profile.stats"
          >
            <StatCard label="Matches" value={player.matchCount} />
            <StatCard label="Total Runs" value={player.totalRuns} accent />
            <StatCard label="Wickets" value={player.totalWickets} />
            <StatCard
              label="Average"
              value={player.average.toFixed(2)}
              accent
            />
            <StatCard
              label="Strike Rate"
              value={player.strikeRate.toFixed(1)}
            />
          </div>

          {/* Performance Chart */}
          <div
            className="bg-card rounded-2xl border border-border p-6 mb-6 card-elevated-dark"
            data-ocid="player_profile.chart"
          >
            <h2 className="font-display font-bold text-foreground mb-1">
              Runs Per Match (Last 5)
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              Performance trend over last 5 innings
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={chartData}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.02 260)"
                />
                <XAxis
                  dataKey="match"
                  tick={{ fill: "oklch(0.52 0.012 260)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "oklch(0.52 0.012 260)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="runs"
                  stroke="oklch(0.72 0.17 50)"
                  strokeWidth={2.5}
                  dot={{ fill: "oklch(0.72 0.17 50)", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "oklch(0.72 0.17 50)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Last 5 Performances Table */}
          <div
            className="bg-card rounded-2xl border border-border p-6 card-elevated-dark"
            data-ocid="player_profile.recent_matches"
          >
            <h2 className="font-display font-bold text-foreground mb-4">
              Last 5 Match Performances
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-muted-foreground font-body font-medium">
                      Match ID
                    </th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-body font-medium">
                      Date
                    </th>
                    <th className="text-right py-2 pr-4 text-muted-foreground font-body font-medium">
                      Runs
                    </th>
                    <th className="text-right py-2 text-muted-foreground font-body font-medium">
                      Wickets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {player.last5Performances.map((perf, i) => (
                    <tr
                      key={perf.matchId}
                      className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                      data-ocid={`player_profile.match.item.${i + 1}`}
                    >
                      <td className="py-3 pr-4 text-muted-foreground font-mono text-xs">
                        {perf.matchId}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {new Date(perf.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 pr-4 text-right font-display font-bold text-primary">
                        {perf.runs}
                      </td>
                      <td className="py-3 text-right font-display font-semibold text-foreground">
                        {perf.wickets}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
