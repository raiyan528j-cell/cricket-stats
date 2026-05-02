import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PlayerTypes "../types/player";
import MatchTypes "../types/match";
import CommonTypes "../types/common";
import PlayerLib "../lib/player";
import MatchLib "../lib/match";

mixin (
  accessControlState : AccessControl.AccessControlState,
  players : Map.Map<CommonTypes.PlayerId, PlayerTypes.Player>,
  matches : Map.Map<CommonTypes.MatchId, MatchTypes.Match>,
  performances : List.List<MatchTypes.Performance>,
  playerCounter : { var value : Nat },
  perfCounter : { var value : Nat },
) {
  // ── Public Query API ──────────────────────────────────────────────────────

  public query func listPlayers() : async [PlayerTypes.PlayerSummary] {
    players.values().map<PlayerTypes.Player, PlayerTypes.PlayerSummary>(func(p) {
      PlayerLib.toSummary(p, performances);
    }).toArray();
  };

  public query func getPlayer(playerId : CommonTypes.PlayerId) : async ?PlayerTypes.PlayerDetail {
    switch (players.get(playerId)) {
      case (?player) ?PlayerLib.toDetail(player, performances, matches);
      case null null;
    };
  };

  public query func getLeaderboard(leaderboardType : PlayerTypes.LeaderboardType) : async [PlayerTypes.LeaderboardEntry] {
    PlayerLib.leaderboard(players, performances, leaderboardType, 10);
  };

  // ── Admin Update API ──────────────────────────────────────────────────────

  public shared ({ caller }) func createPlayer(input : PlayerTypes.CreatePlayerInput) : async CommonTypes.PlayerId {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    playerCounter.value += 1;
    let id = PlayerLib.newId(playerCounter.value);
    let player : PlayerTypes.Player = {
      id;
      name = input.name;
      country = input.country;
      role = input.role;
    };
    players.add(id, player);
    id;
  };

  public shared ({ caller }) func updatePlayer(playerId : CommonTypes.PlayerId, input : PlayerTypes.UpdatePlayerInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (players.get(playerId)) {
      case (?existing) {
        let updated : PlayerTypes.Player = {
          existing with
          name = switch (input.name) { case (?n) n; case null existing.name };
          country = switch (input.country) { case (?c) c; case null existing.country };
          role = switch (input.role) { case (?r) r; case null existing.role };
        };
        players.add(playerId, updated);
        true;
      };
      case null false;
    };
  };

  public shared ({ caller }) func deletePlayer(playerId : CommonTypes.PlayerId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (players.get(playerId)) {
      case null false;
      case (?_) {
        players.remove(playerId);
        // Remove all performances for this player
        let toKeep = performances.filter(func(p) { p.playerId != playerId });
        performances.clear();
        performances.addAll(toKeep.values());
        true;
      };
    };
  };

  public shared ({ caller }) func addPerformance(input : PlayerTypes.AddPerformanceInput) : async CommonTypes.PerformanceId {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (players.get(input.playerId) == null) {
      Runtime.trap("Player not found");
    };
    ignore MatchLib.ensureMatch(matches, input.matchId, input.date, input.teamA, input.teamB);
    perfCounter.value += 1;
    let perfId = MatchLib.newPerfId(perfCounter.value);
    let perf : MatchTypes.Performance = {
      id = perfId;
      playerId = input.playerId;
      matchId = input.matchId;
      runs = input.runs;
      wickets = input.wickets;
    };
    performances.add(perf);
    perfId;
  };
};
