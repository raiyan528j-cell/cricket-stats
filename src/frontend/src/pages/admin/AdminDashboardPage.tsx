import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useDeletePlayer } from "@/hooks/usePlayers";
import { usePlayers } from "@/hooks/usePlayers";
import type { PlayerSummary } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Activity, Edit2, PlusCircle, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const roleLabels: Record<string, string> = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder",
};

export default function AdminDashboardPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: players, isLoading } = usePlayers();
  const deletePlayer = useDeletePlayer();

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);

  const handleDelete = async (player: PlayerSummary) => {
    if (!confirm(`Delete ${player.name}? This action cannot be undone.`))
      return;
    try {
      await deletePlayer.mutateAsync(player.id);
      toast.success(`${player.name} deleted`);
    } catch {
      toast.error("Failed to delete player");
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage players and performances
          </p>
        </div>
        <div className="flex gap-2" data-ocid="admin.action_buttons">
          <Button
            size="sm"
            onClick={() => navigate({ to: "/admin/add-player" })}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="admin.add_player_button"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Player
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: "/admin/add-performance" })}
            className="border-border text-foreground"
            data-ocid="admin.add_performance_button"
          >
            <Activity className="w-4 h-4 mr-2" />
            Add Performance
          </Button>
        </div>
      </div>

      <Card
        className="bg-card border-border card-elevated-dark"
        data-ocid="admin.players_table"
      >
        <CardHeader className="pb-3">
          <h2 className="font-display font-semibold text-foreground">
            Player Roster
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-muted-foreground font-body font-medium">
                      Name
                    </th>
                    <th className="text-left px-3 py-3 text-muted-foreground font-body font-medium">
                      Country
                    </th>
                    <th className="text-left px-3 py-3 text-muted-foreground font-body font-medium">
                      Role
                    </th>
                    <th className="text-right px-3 py-3 text-muted-foreground font-body font-medium">
                      Runs
                    </th>
                    <th className="text-right px-3 py-3 text-muted-foreground font-body font-medium">
                      Wkts
                    </th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-body font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(players ?? []).map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                      data-ocid={`admin.player.item.${i + 1}`}
                    >
                      <td className="px-5 py-3 font-display font-semibold text-foreground">
                        {p.name}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {p.country}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant="outline" className="text-xs">
                          {roleLabels[p.role] ?? p.role}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-right font-display font-bold text-primary">
                        {p.totalRuns}
                      </td>
                      <td className="px-3 py-3 text-right font-display font-semibold text-foreground">
                        {p.totalWickets}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              navigate({
                                to: "/admin/edit-player",
                                search: { id: p.id },
                              })
                            }
                            className="w-8 h-8 hover:bg-muted"
                            aria-label="Edit player"
                            data-ocid={`admin.edit_button.${i + 1}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(p)}
                            className="w-8 h-8 hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete player"
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(players ?? []).length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-muted-foreground"
                        data-ocid="admin.players_table.empty_state"
                      >
                        No players yet. Add your first player.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
