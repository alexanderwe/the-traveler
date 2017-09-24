import {
    BungieMembershipType,
    ComponentPrivacySetting,
    ComponentType,
    DestinyActivityModeType,
    DestinyGameVersion,
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

// TODO: Implement the different objects
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
    characters?: ;
    characterInventories?: ;
    characterProgressions?: ;
    characterRenderData?: ;
    characterActivities?: ;
    characterEquipment?: ;
    characterKiosks?: ;
    itemComponents?: ;
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
    kioskItems: IDestinyVendorDefinition[];
}

/**
 * Interface for the definition of a vendor
 * @interface
 */
export interface IDestinyVendorDefinition {
    displayProperties: IDestinyVendorDisplayPropertiesDefinition;
    buyString: string;
    sellString: string;
    displayItemHash: string;
    inhibitBuying: boolean;
    factionHash: string;
    resetIntervalMinutes: number;
    resetOffsetMinutes: number;
    failureStrings: string[];
    unlockRanges: IDateRange;
    vendorIdentifier: string;
    vendorPortrait: string;
    vendorBanner: string;
    enabled: boolean;
    visible: boolean;
    vendorCategoryIdentifier: string;
    consolidateCategories: boolean;
    actions: IDestinyVendorActionDefinition;
    categories: IDestinyVendorCategoryEntryDefinition;
    originalCategories: IDestinyVendorCategoryEntryDefinition;
    displayCategroies: IDestinyDisplayCategoryDefinition;
    interactions: // TODO: go on specifying from here
    inventoryFlyouts:
    itemList:
    services:
    acceptedItems:
    hash: string;
    index: string;
    redacted: boolean;
}

/**
 * Display Categories are different from "categories" in that these are specifically for visual grouping and display of categories in Vendor UI.
 * @interface
 */
export interface IDestinyDisplayCategoryDefinition {
    identifier: string;
    displayProperties: IDestinyDisplayPropertiesDefinition;
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
 * If a vendor can ever end up performing actions, these are the properties that will be related to those actions. I'm not going to bother documenting this yet, as it is unused and unclear if it will ever be used... but in case it is ever populated and someone finds it useful, it is defined here.
 * @interface
 */
export interface IDestinyVendorActionDefinition {
    description: string;
    executeSeconds: number;
    icon: string;
    name: string;
    verb: string;
    isPositive: string;
    actionId: string;
    actionHash: string;
    autoPerformAction: boolean;
}
/**
 * Interface for the definition of a display properties of a vendor
 * @interface
 */
export interface IDestinyVendorDisplayPropertiesDefinition extends IDestinyDisplayPropertiesDefinition {
    largeIcon: string;
    subtitle: string;
    requirementsDisplay: IDestinyVendorRequirementDisplayEntryDefinition;
}

/**
 * Interface for the localized properties of the requirementsDisplay, allowing information about the requirement or item being featured to be seen
 * @interface
 */
export interface IDestinyVendorRequirementDisplayEntryDefinition {
    icon: string;
    name: string;
    source: string;
    type: string;
}

/**
 * This is the definition for a single Vendor Category, into which Sale Items are grouped.
 * @interface
 */
export interface IDestinyVendorCategoryEntryDefinition {
    categoryIndex: number;
    categoryId: string;
    categoryHash: string;
    quantityAvailable: number;
    showUnavailableItems: boolean;
    hideIfNoCurrency: boolean;
    hideFromRegularPurchase: boolean;
    buyStringOverride: string;
    disabledDescription: string;
    displayTitle: string;
    overlay: IDestinyVendorCategoryOverlayDefinition;
}

/**
 * The details of an overlay prompt to show to a user. They are all fairly self-explanatory localized strings that can be shown.
 * @interface
 */
export interface IDestinyVendorCategoryOverlayDefinition {
    choiceDescription: string;
    description: string;
    icon: string;
    title: string;
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
