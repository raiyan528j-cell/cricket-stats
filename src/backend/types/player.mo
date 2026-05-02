import CommonTypes "common";

module {
  public type PlayerRole = { #batter; #bowler; #allRounder };

  public type Player = {
    id : CommonTypes.PlayerId;
    name : Text;
    country : Text;
    role : PlayerRole;
  };

  /// Shared (API boundary) type — stats dynamically computed.
  public type PlayerSummary = {
    id : CommonTypes.PlayerId;
    name : Text;
    country : Text;
    role : PlayerRole;
    totalRuns : Nat;
    totalWickets : Nat;
    matchCount : Nat;
  };

  public type PlayerDetail = {
    id : CommonTypes.PlayerId;
    name : Text;
    country : Text;
    role : PlayerRole;
    matchCount : Nat;
    totalRuns : Nat;
    totalWickets : Nat;
    average : Float;
    strikeRate : Float;
    last5Performances : [PerformanceSummary];
  };

  public type PerformanceSummary = {
    matchId : CommonTypes.MatchId;
    date : CommonTypes.Timestamp;
    runs : Nat;
    wickets : Nat;
  };

  public type LeaderboardEntry = {
    rank : Nat;
    player : PlayerSummary;
    statValue : Float;
  };

  public type LeaderboardType = { #runs; #wickets; #average };

  /// Input types for admin operations
  public type CreatePlayerInput = {
    name : Text;
    country : Text;
    role : PlayerRole;
  };

  public type UpdatePlayerInput = {
    name : ?Text;
    country : ?Text;
    role : ?PlayerRole;
  };

  public type AddPerformanceInput = {
    playerId : CommonTypes.PlayerId;
    matchId : CommonTypes.MatchId;
    date : CommonTypes.Timestamp;
    runs : Nat;
    wickets : Nat;
    teamA : Text;
    teamB : Text;
  };
};
