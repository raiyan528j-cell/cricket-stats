import {
  LeaderboardType as BackendLeaderboardType,
  createActor,
} from "@/backend";
import type {
  AddPerformanceInput,
  CreatePlayerInput,
  LeaderboardType,
  UpdatePlayerInput,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

/** Wait up to ~5 s for the actor to become available, polling every 200 ms. */
async function waitForActor(
  getActor: () => ReturnType<typeof useActor>["actor"] | undefined,
  maxMs = 5000,
): Promise<NonNullable<ReturnType<typeof useActor>["actor"]>> {
  const interval = 200;
  let elapsed = 0;
  // Check immediately before the first sleep
  const immediate = getActor();
  if (immediate) return immediate as NonNullable<typeof immediate>;
  while (elapsed < maxMs) {
    await new Promise((r) => setTimeout(r, interval));
    elapsed += interval;
    const a = getActor();
    if (a) return a as NonNullable<typeof a>;
  }
  throw new Error(
    "Backend not reachable — canister ID may not be configured or the network is unavailable. Please refresh and try again.",
  );
}

function toPlayerRole(
  role: { "#batter"?: null; "#bowler"?: null; "#allRounder"?: null } | string,
) {
  if (typeof role === "string")
    return role as "batter" | "bowler" | "allRounder";
  if ("#batter" in role) return "batter" as const;
  if ("#bowler" in role) return "bowler" as const;
  return "allRounder" as const;
}

function fromLeaderboardType(type: LeaderboardType): BackendLeaderboardType {
  if (type === "runs") return BackendLeaderboardType.runs;
  if (type === "wickets") return BackendLeaderboardType.wickets;
  return BackendLeaderboardType.average;
}

export function usePlayers() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).listPlayers();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.map((p: any) => ({
        ...p,
        id: String(p.id),
        totalRuns: Number(p.totalRuns),
        totalWickets: Number(p.totalWickets),
        matchCount: Number(p.matchCount),
        role: toPlayerRole(p.role),
      }));
    },
    enabled: !!actor,
  });
}

export function usePlayer(playerId: string | undefined) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["player", playerId],
    queryFn: async () => {
      if (!actor || !playerId) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getPlayer(playerId);
      // Backend.getPlayer returns PlayerDetail | null (already converted by bindgen)
      if (result === null || result === undefined) return null;
      // Handle legacy candid optional format just in case
      const p =
        result && typeof result === "object" && "__kind__" in result
          ? result.__kind__ === "Some"
            ? result.value
            : null
          : Array.isArray(result)
            ? result.length === 0
              ? null
              : result[0]
            : result;
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
        last5Performances: (p.last5Performances || []).map((perf: any) => ({
          ...perf,
          matchId: String(perf.matchId),
          date: Number(BigInt(perf.date) / 1_000_000n),
          runs: Number(perf.runs),
          wickets: Number(perf.wickets),
        })),
      };
    },
    enabled: !!actor && !!playerId,
  });
}

export function useLeaderboard(type: LeaderboardType) {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["leaderboard", type],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getLeaderboard(
        fromLeaderboardType(type),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.map((entry: any) => ({
        rank: Number(entry.rank),
        statValue: Number(entry.statValue),
        player: {
          ...entry.player,
          id: String(entry.player.id),
          totalRuns: Number(entry.player.totalRuns),
          totalWickets: Number(entry.player.totalWickets),
          matchCount: Number(entry.player.matchCount),
          role: toPlayerRole(entry.player.role),
        },
      }));
    },
    enabled: !!actor,
  });
}

export function useCreatePlayer() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (input: CreatePlayerInput) => {
      const a =
        actorRef.current ?? (await waitForActor(() => actorRef.current));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a as any).createPlayer(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}

export function useUpdatePlayer() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: string; input: UpdatePlayerInput }) => {
      const a =
        actorRef.current ?? (await waitForActor(() => actorRef.current));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a as any).updatePlayer(id, input);
    },
    onSuccess: (
      _data: unknown,
      vars: { id: string; input: UpdatePlayerInput },
    ) => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["player", vars.id] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}

export function useDeletePlayer() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const a =
        actorRef.current ?? (await waitForActor(() => actorRef.current));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a as any).deletePlayer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}

export function useAddPerformance() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = useRef(actor);
  actorRef.current = actor;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (input: AddPerformanceInput) => {
      const a =
        actorRef.current ?? (await waitForActor(() => actorRef.current));
      // Convert runs/wickets to bigint as required by the backend interface
      const backendInput = {
        ...input,
        runs: BigInt(input.runs),
        wickets: BigInt(input.wickets),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a as any).addPerformance(backendInput);
    },
    onSuccess: (_data: unknown, vars: AddPerformanceInput) => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["player", vars.playerId] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
  return { ...mutation, isConnecting: isFetching && !actor };
}
