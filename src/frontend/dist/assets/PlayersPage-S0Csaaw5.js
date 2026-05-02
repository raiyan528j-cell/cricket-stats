import { u as useNavigate, j as jsxRuntimeExports, r as reactExports } from "./index-Ci83zjMo.js";
import { a as usePlayers, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { B as Badge } from "./badge-URa73Z5r.js";
import { C as Card, a as CardContent } from "./card-F-U7iXuh.js";
import { m as motion } from "./proxy-uc6v2d6b.js";
import { I as Input } from "./input-CTCZSTrQ.js";
import { S as Skeleton } from "./skeleton-D4kBxZl_.js";
import { c as createLucideIcon } from "./useAuth-BamQ2yKg.js";
import { U as Users } from "./users-ChtF8Bei.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const roleLabels = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder"
};
const roleColors = {
  batter: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  bowler: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  allRounder: "bg-chart-3/20 text-chart-3 border-chart-3/30"
};
function PlayerCard({ player, index = 0 }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.05 },
      viewport: { once: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "card-elevated-dark bg-card border-border transition-elevation hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
          onClick: () => navigate({
            to: "/players/$playerId",
            params: { playerId: player.id }
          }),
          "data-ocid": `player_card.item.${index + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate text-base", children: player.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: player.country })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `ml-2 shrink-0 text-xs border ${roleColors[player.role] ?? ""}`,
                  children: roleLabels[player.role] ?? player.role
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 pt-3 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Runs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-primary", children: player.totalRuns })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Wkts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: player.totalWickets })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "M" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: player.matchCount })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function PlayersPage() {
  const [search, setSearch] = reactExports.useState("");
  const { data: players, isLoading } = usePlayers();
  const source = players ?? [];
  const filtered = reactExports.useMemo(
    () => search.trim() ? source.filter(
      (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.country.toLowerCase().includes(search.toLowerCase())
    ) : source,
    [source, search]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "players.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-1", children: "Players" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Browse the complete player roster" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or country…",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9 bg-card border-border",
          "data-ocid": "players.search_input"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }, i)) }) : source.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "players.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-1", children: "No players yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add players via the admin panel to see them here" })
        ]
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "players.search_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-12 h-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-1", children: "No players found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Try a different search term" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((player, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerCard, { player, index: i }, player.id)) })
  ] });
}
export {
  PlayersPage as default
};
