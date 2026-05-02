import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PlayerSummary } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

const roleLabels: Record<string, string> = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder",
};

const roleColors: Record<string, string> = {
  batter: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  bowler: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  allRounder: "bg-chart-3/20 text-chart-3 border-chart-3/30",
};

interface PlayerCardProps {
  player: PlayerSummary;
  index?: number;
}

export function PlayerCard({ player, index = 0 }: PlayerCardProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Card
        className="card-elevated-dark bg-card border-border transition-elevation hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
        onClick={() =>
          navigate({
            to: "/players/$playerId",
            params: { playerId: player.id },
          })
        }
        data-ocid={`player_card.item.${index + 1}`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-foreground truncate text-base">
                {player.name}
              </h3>
              <p className="text-sm text-muted-foreground">{player.country}</p>
            </div>
            <Badge
              variant="outline"
              className={`ml-2 shrink-0 text-xs border ${roleColors[player.role] ?? ""}`}
            >
              {roleLabels[player.role] ?? player.role}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Runs
              </p>
              <p className="font-display font-bold text-primary">
                {player.totalRuns}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Wkts
              </p>
              <p className="font-display font-bold text-foreground">
                {player.totalWickets}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                M
              </p>
              <p className="font-display font-bold text-foreground">
                {player.matchCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
