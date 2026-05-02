import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-Ci83zjMo.js";
import { c as createLucideIcon, b as useAuth, S as Shield, B as Button } from "./useAuth-BamQ2yKg.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-F-U7iXuh.js";
import { m as motion } from "./proxy-uc6v2d6b.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function AdminLoginPage() {
  const { isAuthenticated, login, isLoading, isConnecting, assignAdminRole } = useAuth();
  const navigate = useNavigate();
  const [isAssigningRole, setIsAssigningRole] = reactExports.useState(false);
  const [roleError, setRoleError] = reactExports.useState(null);
  const assignAdminRoleRef = reactExports.useRef(assignAdminRole);
  assignAdminRoleRef.current = assignAdminRole;
  const navigateRef = reactExports.useRef(navigate);
  navigateRef.current = navigate;
  const isAssigningRoleRef = reactExports.useRef(isAssigningRole);
  isAssigningRoleRef.current = isAssigningRole;
  reactExports.useEffect(() => {
    if (isAuthenticated && !isAssigningRoleRef.current) {
      setIsAssigningRole(true);
      setRoleError(null);
      assignAdminRoleRef.current().then(() => navigateRef.current({ to: "/admin/dashboard" })).catch((err) => {
        const msg = err instanceof Error ? err.message : "Failed to assign admin role";
        setRoleError(msg);
        setIsAssigningRole(false);
      });
    }
  }, [isAuthenticated]);
  const busy = isLoading || isAssigningRole || isConnecting;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3 },
      className: "w-full max-w-sm",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card border-border card-elevated-dark",
          "data-ocid": "admin_login.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Admin Access" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Authenticate with Internet Identity to access the admin panel." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
              roleError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive text-center",
                  "data-ocid": "admin_login.error_state",
                  children: roleError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold",
                  onClick: login,
                  disabled: busy,
                  "data-ocid": "admin_login.submit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 mr-2" }),
                    isAssigningRole ? "Setting up admin access…" : isConnecting ? "Connecting…" : isLoading ? "Authenticating…" : "Sign In with Internet Identity"
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
}
export {
  AdminLoginPage as default
};
