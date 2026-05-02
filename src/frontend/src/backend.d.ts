import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaderboardEntry {
    player: PlayerSummary;
    rank: bigint;
    statValue: number;
}
export type Timestamp = bigint;
export type MatchId = string;
export type PerformanceId = string;
export type PlayerId = string;
export interface CreatePlayerInput {
    country: string;
    name: string;
    role: PlayerRole;
}
export interface PerformanceSummary {
    date: Timestamp;
    runs: bigint;
    matchId: MatchId;
    wickets: bigint;
}
export interface UpdatePlayerInput {
    country?: string;
    name?: string;
    role?: PlayerRole;
}
export interface PlayerDetail {
    id: PlayerId;
    country: string;
    matchCount: bigint;
    totalWickets: bigint;
    name: string;
    role: PlayerRole;
    average: number;
    last5Performances: Array<PerformanceSummary>;
    totalRuns: bigint;
    strikeRate: number;
}
export interface PlayerSummary {
    id: PlayerId;
    country: string;
    matchCount: bigint;
    totalWickets: bigint;
    name: string;
    role: PlayerRole;
    totalRuns: bigint;
}
export interface AddPerformanceInput {
    teamA: string;
    teamB: string;
    date: Timestamp;
    playerId: PlayerId;
    runs: bigint;
    matchId: MatchId;
    wickets: bigint;
}
export enum LeaderboardType {
    runs = "runs",
    average = "average",
    wickets = "wickets"
}
export enum PlayerRole {
    allRounder = "allRounder",
    batter = "batter",
    bowler = "bowler"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPerformance(input: AddPerformanceInput): Promise<PerformanceId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPlayer(input: CreatePlayerInput): Promise<PlayerId>;
    deletePlayer(playerId: PlayerId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getLeaderboard(leaderboardType: LeaderboardType): Promise<Array<LeaderboardEntry>>;
    getPlayer(playerId: PlayerId): Promise<PlayerDetail | null>;
    isCallerAdmin(): Promise<boolean>;
    listPlayers(): Promise<Array<PlayerSummary>>;
    updatePlayer(playerId: PlayerId, input: UpdatePlayerInput): Promise<boolean>;
}
