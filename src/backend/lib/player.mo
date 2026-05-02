import List "mo:core/List";
import Map "mo:core/Map";
import PlayerTypes "../types/player";
import MatchTypes "../types/match";
import CommonTypes "../types/common";
import Int "mo:core/Int";
import Float "mo:core/Float";

module {
  /// Compute aggregated stats for a single player from all performances.
  public func computeStats(
    playerId : CommonTypes.PlayerId,
    performances : List.List<MatchTypes.Performance>,
  ) : { totalRuns : Nat; totalWickets : Nat; matchCount : Nat; average : Float; strikeRate : Float } {
    var totalRuns : Nat = 0;
    var totalWickets : Nat = 0;
    var matchCount : Nat = 0;
    performances.forEach(func(p) {
      if (p.playerId == playerId) {
        totalRuns += p.runs;
        totalWickets += p.wickets;
        matchCount += 1;
      };
    });
    let average : Float = if (matchCount == 0) 0.0 else totalRuns.toFloat() / matchCount.toFloat();
    let strikeRate : Float = if (matchCount == 0) 0.0 else (totalRuns.toFloat() / (matchCount.toFloat() * 6.0)) * 100.0;
    { totalRuns; totalWickets; matchCount; average; strikeRate };
  };

  /// Build PlayerSummary from a Player + performances.
  public func toSummary(
    player : PlayerTypes.Player,
    performances : List.List<MatchTypes.Performance>,
  ) : PlayerTypes.PlayerSummary {
    let stats = computeStats(player.id, performances);
    {
      id = player.id;
      name = player.name;
      country = player.country;
      role = player.role;
      totalRuns = stats.totalRuns;
      totalWickets = stats.totalWickets;
      matchCount = stats.matchCount;
    };
  };

  /// Build PlayerDetail including last 5 match performances.
  public func toDetail(
    player : PlayerTypes.Player,
    performances : List.List<MatchTypes.Performance>,
    matches : Map.Map<CommonTypes.MatchId, MatchTypes.Match>,
  ) : PlayerTypes.PlayerDetail {
    let stats = computeStats(player.id, performances);
    // Collect all performances for this player, sorted by date desc (last5)
    let playerPerfs = forPlayer(player.id, performances);
    let sorted = playerPerfs.sort(func(a, b) {
      let matchA = matches.get(a.matchId);
      let matchB = matches.get(b.matchId);
      let dateA : Int = switch (matchA) { case (?m) m.date; case null 0 };
      let dateB : Int = switch (matchB) { case (?m) m.date; case null 0 };
      // Descending: newer first
      Int.compare(dateB, dateA);
    });
    let last5 = sorted.values().take(5);
    let last5Perfs = last5.map(func(p) {
      let date : Int = switch (matches.get(p.matchId)) { case (?m) m.date; case null 0 };
      { matchId = p.matchId; date; runs = p.runs; wickets = p.wickets };
    }).toArray();
    {
      id = player.id;
      name = player.name;
      country = player.country;
      role = player.role;
      matchCount = stats.matchCount;
      totalRuns = stats.totalRuns;
      totalWickets = stats.totalWickets;
      average = stats.average;
      strikeRate = stats.strikeRate;
      last5Performances = last5Perfs;
    };
  };

  /// Get performances for a specific player.
  public func forPlayer(
    playerId : CommonTypes.PlayerId,
    performances : List.List<MatchTypes.Performance>,
  ) : List.List<MatchTypes.Performance> {
    performances.filter(func(p) { p.playerId == playerId });
  };

  /// Sort players for leaderboard by the given stat type, return top N.
  public func leaderboard(
    players : Map.Map<CommonTypes.PlayerId, PlayerTypes.Player>,
    performances : List.List<MatchTypes.Performance>,
    leaderboardType : PlayerTypes.LeaderboardType,
    topN : Nat,
  ) : [PlayerTypes.LeaderboardEntry] {
    // Build summaries for all players
    let summaries = players.values().map(func(p) {
      toSummary(p, performances);
    }).toArray();
    // Sort descending by selected stat
    let sorted = summaries.sort(func(a, b) {
      let valA : Float = switch (leaderboardType) {
        case (#runs) a.totalRuns.toFloat();
        case (#wickets) a.totalWickets.toFloat();
        case (#average) {
          if (a.matchCount == 0) 0.0 else a.totalRuns.toFloat() / a.matchCount.toFloat();
        };
      };
      let valB : Float = switch (leaderboardType) {
        case (#runs) b.totalRuns.toFloat();
        case (#wickets) b.totalWickets.toFloat();
        case (#average) {
          if (b.matchCount == 0) 0.0 else b.totalRuns.toFloat() / b.matchCount.toFloat();
        };
      };
      Float.compare(valB, valA);
    });
    // Take top N and assign ranks
    sorted.values().take(topN).enumerate().map<(Nat, PlayerTypes.PlayerSummary), PlayerTypes.LeaderboardEntry>(func((i, summary)) {
      let statValue : Float = switch (leaderboardType) {
        case (#runs) summary.totalRuns.toFloat();
        case (#wickets) summary.totalWickets.toFloat();
        case (#average) {
          if (summary.matchCount == 0) 0.0 else summary.totalRuns.toFloat() / summary.matchCount.toFloat();
        };
      };
      { rank = i + 1; player = summary; statValue };
    }).toArray();
  };

  /// Generate a unique player id.
  public func newId(counter : Nat) : CommonTypes.PlayerId {
    "player-" # counter.toText();
  };
};
