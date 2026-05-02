import { u as useNavigate, c as useSearch, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-Ci83zjMo.js";
import { a as usePlayers, e as useUpdatePlayer, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { b as useAuth, B as Button } from "./useAuth-BamQ2yKg.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-F-U7iXuh.js";
import { I as Input } from "./input-CTCZSTrQ.js";
import { A as ArrowLeft, L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7Hz0a3FP.js";
import "./index-BmTYpwrF.js";
function AdminEditPlayerPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/admin/edit-player" });
  const playerId = search.id ?? "";
  const { data: players } = usePlayers();
  const updatePlayer = useUpdatePlayer();
  const [name, setName] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("batter");
  const [touched, setTouched] = reactExports.useState({ name: false, country: false });
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);
  reactExports.useEffect(() => {
    const player = players == null ? void 0 : players.find((p) => p.id === playerId);
    if (player) {
      setName(player.name);
      setCountry(player.country);
      setRole(player.role);
    }
  }, [players, playerId]);
  const errors = {
    name: name.trim().length === 0 ? "Full name is required" : name.trim().length < 2 ? "Name must be at least 2 characters" : "",
    country: country.trim().length === 0 ? "Country is required" : country.trim().length < 2 ? "Country must be at least 2 characters" : ""
  };
  const showError = (field) => (touched[field] || submitted) && !!errors[field];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.name || errors.country) {
      ue.error("Please fix the errors before submitting");
      return;
    }
    try {
      await updatePlayer.mutateAsync({
        id: playerId,
        input: { name: name.trim(), country: country.trim(), role }
      });
      ue.success("Player updated successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update player";
      ue.error(msg);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => navigate({ to: "/admin/dashboard" }),
        className: "mb-5 text-muted-foreground",
        "data-ocid": "edit_player.back_button",
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
        "data-ocid": "edit_player.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Edit Player" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Update the player's details." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-foreground", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  value: name,
                  onChange: (e) => {
                    setName(e.target.value);
                    setTouched((t) => ({ ...t, name: true }));
                  },
                  onBlur: () => setTouched((t) => ({ ...t, name: true })),
                  className: `bg-background border-input ${showError("name") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                  "aria-invalid": showError("name"),
                  "data-ocid": "edit_player.name_input"
                }
              ),
              showError("name") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "edit_player.name_input.field_error",
                  children: errors.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", className: "text-foreground", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "country",
                  value: country,
                  onChange: (e) => {
                    setCountry(e.target.value);
                    setTouched((t) => ({ ...t, country: true }));
                  },
                  onBlur: () => setTouched((t) => ({ ...t, country: true })),
                  className: `bg-background border-input ${showError("country") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                  "aria-invalid": showError("country"),
                  "data-ocid": "edit_player.country_input"
                }
              ),
              showError("country") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "edit_player.country_input.field_error",
                  children: errors.country
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role", className: "text-foreground", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: role,
                  onValueChange: (v) => setRole(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "role",
                        className: "bg-background border-input",
                        "data-ocid": "edit_player.role_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-popover border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "batter", children: "Batter" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bowler", children: "Bowler" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "allRounder", children: "All-Rounder" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold",
                disabled: updatePlayer.isPending,
                "data-ocid": "edit_player.submit_button",
                children: updatePlayer.isPending ? "Updating…" : "Update Player"
              }
            )
          ] }) })
        ]
      }
    )
  ] }) });
}
export {
  AdminEditPlayerPage as default
};
