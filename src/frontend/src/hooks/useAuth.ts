import { UserRole, createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useRef } from "react";

export function useAuth() {
  const {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    clear,
  } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);

  // Keep a live ref to actor so the polling loop inside assignAdminRole
  // always reads the latest value even across React re-renders.
  const actorRef = useRef(actor);
  actorRef.current = actor;

  const isLoading = isInitializing || isLoggingIn;
  const isConnecting = isFetching && !actor;

  /**
   * Assigns the admin role. Retries every 300 ms for up to 8 s if the actor
   * is not yet initialized (race condition on first load after login).
   * Uses actorRef.current so polling always reads the latest actor value.
   */
  async function assignAdminRole() {
    if (!identity) throw new Error("Not authenticated");
    // Try the current value first
    let resolved = actorRef.current;
    if (!resolved) {
      const maxMs = 8000;
      const interval = 300;
      let elapsed = 0;
      while (!resolved && elapsed < maxMs) {
        await new Promise((r) => setTimeout(r, interval));
        elapsed += interval;
        // Read from ref — always up-to-date with the latest render
        resolved = actorRef.current;
      }
    }
    if (!resolved)
      throw new Error(
        "Backend not reachable — canister ID may not be configured or the network is unavailable. Please refresh and try again.",
      );
    const principal = identity.getPrincipal();
    await (
      resolved as unknown as {
        assignCallerUserRole: (p: unknown, r: unknown) => Promise<void>;
      }
    ).assignCallerUserRole(principal, UserRole.admin);
  }

  return {
    identity,
    isAuthenticated,
    isLoading,
    isConnecting,
    login,
    logout: clear,
    assignAdminRole,
    actor,
  };
}
