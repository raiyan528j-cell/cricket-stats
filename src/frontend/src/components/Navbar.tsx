import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Shield, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/players", label: "Players", exact: false },
  { to: "/leaderboard", label: "Leaderboard", exact: false },
  { to: "/compare", label: "Compare", exact: false },
];

export function Navbar() {
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouterState();
  const path = router.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const allLinks = [
    ...navLinks,
    ...(isAuthenticated
      ? [{ to: "/admin/dashboard", label: "Admin", exact: false }]
      : []),
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-sm"
      data-ocid="navbar"
    >
      <div className="container flex items-center h-16 gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-foreground shrink-0"
          data-ocid="navbar.logo_link"
        >
          <TrendingUp className="w-6 h-6 text-primary" />
          <span>
            Cric<span className="text-primary">Analytics</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navLinks.map((link) => {
            const isActive = link.exact
              ? path === link.to
              : path.startsWith(link.to) && !(link.to === "/" && path !== "/");
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-body transition-smooth ${
                  isActive
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid={`navbar.${link.label.toLowerCase()}_link`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAuthenticated && (
            <Link
              to="/admin/dashboard"
              className={`px-3 py-1.5 rounded-md text-sm font-body transition-smooth flex items-center gap-1.5 ${
                path.startsWith("/admin")
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid="navbar.admin_link"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hidden md:inline-flex text-muted-foreground"
              data-ocid="navbar.logout_button"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={login}
              className="hidden md:inline-flex border-primary/30 text-primary hover:bg-primary/10"
              data-ocid="navbar.login_button"
            >
              Admin Login
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="navbar.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1"
          data-ocid="navbar.mobile_menu"
        >
          {allLinks.map((link) => {
            const isActive = link.exact
              ? path === link.to
              : path.startsWith(link.to) && !(link.to === "/" && path !== "/");
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-body transition-smooth ${
                  isActive
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid={`navbar.mobile.${link.label.toLowerCase()}_link`}
              >
                {link.label === "Admin" && <Shield className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-border/50">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                data-ocid="navbar.mobile.logout_button"
              >
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-body text-primary hover:bg-primary/10 transition-smooth"
                data-ocid="navbar.mobile.login_button"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
