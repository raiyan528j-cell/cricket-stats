import { Layout } from "@/components/Layout";
import { MedalBadge } from "@/components/MedalBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import type { LeaderboardEntry, LeaderboardType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { BarChart2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const tabs: { value: LeaderboardType; label: string; statLabel: string }[] = [
  { value: "runs", label: "Top Runs", statLabel: "Runs" },
  { value: "wickets", label: "Top Wickets", statLabel: "Wickets" },
  { value: "average", label: "Best Average", statLabel: "Avg" },
];

function LeaderboardRow({
  entry,
  statLabel,
  delay,
}: { entry: LeaderboardEntry; statLabel: string; delay: number }) {
  const navigate = useNavigate();
  const isTop3 = entry.rank <= 3;
  return (
    <motion.div
      key={entry.player.id}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-smooth hover:bg-muted/40 ${
        isTop3 ? "bg-card border border-border" : "bg-muted/20"
      }`}
      onClick={() =>
        navigate({
          to: "/players/$playerId",
          params: { playerId: entry.player.id },
        })
      }
      data-ocid={`leaderboard.item.${entry.rank}`}
    >
      {isTop3 ? (
        <MedalBadge rank={entry.rank} size="sm" />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center text-muted-foreground font-display font-bold text-sm">
          {entry.rank}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground truncate">
          {entry.player.name}
        </p>
        <p className="text-xs text-muted-foreground">{entry.player.country}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-display font-bold text-primary text-lg">
          {typeof entry.statValue === "number" &&
          !Number.isInteger(entry.statValue)
            ? entry.statValue.toFixed(2)
            : entry.statValue}
        </p>
        <p className="text-xs text-muted-foreground">{statLabel}</p>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("runs");
  const { data, isLoading } = useLeaderboard(activeTab);
  const entries = (data ?? []).slice(0, 10);
  const currentTab = tabs.find((t) => t.value === activeTab)!;

  return (
    <Layout>
      <div className="mb-6" data-ocid="leaderboard.page">
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Top performers ranked dynamically
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as LeaderboardType)}
        className="mb-6"
      >
        <TabsList
          className="bg-card border border-border"
          data-ocid="leaderboard.filter.tab"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid={`leaderboard.${tab.value}_tab`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 bg-card border border-dashed border-border rounded-2xl"
          data-ocid="leaderboard.empty_state"
        >
          <BarChart2 className="w-12 h-12 text-muted-foreground" />
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">
              No data available
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Add players and performances via the admin panel
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div className="flex flex-col gap-2" key={activeTab}>
            {entries.map((entry, i) => (
              <LeaderboardRow
                key={entry.player.id}
                entry={entry}
                statLabel={currentTab.statLabel}
                delay={i * 0.04}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </Layout>
  );
}
