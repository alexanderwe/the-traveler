import {
    BungieMembershipType,
    ComponentPrivacySetting,
    ComponentType,
    DamageType,
    DestinyActivityDifficultyTier,
    DestinyActivityModeType,
    DestinyClass,
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
    activityHash: string;
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
    activities: object[];
}

export interface IDestinyAggregateActivityResults {
    activities: IDestinyAggregateActivityStats[];
}

export interface IDestinyAggregateActivityStats {
    activityHash: string;
    values: {
        [key: string]: IDestinyHistoricalStatsValue;
    };
}

/**
 * Interface for an Destiny 2 milestone quest
 * @interface
 */
export interface IDestinyMilestoneQuest {
    questItemHash: string;
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
    currentActivityHash: string;
    currentActivityModeHash: string;
    currentActivityModeType?: DestinyActivityModeType;
    currentActivityModeHashes: string[];
    currentActivityModeTypes: DestinyActivityModeType[];
    currentPlaylistActivityHash?: string;
    lastCompletedStoryHash: string;
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
    raceHash: string;
    genderHash: string;
    classHash: string;
    raceType: DestinyRace;
    classType: DestinyClass;
    genderType: DestinyGender;
    emblemPath: string;
    emplemBackgroundPath: string;
    emblemHash: string;
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
    progessions: IDestinyProgression;
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
    itemComponents?: object; // TODO: Implement full
}

export interface IDestinyClanAggregateStat {
    mode: DestinyActivityModeType;
    statId: string;
    value: IDestinyHistoricalStatsValue;
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
    hash: string;
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
 * Mostly for historical purposes, we segregate Faction progressions from other progressions
 * @interface
 */
export interface IDestinyFactionProgression extends IDestinyProgression {
    factionHash: string;
}

export interface IDestinyHistoricalStatsAccountResult {
    mergedDeletedCharacters: IDestinyHistoricalStatsWithMerged;
    mergedAllCharacters: IDestinyHistoricalStatsWithMerged;
    characters: IDestinyHistoricalStatsPerCharacter[];
}

export interface IDestinyHistoricalStatsActivity {
    referenceId: string;
    directorActivityHash: string;
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
    statName: string;
    statDescription: string;
    unitType: UnitType;
    iconImage: string;
    mergeMethod: string;
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
    referenceId: string;
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
    itemHash: string;
    itemInstanceId: string;
    quantity: number;
    bindStatus: ItemBindStatus;
    location: ItemLocation;
    bucketHash: string;
    transferStatus: TransferStatus;
    lockable: boolean;
    state: ItemState;
}

/**
 * If an item is "instanced", this will contain information about the item's instance that doesn't fit easily into other components
 * @interface
 */
export interface IDestinyItemInstanceComponent {
    damageType: DamageType;
    damageTypeHash: string;
    primaryStat: IDestinyStat;
    itemLevel: number;
    quality: number;
    isEquipped: boolean;
    canEquip: boolean;
    equiRequiredLevel: number;
    unlockHashesRequiredToEquip: string[];
    cannEquipReason: EquipFailureReason;
}

/**
 * @interface
 */
export interface IDestinyItemObjectivesComponent {
    objectives: IDestinyObjectiveProgress[];
}

/**
 * Interface for a minimal view of a character's equipped items
 * @interface
 */
export interface IDestinyItemPeerView {
    itemHash: string;
    dyes: IDyeReference;
}

/**
 * Instanced items can have perks: benefits that the item bestows.
 * @interface
 */
export interface IDestinyItemPerksComponent {
    perks: IDestinyPerkReference[];
}

/**
 * Interface for an item stack and its quantity
 * @interface
 */
export interface IDestinyItemQuantity {
    itemHash: string;
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
    plugHash: string;
    isEnabled: boolean;
    enableFailIndexes: number[];
    reusablePlugHashes: string[];
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
    talentGridHash: string;
    nodes: IDestinyTalentNode[];
    isGridComplete: boolean;
    gridProgression: IDestinyProgression;
}

/**
 * Interface for defining an object in order to transfer it from inventory to vault or vice versa
 * @interface
 */
export interface IDestinyItemTransferRequest {
    itemReferenceHash: string;
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
 * Interface for the getDestinyManifest result response
 * @interface
 */
export interface IDestinyManifest {
    version: string;
    mobileAssetContentPath: string;
    mobileGearAssetDataBases: IGearAssetDataBaseDefinition[];
    mobileWorldContentPaths: object;
    mobileClanBannerDatabasePath: string;
    mobileGearCDN: object;
}

export interface IDestinyMaterialRequirement {
    itemHash: string;
    deleteOnAction: boolean;
    count: number;
    omitFromRequirements: boolean;
}

/**
 * Interface for an Destiny 2 milestone
 * @interface
 */
export interface IDestinyMilestone {
    milestoneHash: string;
    availableQuests: IDestinyMilestoneQuest[];
    values: object;
    vendorHashes: number[];
    rewards: IDestinyMilestoneRewardCategory[];
    startDate?: Date;
    endDate?: Date;
}

/**
 * Interface an milestone activity
 * @interface
 */
export interface IDestinyMilestoneActivity {
    activityHash: string;
    modifierHash: string[];
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
    activityHash: string;
    completionStatus?: IDestinyMilestoneActivityCompletionStatus;
}

export interface IDestinyMilestoneContent {
    about: string;
    status: string;
    tips: string[];
    itemCategories: IDestinyMilestoneContentItemCategory[];
}

export interface IDestinyMilestoneContentItemCategory {
    title: string;
    itemHashes: string[];
}

/**
 * Interface for an Destiny 2 milestone quest
 * @interface
 */
export interface IDestinyMilestoneQuest {
    questItemHash: string;
    status: IDestinyQuestStatus;
    activity: IDestinyMilestoneActivity;
    challenges: IDestinyChallengeStatus[];
}

/**
 * Interface for a category of "summary" rewards that can be earned for the Milestone regardless of specific quest rewards that can be earned.
 * @interface
 */
export interface IDestinyMilestoneRewardCategory {
    rewardCategoryHash: string;
    entries: IDestinyMilestoneRewardEntry[];
}

/**
 * Interface for The character-specific data for a milestone's reward entry
 * @interface
 */
export interface IDestinyMilestoneRewardEntry {
    rewardEntryHash: string;
    earned: boolean;
    redeemed: boolean;
}

/**
 * Interface for data about a character's status with a given Objective
 * @interface
 */
export interface IDestinyObjectiveProgress {
    objectiveHash: string;
    destinationHash?: string;
    activityHash?: string;
    progress?: number;
    complete: boolean;
}

/**
 * The list of perks to display in an item tooltip - and whether or not they have been activated.
 * @interface
 */
export interface IDestinyPerkReference {
    perkHash: string;
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

/**
 * Interface for the post game carnage report data
 * @interface
 */
export interface IDestinyPostGameCarnageReportData {
    period: Date;
    activityDetails: IDestinyHistoricalStatsActivity;
    entires: IDestinyPostGameCarnageReportEntry[];
    teams: IDestinyPostGameCarnageReportTeamEntry[];
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

export interface IDestinyPostGameCarnageReportExtendedData {
    teamId: number;
    standing: IDestinyHistoricalStatsValue;
    score: IDestinyHistoricalStatsValue;
    teamName: string;
}

export interface IDestinyPostGameCarnageReportTeamEntry {
    weapons: IDestinyHistoricalWeaponStats[];
    values: {
        [key: string]: IDestinyHistoricalStatsValue;
    };
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
    characters?: IDictionaryComponent<IDestinyCharacterComponent>;
    characterInventories?: IDictionaryComponent<IDestinyInventoryComponent>;
    characterProgressions?: IDictionaryComponent<IDestinyCharacterProgressionComponent>;
    characterRenderData?: IDictionaryComponent<IDestinyCharacterRenderComponent>;
    characterActivities?: IDictionaryComponent<IDestinyCharacterActivitiesComponent>;
    characterEquipment?: IDictionaryComponent<IDestinyInventoryComponent>;
    characterKiosks?: IDictionaryComponent<IDestinyKiosksComponent>;
    itemComponents?: object; // TODO: Implement full
}

/**
 * Interface for a single character progress component
 * @interface
 */
export interface IDestinyCharacterProgressionComponent {
    progessions: IDestinyProgression;
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
    progressionHash: string;
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
    milestoneHash: string;
    availableQuests: IDestinyPublicMilestoneQuest[];
    vendorHashes: string[];
    startDate?: Date;
    endDate?: Date;
}

export interface IDestinyPublicMilestoneActivity {
    activitHash: string;
    modifierHashes: string[];
    variants: IDestinyPublicMilestoneActivityVariant[];
}

export interface IDestinyPublicMilestoneActivityVariant {
    activityHash: string;
}

export interface IDestinyPublicMilestoneChallenge {
    objectiveHash: string;
    activityHash?: string;
}

export interface IDestinyPublicMilestoneQuest {
    questItemHash: string;
    activity: IDestinyPublicMilestoneActivity;
    challenges: IDestinyPublicMilestoneChallenge[];
}

/**
 * Interface for data regarding the progress of a Quest for a specific character.
 * @interface
 */
export interface IDestinyQuestStatus {
    questHash: string;
    stepHash: string;
    stepObjectives: IDestinyObjectiveProgress[];
    tracked: boolean;
    itemInstanceId: string;
    completed: boolean;
    redeemed: boolean;
    started: boolean;
    vendorHash?: string;
}

/**
 * Represents a stat on an item *or* Character (NOT a Historical Stat, but a physical attribute stat like Attack, Defense etc...)
 * @interface
 */
export interface IDestinyStat {
    statHash: string;
    value: number;
    maximumValue: number;
}

export interface IDestinyTalentNode {
    nodeIndex: number;
    nodeHash: string;
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
    unlockHash: string;
    isSet: boolean;
}

export interface IDestinyVendorCategoriesComponent {
    categories: IDestinyVendorCategory[];
}

export interface IDestinyVendorCategory {
    categoryIndex: number;
    itemIndexes: number[];
}

export interface IDestinyVendorComponent {
    vendorHash: string;
    ackState: object; // Not used anymore because of that no further definition here
    nextRefreshDate: Date;
    enabled: boolean;
    canPurchase: boolean;
    progression: IDestinyProgression;
}

/**
 * Interface for the a single vendor receipt
 * @interface 
 */
export interface IDestinyVendorReceipt {
    currencyPaid: IDestinyItemQuantity;
    itemReceived: IDestinyItemQuantity;
    licenseUnlockHash: string;
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
    items: object;
}

export interface IDestinyVendorSaleItemComponent {
    vendorItemIndex: number;
    itemHash: string;
    saleStatus: VendorItemStatus;
    costs: IDestinyItemQuantity[];
    requiredUnlocks: string[];
    unlockStatuses: IDestinyUnlockStatus[];
    failureIndexes: number[];
}

/**
 * Interface for an sigle dictionary component
 * @interface
 */
export interface IDictionaryComponent<IComponent> {
    data: {
        [key: string]: IComponent;
    };
    privacy: ComponentPrivacySetting;
}

/**
 * Interface for dye reference
 * @interface
 */
export interface IDyeReference {
    channelHash: string;
    dyeHash: string;
}

/**
 * Interface for the manifest gear asset database definition
 * @interface
 */
export interface IGearAssetDataBaseDefinition {
    version: string;
    path: string;
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
