const REGION = {
    AS: 'as',
    EU: 'eu',
    NA: 'na',
    OC: 'oc',
    SA: 'sa',
    SEA: 'sea',
  };
  
  const SEASON = {
    EA2017pre1: '2017-pre1',
    EA2017pre2: '2017-pre2',
    EA2017pre3: '2017-pre3',
    EA2017pre4: '2017-pre4',
  };
  
  const MATCH = {
    SOLO: 'solo',
    DUO: 'duo',
    SQUAD: 'squad',
    SOLOFPP: 'solo-fpp',
    DUOFPP: 'duo-fpp',
    SQUADFPP: 'squad-fpp',
  };

  
  const FIELDS = [
    { field: 'KillDeathRatio', visible: true },
    { field: 'Wins', visible: true },
    { field: 'WinRatio', visible: true},
    { field: 'Losses', visible: true },
    { field: 'Rating', visible: true },
    { field: 'BestRating', visible: true },
    { field: 'LongestKill', visible: true },
    { field: 'TimeSurvived', visible: false },
    { field: 'RoundsPlayed', visible: false },
    { field: 'WinTop10Ratio', visible: false },
    { field: 'Top10s', visible: false },
    { field: 'Top10Ratio', visible: false },
    { field: 'BestRating', visible: true },
    { field: 'BestRank', visible: false },
    { field: 'DamagePg', visible: false },
    { field: 'HeadshotKillsPg', visible: false },
    { field: 'HealsPg', visible: false },
    { field: 'KillsPg', visible: false },
    { field: 'MoveDistancePg', visible: false },
    { field: 'RevivesPg', visible: false },
    { field: 'RoadKillsPg', visible: false },
    { field: 'TeamKillsPg', visible: false },
    { field: 'TimeSurvivedPg', visible: false },
    { field: 'Top10sPg', visible: false },
    { field: 'Kills', visible: true },
    { field: 'Assists', visible: false },
    { field: 'Suicides', visible: false },
    { field: 'TeamKills', visible: false },
    { field: 'HeadshotKills', visible: false },
    { field: 'HeadshotKillRatio', visible: false },
    { field: 'VehicleDestroys', visible: false },
    { field: 'RoadKills', visible: false },
    { field: 'DailyKills', visible: false },
    { field: 'WeeklyKills', visible: false },
    { field: 'RoundMostKills', visible: false },
    { field: 'MaxKillStreaks', visible: false },
    { field: 'WeaponAcquired', visible: false },
    { field: 'Days', visible: false },
    { field: 'LongestTimeSurvived', visible: false },
    { field: 'MostSurvivalTime', visible: false },
    { field: 'AvgSurvivalTime', visible: false },
    { field: 'WalkDistance', visible: true },
    { field: 'DBNOs', visible: true }
  ];

  exports.REGION = REGION;
  exports.SEASON = SEASON;
  exports.MATCH = MATCH;
  exports.Fields = FIELDS;