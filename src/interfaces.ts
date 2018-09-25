import {
  BungieMembershipType,
  ComponentPrivacySetting,
  ComponentType,
  DamageType,
  DestinyActivityDifficultyTier,
  DestinyActivityModeType,
  DestinyAdvancedAwaResponseReason,
  DestinyAdvancedAwaType,
  DestinyAdvancedAwaUserSelection,
  DestinyClass,
  DestinyCollectibleState,
  DestinyVendorItemState,
  DestinyGameVersion,
  DestinyGender,
  DestinyRace,
  DestinyStatsGroupType,
  DestinyTalentNodeState,
  EquipFailureReason,
  ItemBindStatus,
  ItemLocation,
  ItemState,
  PeriodType,
  PlatformErrorCodes,
  StatsCategoryType,
  TransferStatus,
  UnitType,
  VendorItemRefundPolicy,
  VendorItemStatus,
  MergeMethod
} from './enums';

/**
 * Interface for the common API response object
 * @interface
 */
export interface IAPIResponse<ResponseType> {
  Response: ResponseType;
  ErrorCode: PlatformErrorCodes;
  ThrottleSeconds?: string;
  ErrorStatus?: string;
  Message?: string;
  MessageData: object;
}

/**
 * Interface for defining an object for the Traveler class
 * @interface
 */
export interface IConfig {
  apikey: string;
  userAgent: string;
  oauthClientId?: string;
  oauthClientSecret?: string;
  debug?: boolean;
}

export interface IDateRange {
  start: Date;
  end: Date;
}

/**
 * Interface for an Destiny 2 Activity
 * @interface
 */
export interface IDestinyActivity {
  activityHash: number;
  isNew: boolean;
  canLead: boolean;
  canJoin: boolean;
  isCompleted: boolean;
  isVisible: boolean;
  displayLevel?: number;
  recommendedLight?: number;
  difficultyTier: DestinyActivityDifficultyTier;
}

export interface IDestinyActivityHistoryResults {
  activities: IDestinyHistoricalStatsPeriodGroup[];
}

export interface IDestinyAggregateActivityResults {
  activities: IDestinyAggregateActivityStats[];
}

export interface IDestinyAggregateActivityStats {
  activityHash: number;
  values: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
}

export interface IDestinyAdvancedAwaAuthorizationResult {
  userSelection: DestinyAdvancedAwaUserSelection;
  responseReason: DestinyAdvancedAwaResponseReason;
  developerNote: string;
  actionToken: string;
  maximumNumberOfUses: number;
  validUntil?: Date;
}

/**
 * Interface for response of AwaInitializeRequest
 * @interface
 */
export interface IDestinyAdvancedAwaInitializeResponse {
  correlationId: string;
}

export interface IDestinyAdvancedAwaPermissionRequested {
  type: DestinyAdvancedAwaType;
  affectedItemId?: number;
  membershipType: BungieMembershipType;
  characterId?: string;
}

export interface IDestinyAdvancedAwaUserResponse {
  selection: DestinyAdvancedAwaUserSelection;
  corrlectionId: string;
  nonce: any;
}
/**
 * Interface for an Destiny 2 milestone quest
 * @interface
 */
export interface IDestinyMilestoneQuest {
  questItemHash: number;
  status: IDestinyQuestStatus;
  activity: IDestinyMilestoneActivity;
  challenges: IDestinyChallengeStatus[];
}

/**
 * Interface for an Destiny 2 challenge status
 * @interface
 */
export interface IDestinyChallengeStatus {
  objective: IDestinyObjectiveProgress;
}

/**
 * Interface for an characters activities component
 * @interface
 */
export interface IDestinyCharacterActivitiesComponent {
  dateActivityStarted: Date;
  availableActivites: IDestinyActivity[];
  currentActivityHash: number;
  currentActivityModeHash: number;
  currentActivityModeType?: DestinyActivityModeType;
  currentActivityModeHashes: string[];
  currentActivityModeTypes: DestinyActivityModeType[];
  currentPlaylistActivityHash?: string;
  lastCompletedStoryHash: number;
}

/**
 * This component contains base properties of the character.
 * @interface
 */
export interface IDestinyCharacterComponent {
  membershipId: string;
  membershipType: BungieMembershipType;
  characterId: string;
  dateLastPlayed: Date;
  minutesPlayedThisSession: number;
  minutesPlayedTotal: number;
  light: number;
  stats: object;
  raceHash: number;
  genderHash: number;
  classHash: number;
  raceType: DestinyRace;
  classType: DestinyClass;
  genderType: DestinyGender;
  emblemPath: string;
  emblemBackgroundPath: string;
  emblemHash: number;
  levelProgression: IDestinyProgression;
  baseCharacterLevel: number;
  percentToNextLevel: number;
}

/**
 * Interface for a character customization object
 * @interface
 */
export interface IDestinyCharacterCustomization {
  personality: string;
  face: string;
  skinColor: string;
  lipColor: string;
  eyeColor: string;
  hairColors: string[];
  featureColors: string[];
  decalColor: string;
  wearHelmet: boolean;
  hairIndex: number;
  featureIndex: number;
  decalIndex: number;
}

/**
 * Interface for a minimal view of a character's equipped items
 * @interface
 */
export interface IDestinyCharacterPeerView {
  equipment: IDestinyItemPeerView[];
}

/**
 * Interface for a single character progress component
 * @interface
 */
export interface IDestinyCharacterProgressionComponent {
  progressions: IDestinyProgression;
  factions: IDestinyFactionProgression;
  milestones: IDestinyMilestone;
  quests: IDestinyQuestStatus[];
  uninstancedItemObjectives: object;
}

/**
 * Interface for character render data component
 * @interface
 */
export interface IDestinyCharacterRenderComponent {
  customDyes: IDyeReference;
  customization: IDestinyCharacterCustomization;
  peerView: IDestinyCharacterPeerView;
}

/**
 * Interface for an character response object
 * @interface
 */
export interface IDestinyCharacterResponse {
  inventory?: ISingleComponentResponse<IDestinyInventoryComponent>;
  character?: ISingleComponentResponse<IDestinyCharacterComponent>;
  progressions?: ISingleComponentResponse<IDestinyCharacterProgressionComponent>;
  renderData?: ISingleComponentResponse<IDestinyCharacterRenderComponent>;
  activities?: ISingleComponentResponse<IDestinyCharacterActivitiesComponent>;
  equipment?: ISingleComponentResponse<IDestinyInventoryComponent>;
  kiosks?: ISingleComponentResponse<IDestinyKiosksComponent>;
  plugSets?: ISingleComponentResponse<IDestinyPlugSetsComponent>;
  itemComponents?: IDestinyItemComponentSet;
  currencyLookups?: ISingleComponentResponse<IDestinyCurrenciesComponent>;
}

export interface IDestinyClanAggregateStat {
  mode: DestinyActivityModeType;
  statId: string;
  value: IDestinyHistoricalStatsValue;
}

export interface IDestinyCurrenciesComponent {
  itemQuantities: {
    [key: number]: number;
  };
}

export interface IDestinyCollectibleComponent {
  state: DestinyCollectibleState;
}

export interface IDestinyCollectiblesComponent {
  collectibles: {
    [key: number]: IDestinyCollectibleComponent;
  };
}

export interface IDestinyCollectibleNodeDetailResponse {
  collectibles: ISingleComponentResponse<IDestinyCollectiblesComponent>;
  collectibleItemComponents: IDestinyItemComponentSet;
}

/**
 * Interface for common properties for destiny defitions
 * @interface
 */
export interface IDestinyDefinition {
  hash: string;
  index: number;
  redacted: boolean;
}

/**
 * Many Destiny*Definition contracts - the "first order" entities of Destiny that have their own tables in the Manifest Database - also have displayable information. This is the base interface for that display information.
 * @interface
 */
export interface IDestinyDisplayPropertiesDefinition {
  description: string;
  name: string;
  icon: string;
  hashIcon: string;
}

export interface IDestinyEntitySearchResult {
  suggestedWords: string[];
  results: ISearchResultOfDestinyEntitySearchResultItem;
}

export interface IDestinyEntitySearchResultItem {
  hash: number;
  entityType: string;
  displayProperties: IDestinyDisplayPropertiesDefinition;
  weight: number;
}

export interface IDestinyEquipItemResult {
  itemInstanceId: string;
  equipStatus: PlatformErrorCodes;
}

export interface IDestinyEquipItemResults {
  equiResults: IDestinyEquipItemResult[];
}

/**
 * If a Destiny Profile can't be returned, but we're pretty certain it's a valid Destiny account, this will contain as much info as we can get about the profile for your use.
 * @interface
 */
export interface IDestinyErrorProfile {
  errorCode: PlatformErrorCodes;
  infoCard: IUserInfoCard;
}

/**
 * Mostly for historical purposes, we segregate Faction progressions from other progressions
 * @interface
 */
export interface IDestinyFactionProgression extends IDestinyProgression {
  factionHash: number;
}

export interface IDestinyHistoricalStatsAccountResult {
  mergedDeletedCharacters: IDestinyHistoricalStatsWithMerged;
  mergedAllCharacters: IDestinyHistoricalStatsWithMerged;
  characters: IDestinyHistoricalStatsPerCharacter[];
}

export interface IDestinyHistoricalStatsActivity {
  referenceId: string;
  directorActivityHash: number;
  isntanceId: string;
  mode: DestinyActivityModeType;
  modes: DestinyActivityModeType[];
  isPrivate: boolean;
}

export interface IDestinyHistoricalStatsByPeriod {
  allTime: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
  allTimeTier1: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
  allTimeTier2: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
  allTimeTier3: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
  daily: IDestinyHistoricalStatsPeriodGroup[];
  monthly: IDestinyHistoricalStatsPeriodGroup[];
}

/**
 * Interface for an historical stats definition
 * @interface
 */
export interface IDestinyHistoricalStatsDefinition {
  statId: string;
  group: DestinyStatsGroupType;
  periodTypes: PeriodType[];
  modes: DestinyActivityModeType[];
  category: StatsCategoryType;
  statNameAbbr: string;
  statName: string;
  statDescription: string;
  unitType: UnitType;
  iconImage: string;
  mergeMethod?: MergeMethod;
  unitLabel: string;
  weight: number;
  medalTierHash?: number;
}

export interface IDestinyHistoricalStatsPerCharacter {
  characterId: string;
  deleted: boolean;
  results: {
    [key: string]: IDestinyHistoricalStatsByPeriod;
  };
  merged: IDestinyHistoricalStatsByPeriod;
}

export interface IDestinyHistoricalStatsPeriodGroup {
  period: Date;
  activityDetail: IDestinyHistoricalStatsActivity;
  values: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
}

export interface IDestinyHistoricalStatsValue {
  statId: string;
  basic: IDestinyHistoricalStatsValuePair;
  pga: IDestinyHistoricalStatsValuePair;
  weighted: IDestinyHistoricalStatsValuePair;
  activityId?: number;
}

export interface IDestinyHistoricalStatsValuePair {
  value: number;
  displayValue: string;
}

export interface IDestinyHistoricalStatsWithMerged {
  results: {
    [key: string]: IDestinyHistoricalStatsByPeriod;
  };
  merged: IDestinyHistoricalStatsByPeriod;
}

export interface IDestinyHistoricalWeaponStats {
  referenceId: number;
  values: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
}

export interface IDestinyHistoricalWeaponStatsData {
  weapons: IDestinyHistoricalWeaponStats[];
}

/**
 * Interface for  minimal information for items in an inventory:
 * @interface
 */
export interface IDestinyInventoryComponent {
  items: IDestinyItemComponent[];
}

/**
 * Interface for defining an object in case of an item action request to the API
 * @interface
 */
export interface IDestinyItemActionRequest {
  itemId?: string;
  characterId: string;
  membershipType: BungieMembershipType;
}

export interface IDestinyItemComponent {
  itemHash: number;
  itemInstanceId: number;
  quantity: number;
  bindStatus: ItemBindStatus;
  location: ItemLocation;
  bucketHash: number;
  transferStatus: TransferStatus;
  lockable: boolean;
  state: ItemState;
}

export interface IDestinyItemComponentSet {
  instances: IDictionaryComponent<IDestinyItemInstanceComponent>;
  objectives: IDictionaryComponent<IDestinyItemObjectivesComponent>;
  perks: IDictionaryComponent<IDestinyItemPerksComponent>;
  renderData: IDictionaryComponent<IDestinyItemRenderComponent>;
  stats: IDictionaryComponent<IDestinyItemStatsComponent>;
  sockets: IDictionaryComponent<IDestinyItemSocketsComponent>;
  talentGrids: IDictionaryComponent<IDestinyItemTalentGridComponent>;
  plugStates: IDictionaryComponent<IDestinyItemPlugComponent>;
}

/**
 * If an item is "instanced", this will contain information about the item's instance that doesn't fit easily into other components
 * @interface
 */
export interface IDestinyItemInstanceComponent {
  damageType: DamageType;
  damageTypeHash: number;
  primaryStat: IDestinyStat;
  itemLevel: number;
  quality: number;
  isEquipped: boolean;
  canEquip: boolean;
  equipRequiredLevel: number;
  unlockHashesRequiredToEquip: string[];
  cannEquipReason: EquipFailureReason;
}

/**
 * @interface
 */
export interface IDestinyItemObjectivesComponent {
  objectives: IDestinyObjectiveProgress[];
  flavorObject: IDestinyObjectiveProgress;
  dateCompleted?: Date;
}

/**
 * Interface for a minimal view of a character's equipped items
 * @interface
 */
export interface IDestinyItemPeerView {
  itemHash: number;
  dyes: IDyeReference;
}

/**
 * Instanced items can have perks: benefits that the item bestows.
 * @interface
 */
export interface IDestinyItemPerksComponent {
  perks: IDestinyPerkReference[];
}

export interface IDestinyItemPlugComponent {
  plugItemHash: string;
  plugObjectives: IDestinyObjectiveProgress;
  caninsert: boolean;
  enabled: boolean;
  insertFailIndexes: number[];
  enableFailIndexes: number[];
}

/**
 * Interface for an item stack and its quantity
 * @interface
 */
export interface IDestinyItemQuantity {
  itemHash: number;
  itemInstanceId: string;
  quantity: number;
}

export interface IDestinyItemRenderComponent {
  useCustomDyes: boolean;
  artRegion: {
    [key: number]: number;
  };
}

/**
 * Interface an response object for retrieving an individual instanced item
 * @interface
 */
export interface IDestinyItemResponse {
  characterId?: string;
  item?: ISingleComponentResponse<IDestinyItemComponent>;
  instance?: ISingleComponentResponse<IDestinyItemInstanceComponent>;
  objectives?: ISingleComponentResponse<IDestinyItemObjectivesComponent>;
  perks?: ISingleComponentResponse<IDestinyItemPerksComponent>;
  renderData?: ISingleComponentResponse<IDestinyItemRenderComponent>;
  stats?: ISingleComponentResponse<IDestinyItemStatsComponent>;
  talentGrid?: ISingleComponentResponse<IDestinyItemTalentGridComponent>;
  sockets?: ISingleComponentResponse<IDestinyItemSocketsComponent>;
}

/**
 * Interface for defining an object in case of an item set action request to the API
 * @interface
 */
export interface IDestinyItemSetActionRequest {
  itemIds?: string[];
  characterId: string;
  membershipType: BungieMembershipType;
}

export interface IDestinyItemStatsComponent {
  stats: {
    [key: string]: IDestinyStat;
  };
}

export interface IDestinyItemSocketState {
  plugHash: number;
  isEnabled: boolean;
  isVisible: boolean;
  enableFailIndexes: number[];
  reusablePlugHashes: number[];
  plugObjectives: IDestinyObjectiveProgress[];
  reusablePlugs: IDestinyItemPlug[];
}

export interface IDestinyItemSocketsComponent {
  sockets: IDestinyItemSocketState[];
}

/**
 * Interface for defining an object in oder to set the lock state of an item in the inventory
 * @interface
 */
export interface IDestinyItemStateRequest {
  state: boolean;
  itemId: string;
  characterId: string;
  membershipType: BungieMembershipType;
}

export interface IDestinyItemTalentGridComponent {
  talentGridHash: number;
  nodes: IDestinyTalentNode[];
  isGridComplete: boolean;
  gridProgression: IDestinyProgression;
}

/**
 * Interface for defining an object in order to transfer it from inventory to vault or vice versa
 * @interface
 */
export interface IDestinyItemTransferRequest {
  itemReferenceHash: number;
  stackSize: number;
  transferToVault: boolean;
  itemId: string;
  characterId: string;
  membershipType: BungieMembershipType;
}

/**
 * Interface for a destiny kiosk (vendor)
 * @interface
 */
export interface IDestinyKiosksComponent {
  kioskItems: number[];
}

/**
 * Interface a minimal amount of data about Destiny Accounts that are linked through your Bungie.Net account
 * @interface
 */
export interface IDestinyLinkedProfilesResponse {
  profiles: IUserInfoCard[];
  bnetMembership: IUserInfoCard;
  profilesWithErrors: IDestinyErrorProfile[];
}

/**
 * Interface for the getDestinyManifest result response
 * @interface
 */
export interface IDestinyManifest {
  version: string;
  mobileAssetContentPath: string;
  mobileGearAssetDataBases: IGearAssetDataBaseDefinition[];
  mobileWorldContentPaths: {
    [key: string]: string;
  };
  mobileClanBannerDatabasePath: string;
  mobileGearCDN: {
    [key: string]: string;
  };
}

export interface IDestinyMaterialRequirement {
  itemHash: number;
  deleteOnAction: boolean;
  count: number;
  omitFromRequirements: boolean;
}

/**
 * Interface for an Destiny 2 milestone
 * @interface
 */
export interface IDestinyMilestone {
  milestoneHash: number;
  availableQuests: IDestinyMilestoneQuest[];
  values: object;
  vendors: IDestinyPublicMilestoneVendor[];
  rewards: IDestinyMilestoneRewardCategory[];
  startDate?: Date;
  endDate?: Date;
}

/**
 * Interface an milestone activity
 * @interface
 */
export interface IDestinyMilestoneActivity {
  activityHash: number;
  modifierHash: number[];
  variants: IDestinyMilestoneActivityVariant[];
}

/**
 * Interface an milestone activity completion status
 * @interface
 */
export interface IDestinyMilestoneActivityCompletionStatus {
  completed: boolean;
  phases: IDestinyMilestoneActivityPhase[];
}

/**
 * Interface an milestone activity phase
 * @interface
 */
export interface IDestinyMilestoneActivityPhase {
  complete: boolean;
}

/**
 * Interface an milestone activity variant
 * @interface
 */
export interface IDestinyMilestoneActivityVariant {
  activityHash: number;
  completionStatus?: IDestinyMilestoneActivityCompletionStatus;
}

/**
 * Represents localized, extended content related to Milestones.
 * @interface
 */
export interface IDestinyMilestoneContent {
  about: string;
  status: string;
  tips: string[];
  itemCategories: IDestinyMilestoneContentItemCategory[];
}

export interface IDestinyMilestoneContentItemCategory {
  title: string;
  itemHashes: number[];
}

/**
 * Interface for an Destiny 2 milestone quest
 * @interface
 */
export interface IDestinyMilestoneQuest {
  questItemHash: number;
  status: IDestinyQuestStatus;
  activity: IDestinyMilestoneActivity;
  challenges: IDestinyChallengeStatus[];
}

/**
 * Interface for a category of "summary" rewards that can be earned for the Milestone regardless of specific quest rewards that can be earned.
 * @interface
 */
export interface IDestinyMilestoneRewardCategory {
  rewardCategoryHash: number;
  entries: IDestinyMilestoneRewardEntry[];
}

/**
 * Interface for The character-specific data for a milestone's reward entry
 * @interface
 */
export interface IDestinyMilestoneRewardEntry {
  rewardEntryHash: number;
  earned: boolean;
  redeemed: boolean;
}

/**
 * Interface for data about a character's status with a given Objective
 * @interface
 */
export interface IDestinyObjectiveProgress {
  objectiveHash: number;
  destinationHash?: string;
  activityHash?: string;
  progress?: number;
  completionValue: number;
  complete: boolean;
  visible: boolean;
}

/**
 * The list of perks to display in an item tooltip - and whether or not they have been activated.
 * @interface
 */
export interface IDestinyPerkReference {
  perkHash: number;
  iconPath: string;
  isActive: boolean;
  isVisible: boolean;
}

export interface IDestinyPlayer {
  destinyUserInfo: IUserInfoCard;
  characterClass: string;
  characterLevel: number;
  lightLevel: number;
  bungieNetUserInfo?: IUserInfoCard;
  clanName?: string;
  clanTag?: string;
}

export interface IDestinyPlugSetsComponent {
  plugs: {
    [key: string]: object[];
  };
}

export interface IDestinyItemPlug {
  plugItemHash: number;
  plugObjectives: IDestinyObjectiveProgress[];
  canInsert: boolean;
  enabled: boolean;
  insertFailIndexes: number[];
  enableFailIndexes: number[];
}

/**
 * Interface for the post game carnage report data
 * @interface
 */
export interface IDestinyPostGameCarnageReportData {
  period: Date;
  activityDetails: IDestinyHistoricalStatsActivity;
  entries: [IDestinyPostGameCarnageReportEntry];
  teams: [IDestinyPostGameCarnageReportTeamEntry];
}

export interface IDestinyPostGameCarnageReportEntry {
  standing: number;
  score: IDestinyHistoricalStatsValue;
  player: IDestinyPlayer;
  characterId: string;
  values: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
  extended: IDestinyPostGameCarnageReportExtendedData;
}

export interface IDestinyPostGameCarnageReportTeamEntry {
  teamId: number;
  standing: IDestinyHistoricalStatsValue;
  score: IDestinyHistoricalStatsValue;
  teamName: string;
}

export interface IDestinyPostGameCarnageReportExtendedData {
  weapons: IDestinyHistoricalWeaponStats[];
  values: {
    [key: string]: IDestinyHistoricalStatsValue;
  };
}

/**
 * The object to transfer items from the post master
 * @interface
 */
export interface IDestinyPostMasterTransferRequest {
  itemReferenceHash: string;
  stackSize: number;
  itemId: string;
  characterId: string;
  membershipType: BungieMembershipType;
}

/**
 * Interface for a signle destiny profile
 * @interface
 */
export interface IDestinyProfileComponent {
  userInfo: IUserInfoCard;
  dateLastPlayed: Date;
  versionsOwned: DestinyGameVersion;
  characterIds: string[];
}

/**
 * Interface for the response of getProfile
 * @interface
 */
export interface IDestinyProfileResponse {
  vendorReceipts?: ISingleComponentResponse<IDestinyVendorReceiptsComponent>;
  profileInventory?: ISingleComponentResponse<IDestinyInventoryComponent>;
  profileCurrencies?: ISingleComponentResponse<IDestinyInventoryComponent>;
  profile?: ISingleComponentResponse<IDestinyProfileComponent>;
  profileKiosks?: ISingleComponentResponse<IDestinyKiosksComponent>;
  profilePlugSets?: ISingleComponentResponse<IDestinyPlugSetsComponent>;
  characters?: IDictionaryComponent<IDestinyCharacterComponent>;
  characterInventories?: IDictionaryComponent<IDestinyInventoryComponent>;
  characterProgressions?: IDictionaryComponent<IDestinyCharacterProgressionComponent>;
  characterRenderData?: IDictionaryComponent<IDestinyCharacterRenderComponent>;
  characterActivities?: IDictionaryComponent<IDestinyCharacterActivitiesComponent>;
  characterEquipment?: IDictionaryComponent<IDestinyInventoryComponent>;
  characterKiosks?: IDictionaryComponent<IDestinyKiosksComponent>;
  characterPlugSets?: IDictionaryComponent<IDestinyPlugSetsComponent>;
  itemComponents?: IDestinyItemComponentSet;
  characterCurrencyLookups: IDictionaryComponent<IDestinyCurrenciesComponent>;
}

/**
 * Interface for a single character progress component
 * @interface
 */
export interface IDestinyCharacterProgressionComponent {
  progressions: IDestinyProgression;
  factions: IDestinyFactionProgression;
  milestones: IDestinyMilestone;
  quests: IDestinyQuestStatus[];
  uninstancedItemObjectives: object;
}

/**
 * Interface for the level progression of a character
 * @interface
 */
export interface IDestinyProgression {
  progressionHash: number;
  dailyProgress: number;
  dailyLimit: number;
  weeklyProgress: number;
  weeklyLimit: number;
  currentProgress: number;
  level: number;
  levelCap: number;
  stepIndex: number;
  progressToNextLevel: number;
  nextLevelAt: number;
}

export interface IDestinyPublicMilestone {
  milestoneHash: number;
  availableQuests: IDestinyPublicMilestoneQuest[];
  vendors: IDestinyPublicMilestoneVendor[];
  startDate?: Date;
  endDate?: Date;
}

export interface IDestinyPublicMilestoneActivity {
  activitHash: number;
  modifierHashes: string[];
  variants: IDestinyPublicMilestoneActivityVariant[];
  activityModeHash?: number;
  activityModeType?: DestinyActivityModeType;
}

export interface IDestinyPublicMilestoneActivityVariant {
  activityHash: number;
}

export interface IDestinyPublicMilestoneChallenge {
  objectiveHash: number;
  activityHash?: number;
}

export interface IDestinyPublicMilestoneQuest {
  questItemHash: number;
  activity: IDestinyPublicMilestoneActivity;
  challenges: IDestinyPublicMilestoneChallenge[];
}

export interface IDestinyPublicMilestoneVendor {
  vendorHash: number;
  previewItemHash?: number;
}

/**
 * Interface for data regarding the progress of a Quest for a specific character.
 * @interface
 */
export interface IDestinyQuestStatus {
  questHash: number;
  stepHash: number;
  stepObjectives: IDestinyObjectiveProgress[];
  tracked: boolean;
  itemInstanceId: string;
  completed: boolean;
  redeemed: boolean;
  started: boolean;
  vendorHash?: string;
}

/**
 * Interface for data regarding the reporting of an offensive placer in an activity. Hashes can be found in the manifest.
 * @interface
 */
export interface IDestinyReportOffensePgcrRequest {
  reasonCategoryHashes: [string];
  reasonHashes: [string];
  offendingCharacterId: number;
}

/**
 * Represents a stat on an item *or* Character (NOT a Historical Stat, but a physical attribute stat like Attack, Defense etc...)
 * @interface
 */
export interface IDestinyStat {
  statHash: number;
  value: number;
  maximumValue: number;
}

export interface IDestinyTalentNode {
  nodeIndex: number;
  nodeHash: number;
  state: DestinyTalentNodeState;
  isActivated: boolean;
  stepIndex: number;
  materialsToUpgrade: IDestinyMaterialRequirement[];
  activationGridLevel: number;
  progressPercent: number;
  hidden: boolean;
  nodeStatsBlock: IDestinyTalentNodeStatBlock;
}

export interface IDestinyTalentNodeStatBlock {
  currentStepStats: IDestinyStat[];
  nextStepStats: IDestinyStat[];
}

export interface IDestinyUnlockStatus {
  unlockHash: number;
  isSet: boolean;
}

export interface IDestinyVendorsResponse {
  vendorGroups?: ISingleComponentResponse<IDestinyVendorGroupComponent>;
  vendors?: ISingleComponentResponse<{
    [key: number]: IDestinyVendorComponent;
  }>;
  categories?: ISingleComponentResponse<{
    [key: number]: IDestinyVendorCategoriesComponent;
  }>;
  sales?: ISingleComponentResponse<{
    [key: number]: IDestinyVendorSaleItemSetComponent; // TODO: look at docs
  }>;
  itemComponents?: IDestinyItemComponentSet;
  currencyLookups: ISingleComponentResponse<IDestinyCurrenciesComponent>;
}

export interface IDestinyVendorCategoriesComponent {
  categories: IDestinyVendorCategory[];
}

export interface IDestinyVendorCategory {
  categoryIndex: number;
  itemIndexes: number[];
}

export interface IDestinyVendorComponent {
  vendorHash: number;
  ackState: object; // Not used anymore because of that no further definition here
  nextRefreshDate: Date;
  enabled: boolean;
  canPurchase: boolean;
  progression: IDestinyProgression;
  vendorLocationIndex: number;
  seasonalRank?: number;
}

export interface IDestinyVendorGroup {
  vendorGroupHash: number;
  vendorHashes: number[];
}

export interface IDestinyVendorGroupComponent {
  groups: IDestinyVendorGroup[];
}

/**
 * Interface for the a single vendor receipt
 * @interface
 */
export interface IDestinyVendorReceipt {
  currencyPaid: IDestinyItemQuantity;
  itemReceived: IDestinyItemQuantity;
  licenseUnlockHash: number;
  purchasedByCharacterId: string;
  refundPolicy: VendorItemRefundPolicy;
  sequenceNumber: number;
  timeToExpiration: number;
  expiresOn: Date;
}

/**
 * Interface for the vendor receipts component
 * @interface
 */
export interface IDestinyVendorReceiptsComponent {
  receipts: IDestinyVendorReceipt[];
}

/**
 * Interface an response containing all of the components for a vendor.
 * @interface
 */
export interface IDestinyVendorResponse {
  vendor?: ISingleComponentResponse<IDestinyVendorComponent>;
  categories?: ISingleComponentResponse<IDestinyVendorCategoriesComponent>;
  sales?: IDictionaryComponent<IDestinyVendorSaleItemComponent>;
  itemComponents: IDestinyItemComponentSet;
  currencyLookup: ISingleComponentResponse<IDestinyCurrenciesComponent>;
}

export interface IDestinyVendorSaleItemSetComponent {
  saleItems: { [key: number]: IDestinyVendorSaleItemComponent };
}

export interface IDestinyVendorSaleItemComponent {
  vendorItemIndex: number;
  itemHash: number;
  overrideStyleItemHash: number;
  quantity: number;
  saleStatus: VendorItemStatus;
  costs: IDestinyItemQuantity[];
  requiredUnlocks: number[];
  unlockStatuses: IDestinyUnlockStatus[];
  failureIndexes: number[];
  augments: DestinyVendorItemState;
  overrideNextRefreshDate: Date;
}

/**
 * Interface for an sigle dictionary component
 * @interface
 */
export interface IDictionaryComponent<IComponent> {
  data: {
    [key: number]: IComponent;
  };
  privacy: ComponentPrivacySetting;
}

/**
 * Interface for dye reference
 * @interface
 */
export interface IDyeReference {
  channelHash: number;
  dyeHash: number;
}

/**
 * Interface for the manifest gear asset database definition
 * @interface
 */
export interface IGearAssetDataBaseDefinition {
  version: number;
  path: string;
}
/**
 * Interface for Bungie.net user info
 * @interface
 */
export interface IGeneralUser {
  membershipId: string;
  uniqueName: string;
  normalizedName: string;
  displayName: string;
  profilePicture: string;
  profileTheme: string;
  userTitle: string;
  successMessageFlags: string;
  isDeleted: boolean;
  about: string;
  firstAccess?: string;
  lastUpdate?: Date;
  legacyPortalUID?: string;
  psnDisplayName: string;
  xboxDisplayName: string;
  fbDisplayName: string;
  showActivity?: boolean;
  locale: string;
  localeInheritDefault: boolean;
  lastBanReportId?: string;
  showGroupMessaging: boolean;
  profilePicturePath: string;
  profilePictureWidePath: string;
  profileThemeName: string;
  userTitleDisplay: string;
  statusText: string;
  statusDate: Date;
  profileBanExpire?: Date;
  blizzardDisplayName: string;
}

/**
 * Interface for defining an object for the OAuth process
 * @interface
 */
export interface IOAuthConfig {
  clientId?: string;
  clientSecret?: string;
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

export interface IPagedQUery {
  itemsPerPage: number;
  currentPage: number;
  requestContinuationToken: string;
}

/**
 * Interface for defining an object for the endpoint query strings
 * @interface
 */
export interface IQueryStringParameters {
  components?: ComponentType[];
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

export interface ISearchResultOfDestinyEntitySearchResultItem {
  results: IDestinyEntitySearchResultItem[];
  totalResults: number;
  hasMore: boolean;
  query: IPagedQUery;
  replacementContinuationToken: string;
  useTotalResults: boolean;
}

/**
 * Interface for an sigle component
 * @interface
 */
export interface ISingleComponentResponse<IComponent> {
  data: IComponent;
  privacy: ComponentPrivacySetting;
}

/**
 * Interface for the user info
 * @interface
 */
export interface IUserInfoCard {
  supplementalDisplayName: string;
  iconPath: string;
  membershipType: BungieMembershipType;
  membershipId: string;
  displayName: string;
}

/**
 * Interface for the response of getMembershipDataByCurrentUser
 * @interface
 */
export interface IUserMembershipData {
  destinyMemberships: IUserInfoCard[];
  bungieNetUser: IGeneralUser;
}
