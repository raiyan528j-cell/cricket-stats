import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useAddPerformance, usePlayers } from "@/hooks/usePlayers";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAddPerformancePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: players, isLoading: playersLoading } = usePlayers();
  const addPerformance = useAddPerformance();

  const [playerId, setPlayerId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [runs, setRuns] = useState("");
  const [wickets, setWickets] = useState("");

  const [touched, setTouched] = useState({
    playerId: false,
    matchDate: false,
    teamA: false,
    teamB: false,
    runs: false,
    wickets: false,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);

  const runsNum = runs === "" ? Number.NaN : Number(runs);
  const wicketsNum = wickets === "" ? Number.NaN : Number(wickets);

  const errors = {
    playerId: !playerId ? "Please select a player" : "",
    matchDate: !matchDate ? "Match date is required" : "",
    teamA:
      teamA.trim().length === 0
        ? "Team A is required"
        : teamA.trim().length < 2
          ? "Team A must be at least 2 characters"
          : "",
    teamB:
      teamB.trim().length === 0
        ? "Team B is required"
        : teamB.trim().length < 2
          ? "Team B must be at least 2 characters"
          : "",
    runs:
      runs === ""
        ? "Runs is required"
        : Number.isNaN(runsNum) || !Number.isInteger(runsNum)
          ? "Enter a whole number"
          : runsNum < 0
            ? "Runs cannot be negative"
            : "",
    wickets:
      wickets === ""
        ? "Wickets is required"
        : Number.isNaN(wicketsNum) || !Number.isInteger(wicketsNum)
          ? "Enter a whole number"
          : wicketsNum < 0
            ? "Wickets cannot be negative"
            : wicketsNum > 10
              ? "Wickets cannot exceed 10"
              : "",
  };

  type ErrorKey = keyof typeof errors;

  const showError = (field: ErrorKey) =>
    (touched[field as keyof typeof touched] || submitted) && !!errors[field];

  const touch = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    const dateMs = new Date(matchDate).getTime();
    const dateNs = BigInt(dateMs) * 1_000_000n;
    const resolvedMatchId = matchId.trim() || `match-${Date.now()}`;
    try {
      await addPerformance.mutateAsync({
        playerId,
        matchId: resolvedMatchId,
        date: dateNs,
        runs: runsNum,
        wickets: wicketsNum,
        teamA: teamA.trim(),
        teamB: teamB.trim(),
      });
      toast.success("Performance recorded successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to record performance";
      toast.error(msg);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-lg mx-auto px-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/admin/dashboard" })}
          className="mb-5 text-muted-foreground"
          data-ocid="add_performance.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Card
          className="bg-card border-border card-elevated-dark"
          data-ocid="add_performance.card"
        >
          <CardHeader>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Add Performance
            </h1>
            <p className="text-sm text-muted-foreground">
              Log a match performance for a player.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Player select */}
              <div className="space-y-1.5">
                <Label htmlFor="player" className="text-foreground">
                  Player
                </Label>
                <Select
                  value={playerId}
                  onValueChange={(v) => {
                    setPlayerId(v);
                    touch("playerId");
                  }}
                >
                  <SelectTrigger
                    id="player"
                    className={`bg-background border-input ${
                      showError("playerId")
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                    data-ocid="add_performance.player_select"
                  >
                    <SelectValue placeholder="Select player…" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {playersLoading ? (
                      <SelectItem value="__loading__" disabled>
                        Loading players…
                      </SelectItem>
                    ) : (players ?? []).length === 0 ? (
                      <SelectItem value="__none__" disabled>
                        No players available
                      </SelectItem>
                    ) : (
                      (players ?? []).map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {showError("playerId") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="add_performance.player_select.field_error"
                  >
                    {errors.playerId}
                  </p>
                )}
              </div>

              {/* Match ID (optional) */}
              <div className="space-y-1.5">
                <Label htmlFor="matchId" className="text-foreground">
                  Match ID{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional — auto-generated if blank)
                  </span>
                </Label>
                <Input
                  id="matchId"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  placeholder="e.g. match-2024-03-01"
                  className="bg-background border-input"
                  data-ocid="add_performance.match_id_input"
                />
              </div>

              {/* Match Date */}
              <div className="space-y-1.5">
                <Label htmlFor="matchDate" className="text-foreground">
                  Match Date
                </Label>
                <Input
                  id="matchDate"
                  type="date"
                  value={matchDate}
                  onChange={(e) => {
                    setMatchDate(e.target.value);
                    touch("matchDate");
                  }}
                  onBlur={() => touch("matchDate")}
                  className={`bg-background border-input ${
                    showError("matchDate")
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={showError("matchDate")}
                  data-ocid="add_performance.date_input"
                />
                {showError("matchDate") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="add_performance.date_input.field_error"
                  >
                    {errors.matchDate}
                  </p>
                )}
              </div>

              {/* Teams */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="teamA" className="text-foreground">
                    Team A
                  </Label>
                  <Input
                    id="teamA"
                    value={teamA}
                    onChange={(e) => {
                      setTeamA(e.target.value);
                      touch("teamA");
                    }}
                    onBlur={() => touch("teamA")}
                    placeholder="e.g. India"
                    className={`bg-background border-input ${
                      showError("teamA")
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                    aria-invalid={showError("teamA")}
                    data-ocid="add_performance.team_a_input"
                  />
                  {showError("teamA") && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="add_performance.team_a_input.field_error"
                    >
                      {errors.teamA}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="teamB" className="text-foreground">
                    Team B
                  </Label>
                  <Input
                    id="teamB"
                    value={teamB}
                    onChange={(e) => {
                      setTeamB(e.target.value);
                      touch("teamB");
                    }}
                    onBlur={() => touch("teamB")}
                    placeholder="e.g. Australia"
                    className={`bg-background border-input ${
                      showError("teamB")
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                    aria-invalid={showError("teamB")}
                    data-ocid="add_performance.team_b_input"
                  />
                  {showError("teamB") && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="add_performance.team_b_input.field_error"
                    >
                      {errors.teamB}
                    </p>
                  )}
                </div>
              </div>

              {/* Runs & Wickets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="runs" className="text-foreground">
                    Runs
                  </Label>
                  <Input
                    id="runs"
                    type="number"
                    min="0"
                    value={runs}
                    onChange={(e) => {
                      setRuns(e.target.value);
                      touch("runs");
                    }}
                    onBlur={() => touch("runs")}
                    placeholder="0"
                    className={`bg-background border-input ${
                      showError("runs")
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                    aria-invalid={showError("runs")}
                    data-ocid="add_performance.runs_input"
                  />
                  {showError("runs") && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="add_performance.runs_input.field_error"
                    >
                      {errors.runs}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wickets" className="text-foreground">
                    Wickets
                  </Label>
                  <Input
                    id="wickets"
                    type="number"
                    min="0"
                    max="10"
                    value={wickets}
                    onChange={(e) => {
                      setWickets(e.target.value);
                      touch("wickets");
                    }}
                    onBlur={() => touch("wickets")}
                    placeholder="0"
                    className={`bg-background border-input ${
                      showError("wickets")
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                    aria-invalid={showError("wickets")}
                    data-ocid="add_performance.wickets_input"
                  />
                  {showError("wickets") && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="add_performance.wickets_input.field_error"
                    >
                      {errors.wickets}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
                disabled={addPerformance.isPending}
                data-ocid="add_performance.submit_button"
              >
                {addPerformance.isPending ? "Saving…" : "Record Performance"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
