import { u as useNavigate, j as jsxRuntimeExports } from "./index-Ci83zjMo.js";
import { u as useLeaderboard, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { C as ChartNoAxesColumn, M as MedalBadge } from "./MedalBadge-C1lG390W.js";
import { c as createLucideIcon, B as Button } from "./useAuth-BamQ2yKg.js";
import { C as Card, a as CardContent } from "./card-F-U7iXuh.js";
import { S as Skeleton } from "./skeleton-D4kBxZl_.js";
import { m as motion } from "./proxy-uc6v2d6b.js";
import { U as Users } from "./users-ChtF8Bei.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const heroImg = "/assets/generated/cricket-hero.dim_1400x560.jpg";
function TopPerformerCard({
  entry,
  isHero,
  statType = "runs"
}) {
  const navigate = useNavigate();
  const highlightRuns = statType === "runs";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: (entry.rank - 1) * 0.1 },
      className: isHero ? "md:col-span-1 order-first md:order-none" : "",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          onClick: () => navigate({
            to: "/players/$playerId",
            params: { playerId: entry.player.id }
          }),
          className: `card-elevated-dark bg-card border-border cursor-pointer transition-elevation hover:-translate-y-1 ${entry.rank === 1 ? "ring-1 ring-primary/40" : ""}`,
          "data-ocid": `top_${statType}_performers.item.${entry.rank}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MedalBadge,
                {
                  rank: entry.rank,
                  size: entry.rank === 1 ? "lg" : "md"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base truncate", children: entry.player.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: entry.player.country })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-md p-2 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Runs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-display font-bold text-sm ${highlightRuns ? "text-primary" : "text-foreground"}`,
                    children: entry.player.totalRuns
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-md p-2 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Wkts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-display font-bold text-sm ${!highlightRuns ? "text-primary" : "text-foreground"}`,
                    children: entry.player.totalWickets
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-md p-2 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Matches" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: entry.player.matchCount })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function HomePage() {
  const navigate = useNavigate();
  const { data: runsLeaderboard, isLoading: runsLoading } = useLeaderboard("runs");
  const { data: wicketsLeaderboard, isLoading: wicketsLoading } = useLeaderboard("wickets");
  const topThreeRuns = (runsLeaderboard ?? []).slice(0, 3);
  const topThreeWickets = (wicketsLeaderboard ?? []).slice(0, 3);
  const top5Runs = (runsLeaderboard ?? []).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative rounded-2xl overflow-hidden mb-10",
        style: { minHeight: 320 },
        "data-ocid": "hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: heroImg,
              alt: "Cricket Analytics Hero",
              className: "absolute inset-0 w-full h-full object-cover object-center brightness-40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col items-start justify-end h-full px-8 py-10 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-body font-semibold uppercase tracking-widest mb-2", children: "Premium Cricket Analytics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-display font-bold text-foreground mb-3 leading-tight", children: [
                  "Where Stats Meet",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Performance" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-6 max-w-lg", children: "Deep statistics, player trends, and leaderboards — all calculated dynamically in real time." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => navigate({ to: "/players" }),
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold",
                      "data-ocid": "hero.explore_players_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
                        "Explore Players"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => navigate({ to: "/leaderboard" }),
                      className: "border-border text-foreground hover:bg-muted",
                      "data-ocid": "hero.view_leaderboard_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 mr-2" }),
                        "Leaderboard"
                      ]
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "top_run_scorers.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Top Run Scorers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Medal rankings based on total runs" }),
      runsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, i)) }) : topThreeRuns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-xl",
          "data-ocid": "top_run_scorers.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-8 h-8 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No players yet — add some via the admin panel" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: topThreeRuns.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TopPerformerCard,
        {
          entry,
          isHero: entry.rank === 1
        },
        entry.rank
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "top_wicket_takers.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Top Wicket Takers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Medal rankings based on total wickets" }),
      wicketsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, i)) }) : topThreeWickets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-xl",
          "data-ocid": "top_wicket_takers.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-8 h-8 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No players yet — add some via the admin panel" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: topThreeWickets.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TopPerformerCard,
        {
          entry,
          statType: "wickets"
        },
        entry.rank
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "leaderboard_preview.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Top 5 Run Scorers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Leaderboard preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => navigate({ to: "/leaderboard" }),
            className: "text-primary border-primary/30 hover:bg-primary/10",
            "data-ocid": "leaderboard_preview.view_full_button",
            children: "View Full Leaderboard →"
          }
        )
      ] }),
      runsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-xl" }, i)) }) : top5Runs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-xl",
          "data-ocid": "leaderboard_preview.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No data yet — add players via the admin panel" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border card-elevated-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-muted-foreground font-body font-medium w-12", children: "Rank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-muted-foreground font-body font-medium", children: "Player" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-muted-foreground font-body font-medium", children: "Country" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-muted-foreground font-body font-medium", children: "Runs" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: top5Runs.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            tabIndex: 0,
            className: "border-b border-border/50 hover:bg-muted/20 transition-smooth cursor-pointer",
            onClick: () => navigate({
              to: "/players/$playerId",
              params: { playerId: entry.player.id }
            }),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                navigate({
                  to: "/players/$playerId",
                  params: { playerId: entry.player.id }
                });
            },
            "data-ocid": `leaderboard_preview.item.${entry.rank}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MedalBadge, { rank: entry.rank, size: "sm" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-display font-semibold text-foreground", children: entry.player.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground", children: entry.player.country }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right font-display font-bold text-primary", children: entry.statValue })
            ]
          },
          entry.rank
        )) })
      ] }) }) })
    ] })
  ] });
}
export {
  HomePage as default
};
