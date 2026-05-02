import CommonTypes "common";

module {
  public type Match = {
    id : CommonTypes.MatchId;
    date : CommonTypes.Timestamp;
    teamA : Text;
    teamB : Text;
  };

  public type Performance = {
    id : CommonTypes.PerformanceId;
    playerId : CommonTypes.PlayerId;
    matchId : CommonTypes.MatchId;
    runs : Nat;
    wickets : Nat;
  };
};
