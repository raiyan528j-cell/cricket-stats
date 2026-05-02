var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, k as hashKey, l as getDefaultState, n as notifyManager, m as useQueryClient, r as reactExports, o as noop, p as shouldThrowError, j as jsxRuntimeExports, q as useRouterState, L as Link } from "./index-Ci83zjMo.js";
import { c as createLucideIcon, b as useAuth, S as Shield, B as Button, i as useActor, j as useQuery, k as createActor, L as LeaderboardType } from "./useAuth-BamQ2yKg.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-card/60 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container flex flex-col sm:flex-row items-center justify-between py-6 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "CricAnalytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "— Premium Cricket Statistics" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      year,
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: utmUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) });
}
const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/players", label: "Players", exact: false },
  { to: "/leaderboard", label: "Leaderboard", exact: false },
  { to: "/compare", label: "Compare", exact: false }
];
function Navbar() {
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouterState();
  const path = router.location.pathname;
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const allLinks = [
    ...navLinks,
    ...isAuthenticated ? [{ to: "/admin/dashboard", label: "Admin", exact: false }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-sm",
      "data-ocid": "navbar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container flex items-center h-16 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-2 font-display font-bold text-xl text-foreground shrink-0",
              "data-ocid": "navbar.logo_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Cric",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Analytics" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-1 ml-2", children: [
            navLinks.map((link) => {
              const isActive = link.exact ? path === link.to : path.startsWith(link.to) && !(link.to === "/" && path !== "/");
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: link.to,
                  className: `px-3 py-1.5 rounded-md text-sm font-body transition-smooth ${isActive ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                  "data-ocid": `navbar.${link.label.toLowerCase()}_link`,
                  children: link.label
                },
                link.to
              );
            }),
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin/dashboard",
                className: `px-3 py-1.5 rounded-md text-sm font-body transition-smooth flex items-center gap-1.5 ${path.startsWith("/admin") ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                "data-ocid": "navbar.admin_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
                  "Admin"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
            isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: logout,
                className: "hidden md:inline-flex text-muted-foreground",
                "data-ocid": "navbar.logout_button",
                children: "Sign Out"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: login,
                className: "hidden md:inline-flex border-primary/30 text-primary hover:bg-primary/10",
                "data-ocid": "navbar.login_button",
                children: "Admin Login"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Toggle navigation menu",
                className: "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                onClick: () => setMobileOpen((v) => !v),
                "data-ocid": "navbar.mobile_menu_toggle",
                children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "md:hidden border-t border-border bg-card px-4 py-3 space-y-1",
            "data-ocid": "navbar.mobile_menu",
            children: [
              allLinks.map((link) => {
                const isActive = link.exact ? path === link.to : path.startsWith(link.to) && !(link.to === "/" && path !== "/");
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: link.to,
                    onClick: () => setMobileOpen(false),
                    className: `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-body transition-smooth ${isActive ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                    "data-ocid": `navbar.mobile.${link.label.toLowerCase()}_link`,
                    children: [
                      link.label === "Admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
                      link.label
                    ]
                  },
                  link.to
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border/50", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    logout();
                    setMobileOpen(false);
                  },
                  className: "w-full text-left px-3 py-2 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                  "data-ocid": "navbar.mobile.logout_button",
                  children: "Sign Out"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    login();
                    setMobileOpen(false);
                  },
                  className: "w-full text-left px-3 py-2 rounded-md text-sm font-body text-primary hover:bg-primary/10 transition-smooth",
                  "data-ocid": "navbar.mobile.login_button",
                  children: "Admin Login"
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8", children }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
async function waitForActor(getActor, maxMs = 5e3) {
  const interval = 200;
  let elapsed = 0;
  const immediate = getActor();
  if (immediate) return immediate;
  while (elapsed < maxMs) {
    await new Promise((r) => setTimeout(r, interval));
    elapsed += interval;
    const a = getActor();
    if (a) return a;
  }
  throw new Error(
    "Backend not reachable — canister ID may not be configured or the network is unavailable. Please refresh and try again."
  );
}
function toPlayerRole(role) {
  if (typeof role === "string")
    return role;
  if ("#batter" in role) return "batter";
  if ("#bowler" in role) return "bowler";
  return "allRounder";
}
function fromLeaderboardType(type) {
  if (type === "runs") return LeaderboardType.runs;
  if (type === "wickets") return LeaderboardType.wickets;
  return LeaderboardType.average;
}
function usePlayers() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listPlayers();
      return result.map((p) => ({
        ...p,
        id: String(p.id),
        totalRuns: Number(p.totalRuns),
        totalWickets: Number(p.totalWickets),
        matchCount: Number(p.matchCount),
        role: toPlayerRole(p.role)
      }));
    },
    enabled: !!actor
  });
}
function usePlayer(playerId) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["player", playerId],
    queryFn: async () => {
      if (!actor || !playerId) return null;
      const result = await actor.getPlayer(playerId);
      if (result === null || result === void 0) return null;
      const p = result && typeof result === "object" && "__kind__" in result ? result.__kind__ === "Some" ? result.value : null : Array.isArray(result) ? result.length === 0 ? null : result[0] : result;
      if (!p) return null;
      return {
        ...p,
        id: String(p.id),
        totalRuns: Number(p.totalRuns),
        totalWickets: Number(p.totalWickets),
        matchCount: Number(p.matchCount),
        average: Number(p.average),
        strikeRate: Number(p.strikeRate),
        role: toPlayerRole(p.role),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        last5Performances: (p.last5Performances || []).map((perf) => ({
          ...perf,
          matchId: String(perf.matchId),
          date: Number(BigInt(perf.date) / 1000000n),
          runs: Number(perf.runs),
          wickets: Number(perf.wickets)
        }))
      };
    },
    enabled: !!actor && !!playerId
  });
}
function useLeaderboard(type) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["leaderboard", type],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getLeaderboard(
        fromLeaderboardType(type)
      );
      return result.map((entry) => ({
        rank: Number(entry.rank),
        statValue: Number(entry.statValue),
        player: {
          ...entry.player,
          id: String(entry.player.id),
          totalRuns: Number(entry.player.totalRuns),
          totalWickets: Number(entry.player.totalWickets),
          matchCount: Number(entry.player.matchCount),
          role: toPlayerRole(entry.player.role)
        }
      }));
    },
    enabled: !!actor
  });
}
function useCreatePlayer() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = reactExports.useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (input) => {
      const a = actorRef.current ?? await waitForActor(() => actorRef.current);
      return a.createPlayer(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    }
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}
function useUpdatePlayer() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = reactExports.useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      const a = actorRef.current ?? await waitForActor(() => actorRef.current);
      return a.updatePlayer(id, input);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["player", vars.id] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    }
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}
function useDeletePlayer() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = reactExports.useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => {
      const a = actorRef.current ?? await waitForActor(() => actorRef.current);
      return a.deletePlayer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    }
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}
function useAddPerformance() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = reactExports.useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (input) => {
      const a = actorRef.current ?? await waitForActor(() => actorRef.current);
      const backendInput = {
        ...input,
        runs: BigInt(input.runs),
        wickets: BigInt(input.wickets)
      };
      return a.addPerformance(backendInput);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["player", vars.playerId] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    }
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}
export {
  Layout as L,
  usePlayers as a,
  usePlayer as b,
  useDeletePlayer as c,
  useCreatePlayer as d,
  useUpdatePlayer as e,
  useAddPerformance as f,
  useLeaderboard as u
};
