import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function AdminLoginPage() {
  const { isAuthenticated, login, isLoading, isConnecting, assignAdminRole } =
    useAuth();
  const navigate = useNavigate();
  const [isAssigningRole, setIsAssigningRole] = useState(false);
  const [roleError, setRoleError] = useState<string | null>(null);

  // Stable refs so the effect dep array stays exhaustive without re-triggering.
  const assignAdminRoleRef = useRef(assignAdminRole);
  assignAdminRoleRef.current = assignAdminRole;
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const isAssigningRoleRef = useRef(isAssigningRole);
  isAssigningRoleRef.current = isAssigningRole;

  useEffect(() => {
    if (isAuthenticated && !isAssigningRoleRef.current) {
      setIsAssigningRole(true);
      setRoleError(null);
      assignAdminRoleRef
        .current()
        .then(() => navigateRef.current({ to: "/admin/dashboard" }))
        .catch((err: unknown) => {
          const msg =
            err instanceof Error ? err.message : "Failed to assign admin role";
          setRoleError(msg);
          setIsAssigningRole(false);
        });
    }
  }, [isAuthenticated]);

  const busy = isLoading || isAssigningRole || isConnecting;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <Card
          className="bg-card border-border card-elevated-dark"
          data-ocid="admin_login.dialog"
        >
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Authenticate with Internet Identity to access the admin panel.
            </p>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {roleError && (
              <p
                className="text-sm text-destructive text-center"
                data-ocid="admin_login.error_state"
              >
                {roleError}
              </p>
            )}
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
              onClick={login}
              disabled={busy}
              data-ocid="admin_login.submit_button"
            >
              <Lock className="w-4 h-4 mr-2" />
              {isAssigningRole
                ? "Setting up admin access…"
                : isConnecting
                  ? "Connecting…"
                  : isLoading
                    ? "Authenticating…"
                    : "Sign In with Internet Identity"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
