import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlayer, usePlayers } from "@/hooks/usePlayers";
import type { PlayerDetail, PlayerSummary } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
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

// Colors for player 1 and player 2 lines
const P1_COLOR = "oklch(0.72 0.17 50)";
const P2_COLOR = "oklch(0.65 0.22 270)";

interface StatRowProps {
  label: string;
  val1: number | string | null;
  val2: number | string | null;
  higherIsBetter?: boolean;
  index: number;
}

function numericVal(v: number | string | null): number {
  if (v === null) return Number.NEGATIVE_INFINITY;
  const n = typeof v === "number" ? v : Number.parseFloat(v);
  return Number.isNaN(n) ? Number.NEGATIVE_INFINITY : n;
}

function StatRow({
  label,
  val1,
  val2,
  higherIsBetter = true,
  index,
}: StatRowProps) {
  const n1 = numericVal(val1);
  const n2 = numericVal(val2);
  const hasBoth = val1 !== null && val2 !== null;
  const p1Better = hasBoth && (higherIsBetter ? n1 > n2 : n1 < n2);
  const p2Better = hasBoth && (higherIsBetter ? n2 > n1 : n2 < n1);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={`border-b border-border/50 ${
        index % 2 === 0 ? "bg-muted/10" : ""
      }`}
    >
      <td className="py-3 px-4 text-center text-sm text-muted-foreground font-body">
        {label}
      </td>
      <td
        className={`py-3 px-4 text-center font-display font-bold text-base ${
          p1Better
            ? "text-primary"
            : hasBoth && p2Better
              ? "text-muted-foreground"
              : "text-foreground"
        }`}
      >
        {val1 !== null ? (
          <span className={p1Better ? "inline-flex items-center gap-1" : ""}>
            {val1}
            {p1Better && <span className="text-xs text-primary">▲</span>}
          </span>
        ) : (
          <span className="text-muted-foreground/40">—</span>
        )}
      </td>
      <td
        className={`py-3 px-4 text-center font-display font-bold text-base ${
          p2Better
            ? "text-[oklch(0.65_0.22_270)]"
            : hasBoth && p1Better
              ? "text-muted-foreground"
              : "text-foreground"
        }`}
      >
        {val2 !== null ? (
          <span className={p2Better ? "inline-flex items-center gap-1" : ""}>
            {val2}
            {p2Better && <span className="text-xs">▲</span>}
          </span>
        ) : (
          <span className="text-muted-foreground/40">—</span>
        )}
      </td>
    </motion.tr>
  );
}

interface PlayerSelectorProps {
  label: string;
  players: PlayerSummary[];
  selectedId: string;
  onSelect: (id: string) => void;
  color: string;
  ocid: string;
  excludeId?: string;
}

function PlayerSelector({
  label,
  players,
  selectedId,
  onSelect,
  color,
  ocid,
  excludeId,
}: PlayerSelectorProps) {
  const filtered = players.filter((p) => p.id !== excludeId);
  const selectId = `player-select-${ocid}`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={selectId}
        className="text-xs font-body text-muted-foreground uppercase tracking-wider"
      >
        {label}
      </label>
      <div
        className="relative"
        style={{ borderColor: selectedId ? color : undefined }}
      >
        <select
          id={selectId}
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 pr-10 text-sm font-body text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
          data-ocid={ocid}
        >
          <option value="">Select a player…</option>
          {filtered.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.country})
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}

interface PlayerCardHeaderProps {
  player: PlayerDetail | null;
  color: string;
  isLoading: boolean;
  slot: string;
}

function PlayerCardHeader({
  player,
  color,
  isLoading,
  slot,
}: PlayerCardHeaderProps) {
  if (isLoading) return <Skeleton className="h-16 rounded-xl" />;
  if (!player)
    return (
      <div className="h-16 rounded-xl bg-muted/20 border border-dashed border-border flex items-center justify-center">
        <span className="text-muted-foreground/50 text-sm">
          {slot} not selected
        </span>
      </div>
    );
  return (
    <div
      className="flex items-center gap-3 bg-card rounded-xl border border-border p-4"
      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
        style={{ background: `${color}22`, color }}
      >
        {player.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="font-display font-bold text-foreground truncate">
          {player.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs text-muted-foreground">
            {player.country}
          </span>
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            {roleLabels[player.role] ?? player.role}
          </Badge>
        </div>
      </div>
    </div>
  );
}

interface CompareChartProps {
  player1: PlayerDetail | null;
  player2: PlayerDetail | null;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (active && payload?.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((entry) => (
          <p
            key={entry.name}
            className="font-display font-bold"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value} runs
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function CompareChart({ player1, player2 }: CompareChartProps) {
  const maxLen = Math.max(
    player1?.last5Performances.length ?? 0,
    player2?.last5Performances.length ?? 0,
  );

  if (maxLen === 0) return null;

  const chartData = Array.from({ length: maxLen }, (_, i) => ({
    match: `Match ${i + 1}`,
    ...(player1
      ? { [player1.name]: player1.last5Performances[i]?.runs ?? null }
      : {}),
    ...(player2
      ? { [player2.name]: player2.last5Performances[i]?.runs ?? null }
      : {}),
  }));

  return (
    <div
      className="bg-card rounded-2xl border border-border p-6 card-elevated-dark"
      data-ocid="compare.chart"
    >
      <h2 className="font-display font-bold text-foreground mb-1">
        Runs Per Match (Last 5)
      </h2>
      <p className="text-xs text-muted-foreground mb-5">
        Head-to-head performance trend
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.02 260)" />
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
          <Legend
            wrapperStyle={{ fontSize: 12, color: "oklch(0.52 0.012 260)" }}
          />
          {player1 && (
            <Line
              type="monotone"
              dataKey={player1.name}
              stroke={P1_COLOR}
              strokeWidth={2.5}
              dot={{ fill: P1_COLOR, r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: P1_COLOR }}
              connectNulls={false}
            />
          )}
          {player2 && (
            <Line
              type="monotone"
              dataKey={player2.name}
              stroke={P2_COLOR}
              strokeWidth={2.5}
              dot={{ fill: P2_COLOR, r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: P2_COLOR }}
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ComparePage() {
  const { data: allPlayers, isLoading: playersLoading } = usePlayers();
  const [p1Id, setP1Id] = useState("");
  const [p2Id, setP2Id] = useState("");

  const { data: player1, isLoading: p1Loading } = usePlayer(p1Id || undefined);
  const { data: player2, isLoading: p2Loading } = usePlayer(p2Id || undefined);

  const players = allPlayers ?? [];
  const anySelected = p1Id || p2Id;

  const statRows: {
    label: string;
    v1: number | string | null;
    v2: number | string | null;
    higherIsBetter?: boolean;
  }[] = [
    {
      label: "Matches Played",
      v1: player1 ? player1.matchCount : null,
      v2: player2 ? player2.matchCount : null,
    },
    {
      label: "Total Runs",
      v1: player1 ? player1.totalRuns : null,
      v2: player2 ? player2.totalRuns : null,
    },
    {
      label: "Total Wickets",
      v1: player1 ? player1.totalWickets : null,
      v2: player2 ? player2.totalWickets : null,
    },
    {
      label: "Average",
      v1: player1 ? player1.average.toFixed(2) : null,
      v2: player2 ? player2.average.toFixed(2) : null,
    },
    {
      label: "Strike Rate",
      v1: player1 ? player1.strikeRate.toFixed(1) : null,
      v2: player2 ? player2.strikeRate.toFixed(1) : null,
    },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6"
        data-ocid="compare.page"
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Head-to-Head
        </h1>
        <p className="text-muted-foreground">
          Compare two players side by side
        </p>
      </motion.div>

      {/* Player Selectors */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        data-ocid="compare.selectors"
      >
        {playersLoading ? (
          <>
            <Skeleton className="h-[72px] rounded-xl" />
            <Skeleton className="h-[72px] rounded-xl" />
          </>
        ) : (
          <>
            <PlayerSelector
              label="Player 1"
              players={players}
              selectedId={p1Id}
              onSelect={setP1Id}
              color={P1_COLOR}
              ocid="compare.player1_select"
              excludeId={p2Id}
            />
            <PlayerSelector
              label="Player 2"
              players={players}
              selectedId={p2Id}
              onSelect={setP2Id}
              color={P2_COLOR}
              ocid="compare.player2_select"
              excludeId={p1Id}
            />
          </>
        )}
      </div>

      {/* No selection prompt */}
      {!anySelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center justify-center py-20 gap-4 bg-card rounded-2xl border border-dashed border-border"
          data-ocid="compare.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
            ⚡
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-foreground text-lg">
              Select two players to compare
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Use the dropdowns above to choose players
            </p>
          </div>
        </motion.div>
      )}

      {/* Player card headers */}
      {anySelected && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 mb-6 items-start">
            <PlayerCardHeader
              player={player1 ?? null}
              color={P1_COLOR}
              isLoading={p1Loading}
              slot="Player 1"
            />
            <div className="hidden sm:flex items-center justify-center h-16">
              <span className="text-2xl font-display font-bold text-muted-foreground/50">
                VS
              </span>
            </div>
            <PlayerCardHeader
              player={player2 ?? null}
              color={P2_COLOR}
              isLoading={p2Loading}
              slot="Player 2"
            />
          </div>

          {/* Stats Table */}
          <div
            className="bg-card rounded-2xl border border-border overflow-hidden mb-6 card-elevated-dark"
            data-ocid="compare.stats_table"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="py-3 px-4 text-center text-xs text-muted-foreground font-body font-medium uppercase tracking-wider w-1/3">
                      Stat
                    </th>
                    <th
                      className="py-3 px-4 text-center text-xs font-body font-semibold uppercase tracking-wider w-1/3"
                      style={{ color: P1_COLOR }}
                    >
                      {(p1Loading ? "Player 1" : player1?.name) ?? "Player 1"}
                    </th>
                    <th
                      className="py-3 px-4 text-center text-xs font-body font-semibold uppercase tracking-wider w-1/3"
                      style={{ color: P2_COLOR }}
                    >
                      {(p2Loading ? "Player 2" : player2?.name) ?? "Player 2"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p1Loading || p2Loading
                    ? [
                        "matches",
                        "runs",
                        "wickets",
                        "average",
                        "strike-rate",
                      ].map((key) => (
                        <tr key={key} className="border-b border-border/50">
                          {(["label", "p1", "p2"] as const).map((col) => (
                            <td key={col} className="py-3 px-4">
                              <Skeleton className="h-5 rounded" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : statRows.map((row, i) => (
                        <StatRow
                          key={row.label}
                          label={row.label}
                          val1={row.v1}
                          val2={row.v2}
                          higherIsBetter={row.higherIsBetter}
                          index={i}
                        />
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart */}
          {!p1Loading && !p2Loading && (
            <CompareChart player1={player1 ?? null} player2={player2 ?? null} />
          )}
        </>
      )}
    </Layout>
  );
}
