import { j as jsxRuntimeExports, a as useParams, u as useNavigate } from "./index-Ci83zjMo.js";
import { b as usePlayer, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { C as Card, a as CardContent } from "./card-F-U7iXuh.js";
import { B as Badge } from "./badge-URa73Z5r.js";
import { c as createLucideIcon, B as Button } from "./useAuth-BamQ2yKg.js";
import { S as Skeleton } from "./skeleton-D4kBxZl_.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line } from "./LineChart-6XUe_uBI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function StatCard({ label, value, sub, accent }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated-dark bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground uppercase tracking-wider mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-2xl font-display font-bold ${accent ? "text-primary" : "text-foreground"}`,
        children: value
      }
    ),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
  ] }) });
}
const roleLabels = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder"
};
const CustomTooltip = ({
  active,
  payload,
  label
}) => {
  if (active && (payload == null ? void 0 : payload.length)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg px-3 py-2 text-sm shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-1", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-primary", children: [
        payload[0].value,
        " runs"
      ] })
    ] });
  }
  return null;
};
function PlayerProfilePage() {
  const { playerId } = useParams({ from: "/players/$playerId" });
  const { data: player, isLoading } = usePlayer(playerId);
  const navigate = useNavigate();
  const chartData = ((player == null ? void 0 : player.last5Performances) ?? []).map((p, i) => ({
    match: `Match ${i + 1}`,
    runs: p.runs
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" })
  ] }) : !player ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 gap-4",
      "data-ocid": "player_profile.not_found",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-14 h-14 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Player not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This player may have been removed or the link is invalid." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => navigate({ to: "/players" }),
            "data-ocid": "player_profile.back_button",
            children: "← Back to Players"
          }
        )
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card rounded-2xl border border-border p-6 mb-6 card-elevated-dark",
        "data-ocid": "player_profile.card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-display font-bold text-primary shrink-0", children: player.name.charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: player.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: player.country }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: roleLabels[player.role] ?? player.role })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-5 gap-4 mb-6",
        "data-ocid": "player_profile.stats",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Matches", value: player.matchCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Runs", value: player.totalRuns, accent: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Wickets", value: player.totalWickets }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Average",
              value: player.average.toFixed(2),
              accent: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Strike Rate",
              value: player.strikeRate.toFixed(1)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border p-6 mb-6 card-elevated-dark",
        "data-ocid": "player_profile.chart",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-1", children: "Runs Per Match (Last 5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Performance trend over last 5 innings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            LineChart,
            {
              data: chartData,
              margin: { top: 8, right: 16, left: 0, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "oklch(0.26 0.02 260)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "match",
                    tick: { fill: "oklch(0.52 0.012 260)", fontSize: 11 },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fill: "oklch(0.52 0.012 260)", fontSize: 11 },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "runs",
                    stroke: "oklch(0.72 0.17 50)",
                    strokeWidth: 2.5,
                    dot: { fill: "oklch(0.72 0.17 50)", r: 4, strokeWidth: 0 },
                    activeDot: { r: 6, fill: "oklch(0.72 0.17 50)" }
                  }
                )
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border p-6 card-elevated-dark",
        "data-ocid": "player_profile.recent_matches",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Last 5 Match Performances" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-body font-medium", children: "Match ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-4 text-muted-foreground font-body font-medium", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-4 text-muted-foreground font-body font-medium", children: "Runs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-muted-foreground font-body font-medium", children: "Wickets" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: player.last5Performances.map((perf, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
                "data-ocid": `player_profile.match.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-muted-foreground font-mono text-xs", children: perf.matchId }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-muted-foreground", children: new Date(perf.date).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-right font-display font-bold text-primary", children: perf.runs }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right font-display font-semibold text-foreground", children: perf.wickets })
                ]
              },
              perf.matchId
            )) })
          ] }) })
        ]
      }
    )
  ] }) });
}
export {
  PlayerProfilePage as default
};
