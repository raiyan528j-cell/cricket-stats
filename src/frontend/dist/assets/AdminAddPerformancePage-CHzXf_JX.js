import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-Ci83zjMo.js";
import { a as usePlayers, f as useAddPerformance, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { b as useAuth, B as Button } from "./useAuth-BamQ2yKg.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-F-U7iXuh.js";
import { I as Input } from "./input-CTCZSTrQ.js";
import { A as ArrowLeft, L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7Hz0a3FP.js";
import "./index-BmTYpwrF.js";
function AdminAddPerformancePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: players, isLoading: playersLoading } = usePlayers();
  const addPerformance = useAddPerformance();
  const [playerId, setPlayerId] = reactExports.useState("");
  const [matchId, setMatchId] = reactExports.useState("");
  const [matchDate, setMatchDate] = reactExports.useState("");
  const [teamA, setTeamA] = reactExports.useState("");
  const [teamB, setTeamB] = reactExports.useState("");
  const [runs, setRuns] = reactExports.useState("");
  const [wickets, setWickets] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState({
    playerId: false,
    matchDate: false,
    teamA: false,
    teamB: false,
    runs: false,
    wickets: false
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);
  const runsNum = runs === "" ? Number.NaN : Number(runs);
  const wicketsNum = wickets === "" ? Number.NaN : Number(wickets);
  const errors = {
    playerId: !playerId ? "Please select a player" : "",
    matchDate: !matchDate ? "Match date is required" : "",
    teamA: teamA.trim().length === 0 ? "Team A is required" : teamA.trim().length < 2 ? "Team A must be at least 2 characters" : "",
    teamB: teamB.trim().length === 0 ? "Team B is required" : teamB.trim().length < 2 ? "Team B must be at least 2 characters" : "",
    runs: runs === "" ? "Runs is required" : Number.isNaN(runsNum) || !Number.isInteger(runsNum) ? "Enter a whole number" : runsNum < 0 ? "Runs cannot be negative" : "",
    wickets: wickets === "" ? "Wickets is required" : Number.isNaN(wicketsNum) || !Number.isInteger(wicketsNum) ? "Enter a whole number" : wicketsNum < 0 ? "Wickets cannot be negative" : wicketsNum > 10 ? "Wickets cannot exceed 10" : ""
  };
  const showError = (field) => (touched[field] || submitted) && !!errors[field];
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      ue.error("Please fix the errors before submitting");
      return;
    }
    const dateMs = new Date(matchDate).getTime();
    const dateNs = BigInt(dateMs) * 1000000n;
    const resolvedMatchId = matchId.trim() || `match-${Date.now()}`;
    try {
      await addPerformance.mutateAsync({
        playerId,
        matchId: resolvedMatchId,
        date: dateNs,
        runs: runsNum,
        wickets: wicketsNum,
        teamA: teamA.trim(),
        teamB: teamB.trim()
      });
      ue.success("Performance recorded successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to record performance";
      ue.error(msg);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg mx-auto px-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => navigate({ to: "/admin/dashboard" }),
        className: "mb-5 text-muted-foreground",
        "data-ocid": "add_performance.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to Dashboard"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "bg-card border-border card-elevated-dark",
        "data-ocid": "add_performance.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Add Performance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log a match performance for a player." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "player", className: "text-foreground", children: "Player" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: playerId,
                  onValueChange: (v) => {
                    setPlayerId(v);
                    touch("playerId");
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "player",
                        className: `bg-background border-input ${showError("playerId") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                        "data-ocid": "add_performance.player_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select player…" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: playersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__loading__", disabled: true, children: "Loading players…" }) : (players ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", disabled: true, children: "No players available" }) : (players ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.name }, p.id)) })
                  ]
                }
              ),
              showError("playerId") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "add_performance.player_select.field_error",
                  children: errors.playerId
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "matchId", className: "text-foreground", children: [
                "Match ID",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional — auto-generated if blank)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "matchId",
                  value: matchId,
                  onChange: (e) => setMatchId(e.target.value),
                  placeholder: "e.g. match-2024-03-01",
                  className: "bg-background border-input",
                  "data-ocid": "add_performance.match_id_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "matchDate", className: "text-foreground", children: "Match Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "matchDate",
                  type: "date",
                  value: matchDate,
                  onChange: (e) => {
                    setMatchDate(e.target.value);
                    touch("matchDate");
                  },
                  onBlur: () => touch("matchDate"),
                  className: `bg-background border-input ${showError("matchDate") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                  "aria-invalid": showError("matchDate"),
                  "data-ocid": "add_performance.date_input"
                }
              ),
              showError("matchDate") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "add_performance.date_input.field_error",
                  children: errors.matchDate
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "teamA", className: "text-foreground", children: "Team A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "teamA",
                    value: teamA,
                    onChange: (e) => {
                      setTeamA(e.target.value);
                      touch("teamA");
                    },
                    onBlur: () => touch("teamA"),
                    placeholder: "e.g. India",
                    className: `bg-background border-input ${showError("teamA") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "aria-invalid": showError("teamA"),
                    "data-ocid": "add_performance.team_a_input"
                  }
                ),
                showError("teamA") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "add_performance.team_a_input.field_error",
                    children: errors.teamA
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "teamB", className: "text-foreground", children: "Team B" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "teamB",
                    value: teamB,
                    onChange: (e) => {
                      setTeamB(e.target.value);
                      touch("teamB");
                    },
                    onBlur: () => touch("teamB"),
                    placeholder: "e.g. Australia",
                    className: `bg-background border-input ${showError("teamB") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "aria-invalid": showError("teamB"),
                    "data-ocid": "add_performance.team_b_input"
                  }
                ),
                showError("teamB") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "add_performance.team_b_input.field_error",
                    children: errors.teamB
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "runs", className: "text-foreground", children: "Runs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "runs",
                    type: "number",
                    min: "0",
                    value: runs,
                    onChange: (e) => {
                      setRuns(e.target.value);
                      touch("runs");
                    },
                    onBlur: () => touch("runs"),
                    placeholder: "0",
                    className: `bg-background border-input ${showError("runs") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "aria-invalid": showError("runs"),
                    "data-ocid": "add_performance.runs_input"
                  }
                ),
                showError("runs") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "add_performance.runs_input.field_error",
                    children: errors.runs
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wickets", className: "text-foreground", children: "Wickets" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "wickets",
                    type: "number",
                    min: "0",
                    max: "10",
                    value: wickets,
                    onChange: (e) => {
                      setWickets(e.target.value);
                      touch("wickets");
                    },
                    onBlur: () => touch("wickets"),
                    placeholder: "0",
                    className: `bg-background border-input ${showError("wickets") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "aria-invalid": showError("wickets"),
                    "data-ocid": "add_performance.wickets_input"
                  }
                ),
                showError("wickets") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "add_performance.wickets_input.field_error",
                    children: errors.wickets
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold",
                disabled: addPerformance.isPending,
                "data-ocid": "add_performance.submit_button",
                children: addPerformance.isPending ? "Saving…" : "Record Performance"
              }
            )
          ] }) })
        ]
      }
    )
  ] }) });
}
export {
  AdminAddPerformancePage as default
};
