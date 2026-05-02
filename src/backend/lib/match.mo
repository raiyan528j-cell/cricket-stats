import Map "mo:core/Map";
import MatchTypes "../types/match";
import CommonTypes "../types/common";

module {
  /// Create or return existing match.
  public func ensureMatch(
    matches : Map.Map<CommonTypes.MatchId, MatchTypes.Match>,
    matchId : CommonTypes.MatchId,
    date : CommonTypes.Timestamp,
    teamA : Text,
    teamB : Text,
  ) : MatchTypes.Match {
    switch (matches.get(matchId)) {
      case (?existing) existing;
      case null {
        let m : MatchTypes.Match = { id = matchId; date; teamA; teamB };
        matches.add(matchId, m);
        m;
      };
    };
  };

  /// Generate a unique performance id.
  public func newPerfId(counter : Nat) : CommonTypes.PerformanceId {
    "perf-" # counter.toText();
  };
};
