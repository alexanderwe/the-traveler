import {
  DestinyActivityModeType,
  DestinyStatsGroupType,
  PeriodType,
  DestinyComponentType
} from '../type-definitions/destiny2';

/**
 * Enum for the global alert level
 * @enum
 */
export enum GlobalAlertLevel {
  Unkown = 0,
  Blue = 1,
  Yellow = 2,
  Red = 3
}

/**
 * Enum for the global alert type
 * @enum
 */
export enum GlobalAlertType {
  GlobalAlert = 0,
  StreamingAlert = 1
}

/**
 * Enum for different stat IDs
 * @enum
 */
export enum StatId {
  ActivitiesClearedabilityKills = 'DestinyInventoryItemDefinition',
  ActivitiesEntered = 'ActivitiesEntered',
  ActivitiesWon = 'ActivitiesWon',
  Assists = 'Assists',
  AverageDeathDistance = 'AverageDeathDistance',
  AverageKillDistance = 'AverageKillDistance',
  AverageLifespan = 'AverageLifespan',
  AverageScorePerKill = 'AverageScorePerKill',
  AverageScorePerLife = 'AverageScorePerLife',
  BestSingleGameKills = 'BestSingleGameKills',
  BestSingleGameScore = 'BestSingleGameScore',
  Completed = 'Completed',
  FastestCompletionMsForActivity = 'FastestCompletionMsForActivity',
  ActivityCompletions = 'ActivityCompletions',
  ActivityDeaths = 'ActivityDeaths',
  ActivityKills = 'ActivityKills',
  ActivitySecondsPlayed = 'ActivitySecondsPlayed',
  ActivityWins = 'ActivityWins',
  ActivityGoalsMissed = 'ActivityGoalsMissed',
  ActivityCompletedFailures = 'ActivityCompletedFailures',
  ActivitySpecialActions = 'ActivitySpecialActions',
  ActivityBestGoalsHit = 'ActivityBestGoalsHit',
  ActivitySpecialScore = 'ActivitySpecialScore',
  ActivityFastestObjectiveCompletionMs = 'ActivityFastestObjectiveCompletionMs',
  ActivityBestSingleGameScore = 'ActivityBestSingleGameScore',
  ActivityKillsDeathsRatio = 'ActivityKillsDeathsRatio',
  ActivityKillsDeathsAssists = 'ActivityKillsDeathsAssists',
  Deaths = 'Deaths',
  Kills = 'Kills',
  KillsDeathsRatio = 'KillsDeathsRatio',
  KillsDeathsAssists = 'KillsDeathsAssists',
  LbSingleGameKills = 'LbSingleGameKills',
  LbPrecisionKills = 'LbPrecisionKills',
  LbAssists = 'LbAssists',
  LbDeaths = 'LbDeaths',
  LbKills = 'LbKills',
  LbObjectivesCompleted = 'LbObjectivesCompleted',
  LbSingleGameScore = 'LbSingleGameScore',
  MaximumPowerLevel = 'MaximumPowerLevel',
  MedalAbilityDawnbladeAerial = 'MedalAbilityDawnbladeAerial',
  MedalAbilityDawnbladeSlam = 'MedalAbilityDawnbladeSlam',
  MedalAbilityFlowwalkerMulti = 'MedalAbilityFlowwalkerMulti',
  MedalAbilityFlowwalkerQuick = 'MedalAbilityFlowwalkerQuick',
  MedalAbilityGunslingerMulti = 'MedalAbilityGunslingerMulti',
  MedalAbilityGunslingerQuick = 'MedalAbilityGunslingerQuick',
  MedalAbilityJuggernautCombo = 'MedalAbilityJuggernautCombo',
  MedalAbilityJuggernautSlam = 'MedalAbilityJuggernautSlam',
  MedalAbilityNightstalkerLongRange = 'MedalAbilityNightstalkerLongRange',
  MedalAbilityNightstalkerTetherQuick = 'MedalAbilityNightstalkerTetherQuick',
  MedalAbilitySentinelCombo = 'MedalAbilitySentinelCombo',
  MedalAbilitySentinelWard = 'MedalAbilitySentinelWard',
  MedalAbilityStormcallerLandfall = 'MedalAbilityStormcallerLandfall',
  MedalAbilityStormcallerMulti = 'MedalAbilityStormcallerMulti',
  MedalAbilitySunbreakerLongRange = 'MedalAbilitySunbreakerLongRange',
  MedalAbilitySunbreakerMulti = 'MedalAbilitySunbreakerMulti',
  MedalAbilityVoidwalkerDistance = 'MedalAbilityVoidwalkerDistance',
  MedalAbilityVoidwalkerVortex = 'MedalAbilityVoidwalkerVortex',
  MedalAvenger = 'MedalAvenger',
  MedalControlAdvantageHold = 'MedalControlAdvantageHold',
  MedalControlAdvantageStreak = 'MedalControlAdvantageStreak',
  MedalControlCaptureAllZones = 'MedalControlCaptureAllZones',
  MedalControlMostAdvantage = 'MedalControlMostAdvantage',
  MedalControlPerimeterKill = 'MedalControlPerimeterKill',
  MedalControlPowerPlayWipe = 'MedalControlPowerPlayWipe',
  MedalCountdownDefense = 'MedalCountdownDefense',
  MedalCountdownDefusedLastStand = 'MedalCountdownDefusedLastStand',
  MedalCountdownDefusedMulti = 'MedalCountdownDefusedMulti',
  MedalCountdownDetonated = 'MedalCountdownDetonated',
  MedalCountdownPerfect = 'MedalCountdownPerfect',
  MedalCountdownRoundAllAlive = 'MedalCountdownRoundAllAlive',
  MedalCycle = 'MedalCycle',
  MedalDefeatHunterDodge = 'MedalDefeatHunterDodge',
  MedalDefeatTitanBrace = 'MedalDefeatTitanBrace',
  MedalDefeatWarlockSigil = 'MedalDefeatWarlockSigil',
  MedalDefense = 'MedalDefense',
  MedalMatchBlowout = 'MedalMatchBlowout',
  MedalMatchComeback = 'MedalMatchComeback',
  MedalMatchMostDamage = 'MedalMatchMostDamage',
  MedalMatchNeverTrailed = 'MedalMatchNeverTrailed',
  MedalMatchOvertime = 'MedalMatchOvertime',
  MedalMatchUndefeated = 'MedalMatchUndefeated',
  MedalMulti2x = 'MedalMulti2x',
  MedalMulti3x = 'MedalMulti3x',
  MedalMulti4x = 'MedalMulti4x',
  MedalMultiEntireTeam = 'MedalMultiEntireTeam',
  MedalPayback = 'MedalPayback',
  MedalQuickStrike = 'MedalQuickStrike',
  MedalStreak10x = 'MedalStreak10x',
  MedalStreak5x = 'MedalStreak5x',
  MedalStreakAbsurd = 'MedalStreakAbsurd',
  MedalStreakCombined = 'MedalStreakCombined',
  MedalStreakShutdown = 'MedalStreakShutdown',
  MedalStreakTeam = 'MedalStreakTeam',
  MedalSuperShutdown = 'MedalSuperShutdown',
  MedalSupremacyCrestCreditStreak = 'MedalSupremacyCrestCreditStreak',
  MedalSupremacyFirstCrest = 'MedalSupremacyFirstCrest',
  MedalSupremacyNeverCollected = 'MedalSupremacyNeverCollected',
  MedalSupremacyPerfectSecureRate = 'MedalSupremacyPerfectSecureRate',
  MedalSupremacyRecoverStreak = 'MedalSupremacyRecoverStreak',
  MedalSupremacySecureStreak = 'MedalSupremacySecureStreak',
  MedalSurvivalComeback = 'MedalSurvivalComeback',
  MedalSurvivalKnockout = 'MedalSurvivalKnockout',
  MedalSurvivalQuickWipe = 'MedalSurvivalQuickWipe',
  MedalSurvivalTeamUndefeated = 'MedalSurvivalTeamUndefeated',
  MedalSurvivalUndefeated = 'MedalSurvivalUndefeated',
  MedalSurvivalWinLastStand = 'MedalSurvivalWinLastStand',
  MedalWeaponAuto = 'MedalWeaponAuto',
  MedalWeaponFusion = 'MedalWeaponFusion',
  MedalWeaponGrenade = 'MedalWeaponGrenade',
  MedalWeaponHandCannon = 'MedalWeaponHandCannon',
  MedalWeaponPulse = 'MedalWeaponPulse',
  MedalWeaponRocket = 'MedalWeaponRocket',
  MedalWeaponScout = 'MedalWeaponScout',
  MedalWeaponShotgun = 'MedalWeaponShotgun',
  MedalWeaponSidearm = 'MedalWeaponSidearm',
  MedalWeaponSmg = 'MedalWeaponSmg',
  MedalWeaponSniper = 'MedalWeaponSniper',
  MedalWeaponSword = 'MedalWeaponSword',
  MedalsUnknown = 'MedalsUnknown',
  AllMedalsScore = 'AllMedalsScore',
  AllMedalsEarned = 'AllMedalsEarned',
  ObjectivesCompleted = 'ObjectivesCompleted',
  PrecisionKills = 'PrecisionKills',
  ResurrectionsPerformed = 'ResurrectionsPerformed',
  ResurrectionsReceived = 'ResurrectionsReceived',
  Score = 'Score',
  SecondsPlayed = 'SecondsPlayed',
  ActivityDurationSeconds = 'ActivityDurationSeconds',
  Standing = 'ActivityDurationSeconds',
  Suicides = 'Suicides',
  Team = 'Team',
  TotalDeathDistance = 'TotalDeathDistance',
  TotalKillDistance = 'TotalKillDistance',
  WeaponPrecisionKillsAutoRifle = 'WeaponPrecisionKillsAutoRifle',
  WeaponPrecisionKillsFusionRifle = 'WeaponPrecisionKillsFusionRifle',
  WeaponPrecisionKillsGrenade = 'WeaponPrecisionKillsGrenade',
  WeaponPrecisionKillsHandCannon = 'WeaponPrecisionKillsHandCannon',
  WeaponPrecisionKillsMachinegun = 'WeaponPrecisionKillsMachinegun',
  WeaponPrecisionKillsMelee = 'WeaponPrecisionKillsMelee',
  WeaponPrecisionKillsPulseRifle = 'WeaponPrecisionKillsPulseRifle',
  WeaponPrecisionKillsRocketLauncher = 'WeaponPrecisionKillsRocketLauncher',
  WeaponPrecisionKillsScoutRifle = 'WeaponPrecisionKillsScoutRifle',
  WeaponPrecisionKillsShotgun = 'WeaponPrecisionKillsShotgun',
  WeaponPrecisionKillsSniper = 'WeaponPrecisionKillsSniper',
  WeaponPrecisionKillsSubmachinegun = 'WeaponPrecisionKillsSubmachinegun',
  WeaponPrecisionKillsSuper = 'WeaponPrecisionKillsSuper',
  WeaponPrecisionKillsRelic = 'WeaponPrecisionKillsRelic',
  WeaponPrecisionKillsSideArm = 'WeaponPrecisionKillsSideArm',
  WeaponKillsAutoRifle = 'WeaponKillsAutoRifle',
  WeaponKillsFusionRifle = 'WeaponKillsFusionRifle',
  WeaponKillsGrenade = 'WeaponKillsGrenade',
  WeaponKillsHandCannon = 'WeaponKillsHandCannon',
  WeaponKillsMachinegun = 'WeaponKillsMachinegun',
  WeaponKillsMelee = 'WeaponKillsMelee',
  WeaponKillsPulseRifle = 'WeaponKillsPulseRifle',
  WeaponKillsRocketLauncher = 'WeaponKillsRocketLauncher',
  WeaponKillsScoutRifle = 'WeaponKillsScoutRifle',
  WeaponKillsShotgun = 'WeaponKillsShotgun',
  WeaponKillsSniper = 'WeaponKillsSniper',
  WeaponKillsSubmachinegun = 'WeaponKillsSubmachinegun',
  WeaponKillsSuper = 'WeaponKillsSuper',
  WeaponKillsRelic = 'WeaponKillsRelic',
  WeaponKillsSideArm = 'WeaponKillsSideArm',
  WeaponKillsSword = 'WeaponKillsSword',
  WeaponKillsAbility = 'WeaponKillsAbility',
  WeaponBestType = 'WeaponBestType',
  WeaponKillsPrecisionKillsAutoRifle = 'WeaponKillsPrecisionKillsAutoRifle',
  WeaponKillsPrecisionKillsFusionRifle = 'WeaponKillsPrecisionKillsFusionRifle',
  WeaponKillsPrecisionKillsGrenade = 'WeaponKillsPrecisionKillsGrenade',
  WeaponKillsPrecisionKillsHandCannon = 'WeaponKillsPrecisionKillsHandCannon',
  WeaponKillsPrecisionKillsMachinegun = 'WeaponKillsPrecisionKillsMachinegun',
  WeaponKillsPrecisionKillsMelee = 'WeaponKillsPrecisionKillsMelee',
  WeaponKillsPrecisionKillsPulseRifle = 'WeaponKillsPrecisionKillsPulseRifle',
  WeaponKillsPrecisionKillsRocketLauncher = 'WeaponKillsPrecisionKillsRocketLauncher',
  WeaponKillsPrecisionKillsScoutRifle = 'WeaponKillsPrecisionKillsScoutRifle',
  WeaponKillsPrecisionKillsShotgun = 'WeaponKillsPrecisionKillsShotgun',
  WeaponKillsPrecisionKillsSniper = 'WeaponKillsPrecisionKillsSniper',
  WeaponKillsPrecisionKillsSubmachinegun = 'WeaponKillsPrecisionKillsSubmachinegun',
  WeaponKillsPrecisionKillsSuper = 'WeaponKillsPrecisionKillsSuper',
  WeaponKillsPrecisionKillsRelic = 'WeaponKillsPrecisionKillsRelic',
  WeaponKillsPrecisionKillsSideArm = 'WeaponKillsPrecisionKillsSideArm',
  WinLossRatio = 'WinLossRatio',
  UniqueWeaponAssists = 'UniqueWeaponAssists',
  UniqueWeaponAssistDamage = 'UniqueWeaponAssistDamage',
  UniqueWeaponKills = 'UniqueWeaponKills',
  UniqueWeaponPrecisionKills = 'UniqueWeaponPrecisionKills',
  UniqueWeaponKillsPrecisionKills = 'UniqueWeaponKillsPrecisionKills',
  AllParticipantsCount = 'AllParticipantsCount',
  AllParticipantsScore = 'AllParticipantsScore',
  AllParticipantsTimePlayed = 'AllParticipantsTimePlayed',
  ActivityAssists = 'ActivityAssists',
  CompletionReason = 'CompletionReason',
  FireteamId = 'FireteamId',
  LongestKillSpree = 'LongestKillSpree',
  LongestSingleLife = 'LongestSingleLife',
  MostPrecisionKills = 'MostPrecisionKills',
  OrbsDropped = 'OrbsDropped',
  OrbsGathered = 'OrbsGathered',
  StartSeconds = 'StartSeconds',
  TimePlayedSeconds = 'TimePlayedSeconds',
  PlayerCount = 'PlayerCount',
  ActivityPrecisionKills = 'ActivityPrecisionKills',
  PublicEventsCompleted = 'PublicEventsCompleted',
  PublicEventsJoined = 'PublicEventsJoined',
  RemainingTimeAfterQuitSeconds = 'RemainingTimeAfterQuitSeconds',
  TeamScore = 'TeamScore',
  TotalActivityDurationSeconds = 'TotalActivityDurationSeconds',
  DailyMedalsEarned = 'DailyMedalsEarned',
  CombatRating = 'CombatRating',
  LbMostPrecisionKills = 'LbMostPrecisionKills',
  LbLongestKillSpree = 'LbLongestKillSpree',
  LbLongestKillDistance = 'LbLongestKillDistance',
  LbFastestCompletionMs = 'LbFastestCompletionMs',
  LbLongestSingleLife = 'LbLongestSingleLife',
  FastestCompletionMs = 'FastestCompletionMs',
  LongestKillDistance = 'LongestKillDistance',
  HighestCharacterLevel = 'HighestCharacterLevel',
  HighestLightLevel = 'HighestLightLevel',
  HighestSandboxLevel = 'HighestSandboxLevel',
  SparksCaptured = 'SparksCaptured',
  SlamDunks = 'SlamDunks',
  StyleDunks = 'StyleDunks',
  DunkKills = 'DunkKills',
  CarrierKills = 'CarrierKills',
  ActivityGatesHit = 'ActivityGatesHit',
  RaceCompletionSeconds = 'RaceCompletionSeconds',
  GatesHit = 'GatesHit',
  RaceCompletionMilliseconds = 'RaceCompletionMilliseconds'
}

export enum TypeDefinition {
  DestinyActivityGraphDefinition = 'DestinyActivityGraphDefinition',
  DestinyActivityModeDefinition = 'DestinyActivityModeDefinition',
  DestinyActivityModifierDefinition = 'DestinyActivityModifierDefinition',
  DestinyActivityTypeDefinition = 'DestinyActivityTypeDefinition',
  DestinyBondDefinition = 'DestinyBondDefinition',
  DestinyClassDefinition = 'DestinyClassDefinition',
  DestinyDamageTypeDefinition = 'DestinyDamageTypeDefinition',
  DestinyDestinationDefinition = 'DestinyDestinationDefinition',
  DestinyEnemyRaceDefinition = 'DestinyEnemyRaceDefinition',
  DestinyFactionDefinition = 'DestinyFactionDefinition',
  DestinyGenderDefinition = 'DestinyGenderDefinition',
  DestinyHistoricalStatsDefinition = 'DestinyHistoricalStatsDefinition',
  DestinyInventoryBucketDefinition = 'DestinyInventoryBucketDefinition',
  DestinyInventoryItemDefinition = 'DestinyInventoryItemDefinition',
  DestinyItemCategoryDefinition = 'DestinyItemCategoryDefinition',
  DestinyItemTierTypeDefinition = 'DestinyItemTierTypeDefinition',
  DestinyLocationDefinition = 'DestinyLocationDefinition',
  DestinyLoreDefinition = 'DestinyLoreDefinition',
  DestinyMedalTierDefinition = 'DestinyMedalTierDefinition',
  DestinyMilestoneDefinition = 'DestinyMilestoneDefinition',
  DestinyObjectiveDefinition = 'DestinyObjectiveDefinition',
  DestinyPlaceDefinition = 'DestinyPlaceDefinition',
  DestinyProgressionDefinition = 'DestinyProgressionDefinition',
  DestinyProgressionLevelRequirementDefinition = 'DestinyProgressionLevelRequirementDefinition',
  DestinyRaceDefinition = 'DestinyRaceDefinition',
  DestinyRewardSourceDefinition = 'DestinyRewardSourceDefinition',
  DestinySackRewardItemListDefinition = 'DestinySackRewardItemListDefinition',
  DestinySandboxPerkDefinition = 'DestinySandboxPerkDefinition',
  DestinySocketCategoryDefinition = 'DestinySocketCategoryDefinition',
  DestinySocketTypeDefinition = 'DestinySocketTypeDefinition',
  DestinyStatDefinition = 'DestinyStatDefinition',
  DestinyStatGroupDefinition = 'DestinyStatGroupDefinition',
  DestinyTalentGridDefinition = 'DestinyTalentGridDefinition',
  DestinyUnlockDefinition = 'DestinyUnlockDefinition',
  DestinyVendorCategoryDefinition = 'DestinyVendorCategoryDefinition',
  DestinyVendorDefinition = 'DestinyVendorDefinition'
}

/**
 * Interface for defining an object for the Traveler class
 * @interface
 */
export interface ITravelerConfig {
  apikey: string;
  userAgent: string;
  oauthClientId?: string;
  oauthClientSecret?: string;
  debug?: boolean;
}

export interface IStreamInfo {
  ChannelName: string;
}

export interface IGlobalAlert {
  AlertKey: string;
  AlertHtml: string;
  AlerTimestamp: Date;
  AlertLink: string;
  AlertLevel: GlobalAlertLevel;
  AlertType: GlobalAlertType;
  StreamInfo: IStreamInfo;
}

export interface IDictionaryResponse<S> {
  [key: string]: S;
}

/**
 * Interface for defining an object for the endpoint query strings
 * @interface
 */
export interface IQueryStringParameters {
  components?: DestinyComponentType[];
  modes?: DestinyActivityModeType[];
  mode?: DestinyActivityModeType;
  maxtop?: number;
  statid?: string;
  page?: number;
  dayend?: string;
  daystart?: string;
  groups?: DestinyStatsGroupType[];
  periodType?: PeriodType;
  count?: number;
  [key: string]: any;
}

/**
 * Interface for defining an object for the OAuth response
 * @interface
 */
export interface IOAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_expires_in?: number;
  membership_id: string;
}
