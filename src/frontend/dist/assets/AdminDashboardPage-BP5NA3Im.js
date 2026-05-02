import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-Ci83zjMo.js";
import { a as usePlayers, c as useDeletePlayer, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { B as Badge } from "./badge-URa73Z5r.js";
import { c as createLucideIcon, b as useAuth, B as Button } from "./useAuth-BamQ2yKg.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-F-U7iXuh.js";
import { S as Skeleton } from "./skeleton-D4kBxZl_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const roleLabels = {
  batter: "Batter",
  bowler: "Bowler",
  allRounder: "All-Rounder"
};
function AdminDashboardPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: players, isLoading } = usePlayers();
  const deletePlayer = useDeletePlayer();
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);
  const handleDelete = async (player) => {
    if (!confirm(`Delete ${player.name}? This action cannot be undone.`))
      return;
    try {
      await deletePlayer.mutateAsync(player.id);
      ue.success(`${player.name} deleted`);
    } catch {
      ue.error("Failed to delete player");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage players and performances" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", "data-ocid": "admin.action_buttons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => navigate({ to: "/admin/add-player" }),
            className: "bg-primary text-primary-foreground hover:bg-primary/90",
            "data-ocid": "admin.add_player_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-2" }),
              "Add Player"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => navigate({ to: "/admin/add-performance" }),
            className: "border-border text-foreground",
            "data-ocid": "admin.add_performance_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 mr-2" }),
              "Add Performance"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "bg-card border-border card-elevated-dark",
        "data-ocid": "admin.players_table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Player Roster" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-muted-foreground font-body font-medium", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-muted-foreground font-body font-medium", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-muted-foreground font-body font-medium", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 text-muted-foreground font-body font-medium", children: "Runs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 text-muted-foreground font-body font-medium", children: "Wkts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-muted-foreground font-body font-medium", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              (players ?? []).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
                  "data-ocid": `admin.player.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-display font-semibold text-foreground", children: p.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground", children: p.country }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: roleLabels[p.role] ?? p.role }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-display font-bold text-primary", children: p.totalRuns }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-display font-semibold text-foreground", children: p.totalWickets }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          onClick: () => navigate({
                            to: "/admin/edit-player",
                            search: { id: p.id }
                          }),
                          className: "w-8 h-8 hover:bg-muted",
                          "aria-label": "Edit player",
                          "data-ocid": `admin.edit_button.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          onClick: () => handleDelete(p),
                          className: "w-8 h-8 hover:bg-destructive/10 hover:text-destructive",
                          "aria-label": "Delete player",
                          "data-ocid": `admin.delete_button.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }) })
                  ]
                },
                p.id
              )),
              (players ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 6,
                  className: "px-5 py-10 text-center text-muted-foreground",
                  "data-ocid": "admin.players_table.empty_state",
                  children: "No players yet. Add your first player."
                }
              ) })
            ] })
          ] }) }) })
        ]
      }
    )
  ] });
}
export {
  AdminDashboardPage as default
};
