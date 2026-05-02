import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const PlayersPage = lazy(() => import("@/pages/PlayersPage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));
const PlayerProfilePage = lazy(() => import("@/pages/PlayerProfilePage"));
const AdminLoginPage = lazy(() => import("@/pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboardPage"),
);
const AdminAddPlayerPage = lazy(
  () => import("@/pages/admin/AdminAddPlayerPage"),
);
const AdminEditPlayerPage = lazy(
  () => import("@/pages/admin/AdminEditPlayerPage"),
);
const AdminAddPerformancePage = lazy(
  () => import("@/pages/admin/AdminAddPerformancePage"),
);
const ComparePage = lazy(() => import("@/pages/ComparePage"));

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense>
      <HomePage />
    </Suspense>
  ),
});
const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/players",
  component: () => (
    <Suspense>
      <PlayersPage />
    </Suspense>
  ),
});
const playerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/players/$playerId",
  component: () => (
    <Suspense>
      <PlayerProfilePage />
    </Suspense>
  ),
});
const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: () => (
    <Suspense>
      <LeaderboardPage />
    </Suspense>
  ),
});
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense>
      <AdminLoginPage />
    </Suspense>
  ),
});
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <Suspense>
      <AdminDashboardPage />
    </Suspense>
  ),
});
const adminAddPlayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/add-player",
  component: () => (
    <Suspense>
      <AdminAddPlayerPage />
    </Suspense>
  ),
});
const adminEditPlayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/edit-player",
  component: () => (
    <Suspense>
      <AdminEditPlayerPage />
    </Suspense>
  ),
  validateSearch: (s: Record<string, unknown>) => ({ id: String(s.id ?? "") }),
});
const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => (
    <Suspense>
      <ComparePage />
    </Suspense>
  ),
});
const adminAddPerformanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/add-performance",
  component: () => (
    <Suspense>
      <AdminAddPerformancePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  playersRoute,
  playerProfileRoute,
  leaderboardRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminAddPlayerRoute,
  adminEditPlayerRoute,
  compareRoute,
  adminAddPerformanceRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <div className="dark">
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
