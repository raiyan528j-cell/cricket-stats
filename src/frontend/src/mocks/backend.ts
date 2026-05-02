import type { backendInterface } from "../backend.d";
import { LeaderboardType, PlayerRole, UserRole } from "../backend.d";

export const mockBackend: backendInterface = {
  listPlayers: async () => [
    {
      id: "player-1",
      name: "Virat Kohli",
      country: "India",
      role: PlayerRole.batter,
      totalRuns: BigInt(1250),
      totalWickets: BigInt(5),
      matchCount: BigInt(20),
    },
    {
      id: "player-2",
      name: "Jasprit Bumrah",
      country: "India",
      role: PlayerRole.bowler,
      totalRuns: BigInt(120),
      totalWickets: BigInt(48),
      matchCount: BigInt(18),
    },
    {
      id: "player-3",
      name: "Ben Stokes",
      country: "England",
      role: PlayerRole.allRounder,
      totalRuns: BigInt(890),
      totalWickets: BigInt(32),
      matchCount: BigInt(15),
    },
    {
      id: "player-4",
      name: "Steve Smith",
      country: "Australia",
      role: PlayerRole.batter,
      totalRuns: BigInt(1100),
      totalWickets: BigInt(2),
      matchCount: BigInt(17),
    },
    {
      id: "player-5",
      name: "Pat Cummins",
      country: "Australia",
      role: PlayerRole.bowler,
      totalRuns: BigInt(200),
      totalWickets: BigInt(45),
      matchCount: BigInt(16),
    },
  ],

  getPlayer: async (playerId: string) => ({
    id: playerId,
    name: "Virat Kohli",
    country: "India",
    role: PlayerRole.batter,
    totalRuns: BigInt(1250),
    totalWickets: BigInt(5),
    matchCount: BigInt(20),
    average: 62.5,
    strikeRate: 88.4,
    last5Performances: [
      { matchId: "m1", runs: BigInt(120), wickets: BigInt(0), date: BigInt(1700000000000) },
      { matchId: "m2", runs: BigInt(85), wickets: BigInt(1), date: BigInt(1701000000000) },
      { matchId: "m3", runs: BigInt(45), wickets: BigInt(0), date: BigInt(1702000000000) },
      { matchId: "m4", runs: BigInt(200), wickets: BigInt(0), date: BigInt(1703000000000) },
      { matchId: "m5", runs: BigInt(95), wickets: BigInt(0), date: BigInt(1704000000000) },
    ],
  }),

  getLeaderboard: async (leaderboardType: LeaderboardType) => {
    const players = [
      { id: "player-1", name: "Virat Kohli", country: "India", role: PlayerRole.batter, totalRuns: BigInt(1250), totalWickets: BigInt(5), matchCount: BigInt(20) },
      { id: "player-4", name: "Steve Smith", country: "Australia", role: PlayerRole.batter, totalRuns: BigInt(1100), totalWickets: BigInt(2), matchCount: BigInt(17) },
      { id: "player-3", name: "Ben Stokes", country: "England", role: PlayerRole.allRounder, totalRuns: BigInt(890), totalWickets: BigInt(32), matchCount: BigInt(15) },
      { id: "player-6", name: "Joe Root", country: "England", role: PlayerRole.batter, totalRuns: BigInt(780), totalWickets: BigInt(8), matchCount: BigInt(14) },
      { id: "player-7", name: "Rohit Sharma", country: "India", role: PlayerRole.batter, totalRuns: BigInt(720), totalWickets: BigInt(0), matchCount: BigInt(13) },
      { id: "player-8", name: "David Warner", country: "Australia", role: PlayerRole.batter, totalRuns: BigInt(650), totalWickets: BigInt(0), matchCount: BigInt(12) },
      { id: "player-9", name: "Kane Williamson", country: "New Zealand", role: PlayerRole.batter, totalRuns: BigInt(620), totalWickets: BigInt(2), matchCount: BigInt(11) },
      { id: "player-5", name: "Pat Cummins", country: "Australia", role: PlayerRole.bowler, totalRuns: BigInt(200), totalWickets: BigInt(45), matchCount: BigInt(16) },
      { id: "player-2", name: "Jasprit Bumrah", country: "India", role: PlayerRole.bowler, totalRuns: BigInt(120), totalWickets: BigInt(48), matchCount: BigInt(18) },
      { id: "player-10", name: "Kagiso Rabada", country: "South Africa", role: PlayerRole.bowler, totalRuns: BigInt(90), totalWickets: BigInt(40), matchCount: BigInt(14) },
    ];

    if (leaderboardType === LeaderboardType.wickets) {
      const sorted = [...players].sort((a, b) => Number(b.totalWickets) - Number(a.totalWickets));
      return sorted.map((p, i) => ({ player: p, rank: BigInt(i + 1), statValue: Number(p.totalWickets) }));
    }
    if (leaderboardType === LeaderboardType.average) {
      const sorted = [...players].sort((a, b) => (Number(b.totalRuns) / Number(b.matchCount)) - (Number(a.totalRuns) / Number(a.matchCount)));
      return sorted.map((p, i) => ({ player: p, rank: BigInt(i + 1), statValue: Number(p.totalRuns) / Number(p.matchCount) }));
    }
    // default: runs
    return players.map((p, i) => ({ player: p, rank: BigInt(i + 1), statValue: Number(p.totalRuns) }));
  },

  createPlayer: async () => "new-player-id",
  updatePlayer: async () => true,
  deletePlayer: async () => true,
  addPerformance: async () => "new-performance-id",
  getCallerUserRole: async () => UserRole.admin,
  isCallerAdmin: async () => true,
  assignCallerUserRole: async () => undefined,
};
