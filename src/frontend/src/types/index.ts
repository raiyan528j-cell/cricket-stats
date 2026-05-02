export type PlayerRole = "batter" | "bowler" | "allRounder";

export interface Player {
  id: string;
  name: string;
  country: string;
  role: PlayerRole;
}

export interface PerformanceSummary {
  matchId: string;
  date: number;
  runs: number;
  wickets: number;
}

export interface PlayerSummary {
  id: string;
  name: string;
  country: string;
  role: PlayerRole;
  totalRuns: number;
  totalWickets: number;
  matchCount: number;
}

export interface PlayerDetail {
  id: string;
  name: string;
  country: string;
  role: PlayerRole;
  matchCount: number;
  totalRuns: number;
  totalWickets: number;
  average: number;
  strikeRate: number;
  last5Performances: PerformanceSummary[];
}

export interface LeaderboardEntry {
  rank: number;
  player: PlayerSummary;
  statValue: number;
}

export type LeaderboardType = "runs" | "wickets" | "average";

export interface CreatePlayerInput {
  name: string;
  country: string;
  role: PlayerRole;
}

export interface UpdatePlayerInput {
  name?: string;
  country?: string;
  role?: PlayerRole;
}

export interface AddPerformanceInput {
  playerId: string;
  matchId: string;
  date: bigint;
  runs: number;
  wickets: number;
  teamA: string;
  teamB: string;
}
