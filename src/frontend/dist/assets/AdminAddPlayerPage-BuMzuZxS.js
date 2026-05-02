import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-Ci83zjMo.js";
import { d as useCreatePlayer, L as Layout } from "./usePlayers-B_9-NLV1.js";
import { b as useAuth, B as Button } from "./useAuth-BamQ2yKg.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-F-U7iXuh.js";
import { I as Input } from "./input-CTCZSTrQ.js";
import { A as ArrowLeft, L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7Hz0a3FP.js";
import "./index-BmTYpwrF.js";
function AdminAddPlayerPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const createPlayer = useCreatePlayer();
  const [name, setName] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("batter");
  const [touched, setTouched] = reactExports.useState({ name: false, country: false });
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);
  const errors = {
    name: name.trim().length === 0 ? "Full name is required" : name.trim().length < 2 ? "Name must be at least 2 characters" : "",
    country: country.trim().length === 0 ? "Country is required" : country.trim().length < 2 ? "Country must be at least 2 characters" : ""
  };
  const showError = (field) => (touched[field] || submitted) && !!errors[field];
  const isSubmitDisabled = createPlayer.isPending || createPlayer.isConnecting;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.name || errors.country) {
      ue.error("Please fix the errors before submitting");
      return;
    }
    try {
      await createPlayer.mutateAsync({
        name: name.trim(),
        country: country.trim(),
        role
      });
      ue.success("Player created successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create player";
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
        "data-ocid": "add_player.back_button",
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
        "data-ocid": "add_player.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Add New Player" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Fill in the player's details below." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            createPlayer.isConnecting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 rounded-md bg-muted/40 border border-border",
                "data-ocid": "add_player.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-3 rounded-full bg-primary/60 animate-pulse" }),
                  "Connecting to backend…"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
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
                    placeholder: "e.g. Virat Singh",
                    className: `bg-background border-input ${showError("name") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "aria-invalid": showError("name"),
                    "data-ocid": "add_player.name_input"
                  }
                ),
                showError("name") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "add_player.name_input.field_error",
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
                    placeholder: "e.g. India",
                    className: `bg-background border-input ${showError("country") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "aria-invalid": showError("country"),
                    "data-ocid": "add_player.country_input"
                  }
                ),
                showError("country") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "add_player.country_input.field_error",
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
                          "data-ocid": "add_player.role_select",
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
                  disabled: isSubmitDisabled,
                  "data-ocid": "add_player.submit_button",
                  children: createPlayer.isConnecting ? "Connecting…" : createPlayer.isPending ? "Creating…" : "Create Player"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  AdminAddPlayerPage as default
};
