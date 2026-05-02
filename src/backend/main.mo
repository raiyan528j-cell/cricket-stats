import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import PlayerTypes "types/player";
import MatchTypes "types/match";
import CommonTypes "types/common";
import PlayerApi "mixins/player-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let players = Map.empty<CommonTypes.PlayerId, PlayerTypes.Player>();
  let matches = Map.empty<CommonTypes.MatchId, MatchTypes.Match>();
  let performances = List.empty<MatchTypes.Performance>();
  let playerCounterRef = { var value : Nat = 0 };
  let perfCounterRef = { var value : Nat = 0 };

  include PlayerApi(
    accessControlState,
    players,
    matches,
    performances,
    playerCounterRef,
    perfCounterRef,
  );
};

