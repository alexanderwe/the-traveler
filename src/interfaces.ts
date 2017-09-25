import {
    BungieMembershipType,
    ComponentPrivacySetting,
    ComponentType,
    DestinyActivityDifficultyTier,
    DestinyActivityModeType,
    DestinyClass,
    DestinyGameVersion,
    DestinyGender,
    DestinyRace,
    DestinyStatsGroupType,
    ItemBindStatus,
    ItemLocation,
    ItemState,
    PeriodType,
    PlatformErrorCodes,
    TransferStatus,
    VendorItemRefundPolicy,
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

export interface IDestinyActivityHistoryResults {
    activities: object[];
}
/**
 * Interface for an character response object
 * @interface
 */
export interface IDestinyCharacterResponse {
    inventory?: ISingleComponentResponseOfDestinyInventoryComponent;
    character?: ISingleComponentResponseOfDestinyCharacterComponent;
    progressions?: ISingleComponentResponseOfDestinyCharacterProgressionComponent;
    renderData?: SingleComponentResponseOfDestinyCharacterRenderComponent;
    activities?: ISingleComponentResponseOfDestinyCharacterActivitiesComponent;
    equipment?: ISingleComponentResponseOfDestinyInventoryComponent;
    kiosks?: ISingleComponentResponseOfDestinyKiosksComponent;
    itemComponents?: IDestinyItemComponentSetOfint64;
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


/**
 * Interface an response object for retrieving an individual instanced item
 * @interface
 */
export interface IDestinyItemResponse {
    characterId?: string;
    item?: ISingleComponentResponseOfDestinyItemComponent;
    instance?: ISingleComponentResponseOfDestinyItemInstanceComponent;
    objectives?: ISingleComponentResponseOfDestinyItemObjectivesComponent;
    perks?: ISingleComponentResponseOfDestinyItemPerksComponent;
    renderData?: ISingleComponentResponseOfDestinyItemRenderComponent;
    stats?: ISingleComponentResponseOfDestinyItemStatsComponent;
    talentGrid?: ISingleComponentResponseOfDestinyItemTalentGridComponent;
    sockets?: ISingleComponentResponseOfDestinyItemSocketsComponent;
}

/**
 * Interface an response containing all of the components for a vendor.
 * @interface
 */
export interface IDestinyVendorResponse {
    vendor?: ISingleComponentResponseOfDestinyVendorComponent;
    categories?: ISingleComponentResponseOfDestinyVendorCategoriesComponent;
    sales?: IDictionaryComponentResponseOfint32AndDestinyVendorSaleItemComponent;
    items: IDestinyItemComponentSetOfint32;
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

/**
 * Interface for defining an object in case of an item set action request to the API
 * @interface
 */
export interface IDestinyItemSetActionRequest {
    itemIds?: string[];
    characterId: string;
    membershipType: BungieMembershipType;
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
 * Interface for the manifest gear asset database definition
 * @interface
 */
export interface IGearAssetDataBaseDefinition {
    version: string;
    path: string;
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

/**
 * Interface for the response of getProfile
 * @interface 
 */
export interface IDestinyProfileResponse {
    vendorReceipts?: ISingleComponentResponseOfDestinyVendorReceiptsComponent;
    profileInventory?: ISingleComponentResponseOfDestinyInventoryComponent;
    profileCurrencies?: ISingleComponentResponseOfDestinyInventoryComponent;
    profile?: ISingleComponentResponseOfDestinyProfileComponent;
    profileKiosks?: ISingleComponentResponseOfDestinyKiosksComponent;
    characters?: IDictionaryComponentResponseOfint64AndDestinyCharacterComponent;
    characterInventories?: IDictionaryComponentResponseOfint64AndDestinyInventoryComponent;
    characterProgressions?: IDictionaryComponentResponseOfint64AndDestinyCharacterProgressionComponent;
    characterRenderData?: IDictionaryComponentResponseOfint64AndDestinyCharacterRenderComponent;
    characterActivities?: IDictionaryComponentResponseOfint64AndDestinyCharacterActivitiesComponent;
    characterEquipment?: IDictionaryComponentResponseOfint64AndDestinyInventoryComponent;
    characterKiosks?: IDictionaryComponentResponseOfint64AndDestinyKiosksComponent;
    itemComponents?: IDestinyItemComponentSetOfint64;
}

// TODO: Implement full
/**
 * Interface for an object containing information about instanced items across all returned characters.
 * @interface
 */
export interface IDestinyItemComponentSetOfint64 {
    instances: object;
    perks: object;
    objectives: object;
    renderData: object;
    stats: object;
    sockets: object;
    talentGrids: object;
    plugStates: object;
}

/**
 * Interface for an response of Destiny 2 kiosks component
 * @interface
 */
export interface IDictionaryComponentResponseOfint64AndDestinyKiosksComponent {
    data: IDestinyKiosksComponent;
    pricavy: ComponentPrivacySetting;
}

/**
 * Interface for an response of an characters activities component
 * @interface
 */
export interface IDictionaryComponentResponseOfint64AndDestinyCharacterActivitiesComponent {
    data: IDestinyCharacterActivitiesComponent;
    privacy: ComponentPrivacySetting;
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

/**
 * Interface for an response of an character render data component
 * @interface
 */
export interface IDictionaryComponentResponseOfint64AndDestinyCharacterRenderComponent {
    data: IDestinyCharacterRenderComponent;
    privacy: ComponentPrivacySetting;
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
 * Interface for a minimal view of a character's equipped items
 * @interface
 */
export interface IDestinyCharacterPeerView {
    equipment: IDestinyItemPeerView[];
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
 * Interface for dye reference
 * @interface
 */
export interface IDyeReference {
    channelHash: string;
    dyeHash: string;
}

/**
 * Interface for an response of an inventory component
 * @interface
 */
export interface IDictionaryComponentResponseOfint64AndDestinyInventoryComponent {
    data: IDestinyInventoryComponent;
    privacy: ComponentPrivacySetting;
}

/**
 * Interface for an response of an character progress component
 * @interface
 */
export interface IDictionaryComponentResponseOfint64AndDestinyCharacterProgressionComponent {
    data: {
        [key: string]: IDestinyCharacterProgressionComponent;
    };
    privacy: ComponentPrivacySetting;
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
 * Interface an milestone activity
 * @interface
 */
export interface IDestinyMilestoneActivity {
    activityHash: string;
    modifierHash: string[];
    variants: IDestinyMilestoneActivityVariant[];

}

/**
 * Interface an milestone activity variant
 * @interface
 */
export interface IDestinyMilestoneActivityVariant {
    activityHash: string;
    completionStatus?: IDestinyMilestoneActivityCompletionStatus;

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
 * Interface for an response of an destiny character
 * @interface
 */
export interface IDictionaryComponentResponseOfint64AndDestinyCharacterComponent {
    data: IDestinyCharacterComponent;
    privacy: ComponentPrivacySetting;
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
 * Mostly for historical purposes, we segregate Faction progressions from other progressions
 * @interface
 */
export interface IDestinyFactionProgression extends IDestinyProgression {
    factionHash: string;
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

/**
 * Interface for an item stack and its quantity
 * @interface
 */
export interface IDestinyItemQuantity {
    itemHash: string;
    itemInstanceId: string;
    quantity: number;
}

/**
 * Interface for the vendor receipts component
 * @interface 
 */
export interface IDestinyVendorReceiptsComponent {
    receipts: IDestinyVendorReceipt[];
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
 * Interface for a signle component response of an inventory
 * @interface
 */
export interface ISingleComponentResponseOfDestinyInventoryComponent {
    data: IDestinyInventoryComponent;
    privacy: ComponentPrivacySetting;
}

/**
 * Interface for  minimal information for items in an inventory:
 * @interface
 */
export interface IDestinyInventoryComponent {
    items: IDestinyItemComponent[];
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
 * Interface for a signle component response of destiny vendor receipts
 * @interface
 */
export interface ISingleComponentResponseOfDestinyVendorReceiptsComponent {
    data: IDestinyVendorReceiptsComponent;
    privacy: ComponentPrivacySetting;
}

/**
 * Interface for a signle component response of a destiny profile
 * @interface
 */
export interface ISingleComponentResponseOfDestinyProfileComponent {
    data: IDestinyProfileComponent;
    privacy: ComponentPrivacySetting;
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
 * Interface for a single component response of a destiny kiosk
 * @interface
 */
export interface ISingleComponentResponseOfDestinyKiosksComponent {
    data: IDestinyKiosksComponent;
    privacy: ComponentPrivacySetting;
}

/**
 * Interface for a destiny kiosk (vendor)
 * @interface
 */
export interface IDestinyKiosksComponent {
    kioskItems: number[];
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

export interface IDateRange {
    start: Date;
    end: Date;
}
