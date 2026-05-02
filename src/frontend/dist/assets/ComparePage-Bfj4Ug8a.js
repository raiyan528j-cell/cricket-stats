import { r as reactExports, j as jsxRuntimeExports } from "./index-Ci83zjMo.js";
import { a as usePlayers, b as usePlayer, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { B as Badge } from "./badge-URa73Z5r.js";
import { S as Skeleton } from "./skeleton-D4kBxZl_.js";
import { m as motion } from "./proxy-uc6v2d6b.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Legend, a as Line } from "./LineChart-6XUe_uBI.js";
import "./useAuth-BamQ2yKg.js";
const roleLabels = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder"
};
const P1_COLOR = "oklch(0.72 0.17 50)";
const P2_COLOR = "oklch(0.65 0.22 270)";
function numericVal(v) {
  if (v === null) return Number.NEGATIVE_INFINITY;
  const n = typeof v === "number" ? v : Number.parseFloat(v);
  return Number.isNaN(n) ? Number.NEGATIVE_INFINITY : n;
}
function StatRow({
  label,
  val1,
  val2,
  higherIsBetter = true,
  index
}) {
  const n1 = numericVal(val1);
  const n2 = numericVal(val2);
  const hasBoth = val1 !== null && val2 !== null;
  const p1Better = hasBoth && (higherIsBetter ? n1 > n2 : n1 < n2);
  const p2Better = hasBoth && (higherIsBetter ? n2 > n1 : n2 < n1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, delay: index * 0.05 },
      className: `border-b border-border/50 ${index % 2 === 0 ? "bg-muted/10" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-center text-sm text-muted-foreground font-body", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: `py-3 px-4 text-center font-display font-bold text-base ${p1Better ? "text-primary" : hasBoth && p2Better ? "text-muted-foreground" : "text-foreground"}`,
            children: val1 !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: p1Better ? "inline-flex items-center gap-1" : "", children: [
              val1,
              p1Better && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary", children: "▲" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "—" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: `py-3 px-4 text-center font-display font-bold text-base ${p2Better ? "text-[oklch(0.65_0.22_270)]" : hasBoth && p1Better ? "text-muted-foreground" : "text-foreground"}`,
            children: val2 !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: p2Better ? "inline-flex items-center gap-1" : "", children: [
              val2,
              p2Better && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "▲" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "—" })
          }
        )
      ]
    }
  );
}
function PlayerSelector({
  label,
  players,
  selectedId,
  onSelect,
  color,
  ocid,
  excludeId
}) {
  const filtered = players.filter((p) => p.id !== excludeId);
  const selectId = `player-select-${ocid}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: selectId,
        className: "text-xs font-body text-muted-foreground uppercase tracking-wider",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative",
        style: { borderColor: selectedId ? color : void 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: selectId,
              value: selectedId,
              onChange: (e) => onSelect(e.target.value),
              className: "w-full bg-card border border-border rounded-xl px-4 py-3 pr-10 text-sm font-body text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth",
              "data-ocid": ocid,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a player…" }),
                filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
                  p.name,
                  " (",
                  p.country,
                  ")"
                ] }, p.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs", children: "▾" })
        ]
      }
    )
  ] });
}
function PlayerCardHeader({
  player,
  color,
  isLoading,
  slot
}) {
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" });
  if (!player)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-xl bg-muted/20 border border-dashed border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/50 text-sm", children: [
      slot,
      " not selected"
    ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 bg-card rounded-xl border border-border p-4",
      style: { borderLeftColor: color, borderLeftWidth: 3 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0",
            style: { background: `${color}22`, color },
            children: player.name.charAt(0)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground truncate", children: player.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: player.country }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs px-1.5 py-0", children: roleLabels[player.role] ?? player.role })
          ] })
        ] })
      ]
    }
  );
}
const CustomTooltip = ({
  active,
  payload,
  label
}) => {
  if (active && (payload == null ? void 0 : payload.length)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg px-3 py-2 text-sm shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-1", children: label }),
      payload.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "font-display font-bold",
          style: { color: entry.color },
          children: [
            entry.name,
            ": ",
            entry.value,
            " runs"
          ]
        },
        entry.name
      ))
    ] });
  }
  return null;
};
function CompareChart({ player1, player2 }) {
  const maxLen = Math.max(
    (player1 == null ? void 0 : player1.last5Performances.length) ?? 0,
    (player2 == null ? void 0 : player2.last5Performances.length) ?? 0
  );
  if (maxLen === 0) return null;
  const chartData = Array.from({ length: maxLen }, (_, i) => {
    var _a, _b;
    return {
      match: `Match ${i + 1}`,
      ...player1 ? { [player1.name]: ((_a = player1.last5Performances[i]) == null ? void 0 : _a.runs) ?? null } : {},
      ...player2 ? { [player2.name]: ((_b = player2.last5Performances[i]) == null ? void 0 : _b.runs) ?? null } : {}
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl border border-border p-6 card-elevated-dark",
      "data-ocid": "compare.chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-1", children: "Runs Per Match (Last 5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Head-to-head performance trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          LineChart,
          {
            data: chartData,
            margin: { top: 8, right: 16, left: 0, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.26 0.02 260)" }),
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
                Legend,
                {
                  wrapperStyle: { fontSize: 12, color: "oklch(0.52 0.012 260)" }
                }
              ),
              player1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: player1.name,
                  stroke: P1_COLOR,
                  strokeWidth: 2.5,
                  dot: { fill: P1_COLOR, r: 4, strokeWidth: 0 },
                  activeDot: { r: 6, fill: P1_COLOR },
                  connectNulls: false
                }
              ),
              player2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: player2.name,
                  stroke: P2_COLOR,
                  strokeWidth: 2.5,
                  dot: { fill: P2_COLOR, r: 4, strokeWidth: 0 },
                  activeDot: { r: 6, fill: P2_COLOR },
                  connectNulls: false
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function ComparePage() {
  const { data: allPlayers, isLoading: playersLoading } = usePlayers();
  const [p1Id, setP1Id] = reactExports.useState("");
  const [p2Id, setP2Id] = reactExports.useState("");
  const { data: player1, isLoading: p1Loading } = usePlayer(p1Id || void 0);
  const { data: player2, isLoading: p2Loading } = usePlayer(p2Id || void 0);
  const players = allPlayers ?? [];
  const anySelected = p1Id || p2Id;
  const statRows = [
    {
      label: "Matches Played",
      v1: player1 ? player1.matchCount : null,
      v2: player2 ? player2.matchCount : null
    },
    {
      label: "Total Runs",
      v1: player1 ? player1.totalRuns : null,
      v2: player2 ? player2.totalRuns : null
    },
    {
      label: "Total Wickets",
      v1: player1 ? player1.totalWickets : null,
      v2: player2 ? player2.totalWickets : null
    },
    {
      label: "Average",
      v1: player1 ? player1.average.toFixed(2) : null,
      v2: player2 ? player2.average.toFixed(2) : null
    },
    {
      label: "Strike Rate",
      v1: player1 ? player1.strikeRate.toFixed(1) : null,
      v2: player2 ? player2.strikeRate.toFixed(1) : null
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "mb-6",
        "data-ocid": "compare.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-1", children: "Head-to-Head" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Compare two players side by side" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",
        "data-ocid": "compare.selectors",
        children: playersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[72px] rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[72px] rounded-xl" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlayerSelector,
            {
              label: "Player 1",
              players,
              selectedId: p1Id,
              onSelect: setP1Id,
              color: P1_COLOR,
              ocid: "compare.player1_select",
              excludeId: p2Id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlayerSelector,
            {
              label: "Player 2",
              players,
              selectedId: p2Id,
              onSelect: setP2Id,
              color: P2_COLOR,
              ocid: "compare.player2_select",
              excludeId: p1Id
            }
          )
        ] })
      }
    ),
    !anySelected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.35 },
        className: "flex flex-col items-center justify-center py-20 gap-4 bg-card rounded-2xl border border-dashed border-border",
        "data-ocid": "compare.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl", children: "⚡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: "Select two players to compare" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Use the dropdowns above to choose players" })
          ] })
        ]
      }
    ),
    anySelected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 mb-6 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlayerCardHeader,
          {
            player: player1 ?? null,
            color: P1_COLOR,
            isLoading: p1Loading,
            slot: "Player 1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex items-center justify-center h-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-muted-foreground/50", children: "VS" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlayerCardHeader,
          {
            player: player2 ?? null,
            color: P2_COLOR,
            isLoading: p2Loading,
            slot: "Player 2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card rounded-2xl border border-border overflow-hidden mb-6 card-elevated-dark",
          "data-ocid": "compare.stats_table",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-center text-xs text-muted-foreground font-body font-medium uppercase tracking-wider w-1/3", children: "Stat" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "py-3 px-4 text-center text-xs font-body font-semibold uppercase tracking-wider w-1/3",
                  style: { color: P1_COLOR },
                  children: (p1Loading ? "Player 1" : player1 == null ? void 0 : player1.name) ?? "Player 1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "py-3 px-4 text-center text-xs font-body font-semibold uppercase tracking-wider w-1/3",
                  style: { color: P2_COLOR },
                  children: (p2Loading ? "Player 2" : player2 == null ? void 0 : player2.name) ?? "Player 2"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: p1Loading || p2Loading ? [
              "matches",
              "runs",
              "wickets",
              "average",
              "strike-rate"
            ].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: ["label", "p1", "p2"].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 rounded" }) }, col)) }, key)) : statRows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatRow,
              {
                label: row.label,
                val1: row.v1,
                val2: row.v2,
                higherIsBetter: row.higherIsBetter,
                index: i
              },
              row.label
            )) })
          ] }) })
        }
      ),
      !p1Loading && !p2Loading && /* @__PURE__ */ jsxRuntimeExports.jsx(CompareChart, { player1: player1 ?? null, player2: player2 ?? null })
    ] })
  ] });
}
export {
  ComparePage as default
};
