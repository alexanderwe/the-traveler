"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum for the Bungie membership type
 * @enum
 */
var BungieMembershipType;
(function (BungieMembershipType) {
    BungieMembershipType[BungieMembershipType["All"] = -1] = "All";
    BungieMembershipType[BungieMembershipType["Xbox"] = 1] = "Xbox";
    BungieMembershipType[BungieMembershipType["PSN"] = 2] = "PSN";
    BungieMembershipType[BungieMembershipType["PC"] = 4] = "PC";
    BungieMembershipType[BungieMembershipType["Bungie"] = 254] = "Bungie";
})(BungieMembershipType = exports.BungieMembershipType || (exports.BungieMembershipType = {}));
/**
 * Enum for Desinty component type
 * @enum
 */
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["None"] = 0] = "None";
    ComponentType[ComponentType["Profiles"] = 100] = "Profiles";
    ComponentType[ComponentType["VendorReceipts"] = 101] = "VendorReceipts";
    ComponentType[ComponentType["ProfileInventories"] = 102] = "ProfileInventories";
    ComponentType[ComponentType["ProfileCurrencies"] = 103] = "ProfileCurrencies";
    ComponentType[ComponentType["Characters"] = 200] = "Characters";
    ComponentType[ComponentType["CharacterInventories"] = 201] = "CharacterInventories";
    ComponentType[ComponentType["CharacterProgressions"] = 202] = "CharacterProgressions";
    ComponentType[ComponentType["CharacterRenderData"] = 203] = "CharacterRenderData";
    ComponentType[ComponentType["CharacterActivities"] = 204] = "CharacterActivities";
    ComponentType[ComponentType["CharacterEquipment"] = 205] = "CharacterEquipment";
    ComponentType[ComponentType["ItemInstances"] = 300] = "ItemInstances";
    ComponentType[ComponentType["ItemObjectives"] = 301] = "ItemObjectives";
    ComponentType[ComponentType["ItemPerks"] = 302] = "ItemPerks";
    ComponentType[ComponentType["ItemRenderData"] = 303] = "ItemRenderData";
    ComponentType[ComponentType["ItemStats"] = 304] = "ItemStats";
    ComponentType[ComponentType["ItemSockets"] = 305] = "ItemSockets";
    ComponentType[ComponentType["ItemTalentGrids"] = 306] = "ItemTalentGrids";
    ComponentType[ComponentType["ItemCommonData"] = 307] = "ItemCommonData";
    ComponentType[ComponentType["ItemPlugStates"] = 308] = "ItemPlugStates";
    ComponentType[ComponentType["Vendors"] = 400] = "Vendors";
    ComponentType[ComponentType["VendorCategories"] = 401] = "VendorCategories";
    ComponentType[ComponentType["VendorSales"] = 402] = "VendorSales";
    ComponentType[ComponentType["Kiosks"] = 500] = "Kiosks";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
/**
 * Enum for component privacy
 * @enum
 */
var ComponentPrivacySetting;
(function (ComponentPrivacySetting) {
    ComponentPrivacySetting[ComponentPrivacySetting["None"] = 0] = "None";
    ComponentPrivacySetting[ComponentPrivacySetting["Public"] = 1] = "Public";
    ComponentPrivacySetting[ComponentPrivacySetting["Private"] = 2] = "Private";
})(ComponentPrivacySetting = exports.ComponentPrivacySetting || (exports.ComponentPrivacySetting = {}));
/**
 * Enum for the damage type of items
 * @enum
 */
var DamageType;
(function (DamageType) {
    DamageType[DamageType["None"] = 0] = "None";
    DamageType[DamageType["Kinetic"] = 1] = "Kinetic";
    DamageType[DamageType["Arc"] = 2] = "Arc";
    DamageType[DamageType["Thermal"] = 3] = "Thermal";
    DamageType[DamageType["Void"] = 4] = "Void";
    DamageType[DamageType["Raid"] = 5] = "Raid";
})(DamageType = exports.DamageType || (exports.DamageType = {}));
/**
 * Enum for Destiny acitivity difficulty
 * @enum
 */
var DestinyActivityDifficultyTier;
(function (DestinyActivityDifficultyTier) {
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Trivial"] = 0] = "Trivial";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Easy"] = 1] = "Easy";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Normal"] = 2] = "Normal";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Challenging"] = 3] = "Challenging";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Hard"] = 4] = "Hard";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Brave"] = 5] = "Brave";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["AlmostImpossible"] = 6] = "AlmostImpossible";
    DestinyActivityDifficultyTier[DestinyActivityDifficultyTier["Impossible"] = 7] = "Impossible";
})(DestinyActivityDifficultyTier = exports.DestinyActivityDifficultyTier || (exports.DestinyActivityDifficultyTier = {}));
/**
 * Enum for Destiny acitivity mode type
 * @enum
 */
var DestinyActivityModeType;
(function (DestinyActivityModeType) {
    DestinyActivityModeType[DestinyActivityModeType["None"] = 0] = "None";
    DestinyActivityModeType[DestinyActivityModeType["Story"] = 2] = "Story";
    DestinyActivityModeType[DestinyActivityModeType["Strike"] = 3] = "Strike";
    DestinyActivityModeType[DestinyActivityModeType["Raid"] = 4] = "Raid";
    DestinyActivityModeType[DestinyActivityModeType["AllPvP"] = 5] = "AllPvP";
    DestinyActivityModeType[DestinyActivityModeType["Patrol"] = 6] = "Patrol";
    DestinyActivityModeType[DestinyActivityModeType["AllPvE"] = 7] = "AllPvE";
    DestinyActivityModeType[DestinyActivityModeType["Reserved9"] = 9] = "Reserved9";
    DestinyActivityModeType[DestinyActivityModeType["Control"] = 10] = "Control";
    DestinyActivityModeType[DestinyActivityModeType["Reserved11"] = 11] = "Reserved11";
    DestinyActivityModeType[DestinyActivityModeType["Clash"] = 12] = "Clash";
    DestinyActivityModeType[DestinyActivityModeType["Reserved13"] = 13] = "Reserved13";
    DestinyActivityModeType[DestinyActivityModeType["Reserved15"] = 15] = "Reserved15";
    DestinyActivityModeType[DestinyActivityModeType["Nightfall"] = 16] = "Nightfall";
    DestinyActivityModeType[DestinyActivityModeType["HeroicNightfall"] = 17] = "HeroicNightfall";
    DestinyActivityModeType[DestinyActivityModeType["AllStrikes"] = 18] = "AllStrikes";
    DestinyActivityModeType[DestinyActivityModeType["IronBanner"] = 19] = "IronBanner";
    DestinyActivityModeType[DestinyActivityModeType["Reserved20"] = 20] = "Reserved20";
    DestinyActivityModeType[DestinyActivityModeType["Reserved21"] = 21] = "Reserved21";
    DestinyActivityModeType[DestinyActivityModeType["Reserved22"] = 22] = "Reserved22";
    DestinyActivityModeType[DestinyActivityModeType["Reserved24"] = 24] = "Reserved24";
    DestinyActivityModeType[DestinyActivityModeType["Reserved25"] = 25] = "Reserved25";
    DestinyActivityModeType[DestinyActivityModeType["Reserved26"] = 26] = "Reserved26";
    DestinyActivityModeType[DestinyActivityModeType["Reserved27"] = 27] = "Reserved27";
    DestinyActivityModeType[DestinyActivityModeType["Reserved28"] = 28] = "Reserved28";
    DestinyActivityModeType[DestinyActivityModeType["Reserved29"] = 29] = "Reserved29";
    DestinyActivityModeType[DestinyActivityModeType["Reserved30"] = 30] = "Reserved30";
    DestinyActivityModeType[DestinyActivityModeType["Supremacy"] = 31] = "Supremacy";
    DestinyActivityModeType[DestinyActivityModeType["Reserved32"] = 32] = "Reserved32";
    DestinyActivityModeType[DestinyActivityModeType["Survival"] = 37] = "Survival";
    DestinyActivityModeType[DestinyActivityModeType["Countdown"] = 38] = "Countdown";
    DestinyActivityModeType[DestinyActivityModeType["TrialsOfTheNine"] = 39] = "TrialsOfTheNine";
    DestinyActivityModeType[DestinyActivityModeType["Social"] = 40] = "Social";
})(DestinyActivityModeType = exports.DestinyActivityModeType || (exports.DestinyActivityModeType = {}));
/**
 * Enum for classes in Destiny 2
 * @enum
 */
var DestinyClass;
(function (DestinyClass) {
    DestinyClass[DestinyClass["Titan"] = 0] = "Titan";
    DestinyClass[DestinyClass["Hunter"] = 1] = "Hunter";
    DestinyClass[DestinyClass["Warlock"] = 2] = "Warlock";
    DestinyClass[DestinyClass["Unknown"] = 3] = "Unknown";
})(DestinyClass = exports.DestinyClass || (exports.DestinyClass = {}));
/**
 * A flags enumeration indicating the versions of the game that a given user has purchased.
 * @enum
 */
var DestinyGameVersion;
(function (DestinyGameVersion) {
    DestinyGameVersion[DestinyGameVersion["None"] = 0] = "None";
    DestinyGameVersion[DestinyGameVersion["Destiny2"] = 1] = "Destiny2";
})(DestinyGameVersion = exports.DestinyGameVersion || (exports.DestinyGameVersion = {}));
/**
 * Enum for genders in Destiny 2
 * @enum
 */
var DestinyGender;
(function (DestinyGender) {
    DestinyGender[DestinyGender["Male"] = 0] = "Male";
    DestinyGender[DestinyGender["Female"] = 1] = "Female";
    DestinyGender[DestinyGender["Unknown"] = 2] = "Unknown";
})(DestinyGender = exports.DestinyGender || (exports.DestinyGender = {}));
/**
 * Enum for races in Destiny
 * @enum
 */
var DestinyRace;
(function (DestinyRace) {
    DestinyRace[DestinyRace["Human"] = 0] = "Human";
    DestinyRace[DestinyRace["Awoken"] = 1] = "Awoken";
    DestinyRace[DestinyRace["Exo"] = 2] = "Exo";
    DestinyRace[DestinyRace["Unknown"] = 3] = "Unknown";
})(DestinyRace = exports.DestinyRace || (exports.DestinyRace = {}));
/**
 * Enum for Destiny stats group type
 * @enum
 */
var DestinyStatsGroupType;
(function (DestinyStatsGroupType) {
    DestinyStatsGroupType[DestinyStatsGroupType["None"] = 0] = "None";
    DestinyStatsGroupType[DestinyStatsGroupType["General"] = 1] = "General";
    DestinyStatsGroupType[DestinyStatsGroupType["Weapons"] = 2] = "Weapons";
    DestinyStatsGroupType[DestinyStatsGroupType["Medals"] = 3] = "Medals";
    DestinyStatsGroupType[DestinyStatsGroupType["ReservedGroups"] = 100] = "ReservedGroups";
    DestinyStatsGroupType[DestinyStatsGroupType["Leadboards"] = 101] = "Leadboards";
    DestinyStatsGroupType[DestinyStatsGroupType["Activity"] = 102] = "Activity";
    DestinyStatsGroupType[DestinyStatsGroupType["UniqueWeapon"] = 103] = "UniqueWeapon";
    DestinyStatsGroupType[DestinyStatsGroupType["Internal"] = 104] = "Internal";
})(DestinyStatsGroupType = exports.DestinyStatsGroupType || (exports.DestinyStatsGroupType = {}));
/**
 * Enum for Destiny talent node states
 * @enum
 */
var DestinyTalentNodeState;
(function (DestinyTalentNodeState) {
    DestinyTalentNodeState[DestinyTalentNodeState["Invalid"] = 0] = "Invalid";
    DestinyTalentNodeState[DestinyTalentNodeState["CanUpgrade"] = 1] = "CanUpgrade";
    DestinyTalentNodeState[DestinyTalentNodeState["NoPoints"] = 2] = "NoPoints";
    DestinyTalentNodeState[DestinyTalentNodeState["NoPrerequisites"] = 3] = "NoPrerequisites";
    DestinyTalentNodeState[DestinyTalentNodeState["NoSteps"] = 4] = "NoSteps";
    DestinyTalentNodeState[DestinyTalentNodeState["NoUnlock"] = 5] = "NoUnlock";
    DestinyTalentNodeState[DestinyTalentNodeState["NoMaterial"] = 6] = "NoMaterial";
    DestinyTalentNodeState[DestinyTalentNodeState["NoGridLevel"] = 7] = "NoGridLevel";
    DestinyTalentNodeState[DestinyTalentNodeState["SwappingLocked"] = 8] = "SwappingLocked";
    DestinyTalentNodeState[DestinyTalentNodeState["MustSwap"] = 9] = "MustSwap";
    DestinyTalentNodeState[DestinyTalentNodeState["Complete"] = 10] = "Complete";
    DestinyTalentNodeState[DestinyTalentNodeState["Unknown"] = 11] = "Unknown";
    DestinyTalentNodeState[DestinyTalentNodeState["CreationOnly"] = 12] = "CreationOnly";
    DestinyTalentNodeState[DestinyTalentNodeState["Hidden"] = 13] = "Hidden";
})(DestinyTalentNodeState = exports.DestinyTalentNodeState || (exports.DestinyTalentNodeState = {}));
/**
 * The reasons why an item cannot be equipped, if any. Many flags can be set, or "None" if
 * @enum
 */
var EquipFailureReason;
(function (EquipFailureReason) {
    EquipFailureReason[EquipFailureReason["None"] = 0] = "None";
    EquipFailureReason[EquipFailureReason["ItemUnequippable"] = 1] = "ItemUnequippable";
    EquipFailureReason[EquipFailureReason["temUniqueEquipRestricted"] = 2] = "temUniqueEquipRestricted";
    EquipFailureReason[EquipFailureReason["ItemFailedUnlockCheck"] = 4] = "ItemFailedUnlockCheck";
    EquipFailureReason[EquipFailureReason["ItemFailedLevelCheck"] = 8] = "ItemFailedLevelCheck";
    EquipFailureReason[EquipFailureReason["ItemNotOnCharacter"] = 16] = "ItemNotOnCharacter";
})(EquipFailureReason = exports.EquipFailureReason || (exports.EquipFailureReason = {}));
/**
 * Enum for the item bind status
 * @enum
 */
var ItemBindStatus;
(function (ItemBindStatus) {
    ItemBindStatus[ItemBindStatus["NotBound"] = 0] = "NotBound";
    ItemBindStatus[ItemBindStatus["BoundToCharacter"] = 1] = "BoundToCharacter";
    ItemBindStatus[ItemBindStatus["BoundToAccount"] = 2] = "BoundToAccount";
    ItemBindStatus[ItemBindStatus["BoundToGuild"] = 3] = "BoundToGuild";
})(ItemBindStatus = exports.ItemBindStatus || (exports.ItemBindStatus = {}));
/**
 * Enum for the item location
 * @enum
 */
var ItemLocation;
(function (ItemLocation) {
    ItemLocation[ItemLocation["Unknown"] = 0] = "Unknown";
    ItemLocation[ItemLocation["Inventory"] = 1] = "Inventory";
    ItemLocation[ItemLocation["Vault"] = 2] = "Vault";
    ItemLocation[ItemLocation["Vendor"] = 3] = "Vendor";
    ItemLocation[ItemLocation["Postmaster"] = 4] = "Postmaster";
})(ItemLocation = exports.ItemLocation || (exports.ItemLocation = {}));
/**
 * Enum for the item state
 * @enum
 */
var ItemState;
(function (ItemState) {
    ItemState[ItemState["None"] = 0] = "None";
    ItemState[ItemState["Locked"] = 1] = "Locked";
    ItemState[ItemState["Tracked"] = 2] = "Tracked";
})(ItemState = exports.ItemState || (exports.ItemState = {}));
/**
 * Enum for Destiny period type
 * @enum
 */
var PeriodType;
(function (PeriodType) {
    PeriodType[PeriodType["None"] = 0] = "None";
    PeriodType[PeriodType["Daily"] = 1] = "Daily";
    PeriodType[PeriodType["AllTime"] = 2] = "AllTime";
    PeriodType[PeriodType["Activity"] = 3] = "Activity";
})(PeriodType = exports.PeriodType || (exports.PeriodType = {}));
/**
 * Enum for the possible error codes
 * @enum
 */
var PlatformErrorCodes;
(function (PlatformErrorCodes) {
    PlatformErrorCodes[PlatformErrorCodes["None"] = 0] = "None";
    PlatformErrorCodes[PlatformErrorCodes["Success"] = 1] = "Success";
    PlatformErrorCodes[PlatformErrorCodes["TransportException"] = 2] = "TransportException";
    PlatformErrorCodes[PlatformErrorCodes["UnhandledException"] = 3] = "UnhandledException";
    PlatformErrorCodes[PlatformErrorCodes["NotImplemented"] = 4] = "NotImplemented";
    PlatformErrorCodes[PlatformErrorCodes["SystemDisabled"] = 5] = "SystemDisabled";
    PlatformErrorCodes[PlatformErrorCodes["FailedToLoadAvailableLocalesConfiguration"] = 6] = "FailedToLoadAvailableLocalesConfiguration";
    PlatformErrorCodes[PlatformErrorCodes["ParameterParseFailure"] = 7] = "ParameterParseFailure";
    PlatformErrorCodes[PlatformErrorCodes["ParameterInvalidRange"] = 8] = "ParameterInvalidRange";
    PlatformErrorCodes[PlatformErrorCodes["BadRequest"] = 9] = "BadRequest";
    PlatformErrorCodes[PlatformErrorCodes["AuthenticationInvalid"] = 10] = "AuthenticationInvalid";
    PlatformErrorCodes[PlatformErrorCodes["DataNotFound"] = 11] = "DataNotFound";
    PlatformErrorCodes[PlatformErrorCodes["InsufficientPrivileges"] = 12] = "InsufficientPrivileges";
    PlatformErrorCodes[PlatformErrorCodes["Duplicate"] = 13] = "Duplicate";
    PlatformErrorCodes[PlatformErrorCodes["UnknownSqlResult"] = 14] = "UnknownSqlResult";
    PlatformErrorCodes[PlatformErrorCodes["ValidationError"] = 15] = "ValidationError";
    PlatformErrorCodes[PlatformErrorCodes["ValidationMissingFieldError"] = 16] = "ValidationMissingFieldError";
    PlatformErrorCodes[PlatformErrorCodes["ValidationInvalidInputError"] = 17] = "ValidationInvalidInputError";
    PlatformErrorCodes[PlatformErrorCodes["InvalidParameters"] = 18] = "InvalidParameters";
    PlatformErrorCodes[PlatformErrorCodes["ParameterNotFound"] = 19] = "ParameterNotFound";
    PlatformErrorCodes[PlatformErrorCodes["UnhandledHttpException"] = 20] = "UnhandledHttpException";
    PlatformErrorCodes[PlatformErrorCodes["NotFound"] = 21] = "NotFound";
    PlatformErrorCodes[PlatformErrorCodes["WebAuthModuleAsyncFailed"] = 22] = "WebAuthModuleAsyncFailed";
    PlatformErrorCodes[PlatformErrorCodes["InvalidReturnValue"] = 23] = "InvalidReturnValue";
    PlatformErrorCodes[PlatformErrorCodes["UserBanned"] = 24] = "UserBanned";
    PlatformErrorCodes[PlatformErrorCodes["InvalidPostBody"] = 25] = "InvalidPostBody";
    PlatformErrorCodes[PlatformErrorCodes["MissingPostBody"] = 26] = "MissingPostBody";
    PlatformErrorCodes[PlatformErrorCodes["ExternalServiceTimeout"] = 27] = "ExternalServiceTimeout";
    PlatformErrorCodes[PlatformErrorCodes["ValidationLengthError"] = 28] = "ValidationLengthError";
    PlatformErrorCodes[PlatformErrorCodes["ValidationRangeError"] = 29] = "ValidationRangeError";
    PlatformErrorCodes[PlatformErrorCodes["JsonDeserializationError"] = 30] = "JsonDeserializationError";
    PlatformErrorCodes[PlatformErrorCodes["ThrottleLimitExceeded"] = 31] = "ThrottleLimitExceeded";
    PlatformErrorCodes[PlatformErrorCodes["ValidationTagError"] = 32] = "ValidationTagError";
    PlatformErrorCodes[PlatformErrorCodes["ValidationProfanityError"] = 33] = "ValidationProfanityError";
    PlatformErrorCodes[PlatformErrorCodes["ValidationUrlFormatError"] = 34] = "ValidationUrlFormatError";
    PlatformErrorCodes[PlatformErrorCodes["ThrottleLimitExceededMinutes"] = 35] = "ThrottleLimitExceededMinutes";
    PlatformErrorCodes[PlatformErrorCodes["ThrottleLimitExceededMomentarily"] = 36] = "ThrottleLimitExceededMomentarily";
    PlatformErrorCodes[PlatformErrorCodes["ThrottleLimitExceededSeconds"] = 37] = "ThrottleLimitExceededSeconds";
    PlatformErrorCodes[PlatformErrorCodes["ExternalServiceUnknown"] = 38] = "ExternalServiceUnknown";
    PlatformErrorCodes[PlatformErrorCodes["ValidationWordLengthError"] = 39] = "ValidationWordLengthError";
    PlatformErrorCodes[PlatformErrorCodes["ValidationInvisibleUnicode"] = 40] = "ValidationInvisibleUnicode";
    PlatformErrorCodes[PlatformErrorCodes["ValidationBadNames"] = 41] = "ValidationBadNames";
    PlatformErrorCodes[PlatformErrorCodes["ExternalServiceFailed"] = 42] = "ExternalServiceFailed";
    PlatformErrorCodes[PlatformErrorCodes["ServiceRetired"] = 43] = "ServiceRetired";
    PlatformErrorCodes[PlatformErrorCodes["UnknownSqlException"] = 44] = "UnknownSqlException";
    PlatformErrorCodes[PlatformErrorCodes["UnsupportedLocale"] = 45] = "UnsupportedLocale";
    PlatformErrorCodes[PlatformErrorCodes["InvalidPageNumber"] = 46] = "InvalidPageNumber";
    PlatformErrorCodes[PlatformErrorCodes["MaximumPageSizeExceeded"] = 47] = "MaximumPageSizeExceeded";
    PlatformErrorCodes[PlatformErrorCodes["ServiceUnsupported"] = 48] = "ServiceUnsupported";
    PlatformErrorCodes[PlatformErrorCodes["ValidationMaximumUnicodeCombiningCharacters"] = 49] = "ValidationMaximumUnicodeCombiningCharacters";
    PlatformErrorCodes[PlatformErrorCodes["ValidationMaximumSequentialCarriageReturns"] = 50] = "ValidationMaximumSequentialCarriageReturns";
    PlatformErrorCodes[PlatformErrorCodes["PerEndpointRequestThrottleExceeded"] = 51] = "PerEndpointRequestThrottleExceeded";
    PlatformErrorCodes[PlatformErrorCodes["AuthContextCacheAssertion"] = 52] = "AuthContextCacheAssertion";
    PlatformErrorCodes[PlatformErrorCodes["ObsoleteCredentialType"] = 89] = "ObsoleteCredentialType";
    PlatformErrorCodes[PlatformErrorCodes["UnableToUnPairMobileApp"] = 90] = "UnableToUnPairMobileApp";
    PlatformErrorCodes[PlatformErrorCodes["UnableToPairMobileApp"] = 91] = "UnableToPairMobileApp";
    PlatformErrorCodes[PlatformErrorCodes["CannotUseMobileAuthWithNonMobileProvider"] = 92] = "CannotUseMobileAuthWithNonMobileProvider";
    PlatformErrorCodes[PlatformErrorCodes["MissingDeviceCookie"] = 93] = "MissingDeviceCookie";
    PlatformErrorCodes[PlatformErrorCodes["FacebookTokenExpired"] = 94] = "FacebookTokenExpired";
    PlatformErrorCodes[PlatformErrorCodes["AuthTicketRequired"] = 95] = "AuthTicketRequired";
    PlatformErrorCodes[PlatformErrorCodes["CookieContextRequired"] = 96] = "CookieContextRequired";
    PlatformErrorCodes[PlatformErrorCodes["UnknownAuthenticationError"] = 97] = "UnknownAuthenticationError";
    PlatformErrorCodes[PlatformErrorCodes["BungieNetAccountCreationRequired"] = 98] = "BungieNetAccountCreationRequired";
    PlatformErrorCodes[PlatformErrorCodes["WebAuthRequired"] = 99] = "WebAuthRequired";
    PlatformErrorCodes[PlatformErrorCodes["ContentUnknownSqlResult"] = 100] = "ContentUnknownSqlResult";
    PlatformErrorCodes[PlatformErrorCodes["ContentNeedUniquePath"] = 101] = "ContentNeedUniquePath";
    PlatformErrorCodes[PlatformErrorCodes["ContentSqlException"] = 102] = "ContentSqlException";
    PlatformErrorCodes[PlatformErrorCodes["ContentNotFound"] = 103] = "ContentNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentSuccessWithTagAddFail"] = 104] = "ContentSuccessWithTagAddFail";
    PlatformErrorCodes[PlatformErrorCodes["ContentSearchMissingParameters"] = 105] = "ContentSearchMissingParameters";
    PlatformErrorCodes[PlatformErrorCodes["ContentInvalidId"] = 106] = "ContentInvalidId";
    PlatformErrorCodes[PlatformErrorCodes["ContentPhysicalFileDeletionError"] = 107] = "ContentPhysicalFileDeletionError";
    PlatformErrorCodes[PlatformErrorCodes["ContentPhysicalFileCreationError"] = 108] = "ContentPhysicalFileCreationError";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceSubmissionError"] = 109] = "ContentPerforceSubmissionError";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceInitializationError"] = 110] = "ContentPerforceInitializationError";
    PlatformErrorCodes[PlatformErrorCodes["ContentDeploymentPackageNotReadyError"] = 111] = "ContentDeploymentPackageNotReadyError";
    PlatformErrorCodes[PlatformErrorCodes["ContentUploadFailed"] = 112] = "ContentUploadFailed";
    PlatformErrorCodes[PlatformErrorCodes["ContentTooManyResults"] = 113] = "ContentTooManyResults";
    PlatformErrorCodes[PlatformErrorCodes["ContentInvalidState"] = 115] = "ContentInvalidState";
    PlatformErrorCodes[PlatformErrorCodes["ContentNavigationParentNotFound"] = 116] = "ContentNavigationParentNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentNavigationParentUpdateError"] = 117] = "ContentNavigationParentUpdateError";
    PlatformErrorCodes[PlatformErrorCodes["DeploymentPackageNotEditable"] = 118] = "DeploymentPackageNotEditable";
    PlatformErrorCodes[PlatformErrorCodes["ContentValidationError"] = 119] = "ContentValidationError";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertiesValidationError"] = 120] = "ContentPropertiesValidationError";
    PlatformErrorCodes[PlatformErrorCodes["ContentTypeNotFound"] = 121] = "ContentTypeNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DeploymentPackageNotFound"] = 122] = "DeploymentPackageNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentSearchInvalidParameters"] = 123] = "ContentSearchInvalidParameters";
    PlatformErrorCodes[PlatformErrorCodes["ContentItemPropertyAggregationError"] = 124] = "ContentItemPropertyAggregationError";
    PlatformErrorCodes[PlatformErrorCodes["DeploymentPackageFileNotFound"] = 125] = "DeploymentPackageFileNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceFileHistoryNotFound"] = 126] = "ContentPerforceFileHistoryNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentAssetZipCreationFailure"] = 127] = "ContentAssetZipCreationFailure";
    PlatformErrorCodes[PlatformErrorCodes["ContentAssetZipCreationBusy"] = 128] = "ContentAssetZipCreationBusy";
    PlatformErrorCodes[PlatformErrorCodes["ContentProjectNotFound"] = 129] = "ContentProjectNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentFolderNotFound"] = 130] = "ContentFolderNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentPackagesInconsistent"] = 131] = "ContentPackagesInconsistent";
    PlatformErrorCodes[PlatformErrorCodes["ContentPackagesInvalidState"] = 132] = "ContentPackagesInvalidState";
    PlatformErrorCodes[PlatformErrorCodes["ContentPackagesInconsistentType"] = 133] = "ContentPackagesInconsistentType";
    PlatformErrorCodes[PlatformErrorCodes["ContentCannotDeletePackage"] = 134] = "ContentCannotDeletePackage";
    PlatformErrorCodes[PlatformErrorCodes["ContentLockedForChanges"] = 135] = "ContentLockedForChanges";
    PlatformErrorCodes[PlatformErrorCodes["ContentFileUploadFailed"] = 136] = "ContentFileUploadFailed";
    PlatformErrorCodes[PlatformErrorCodes["ContentNotReviewed"] = 137] = "ContentNotReviewed";
    PlatformErrorCodes[PlatformErrorCodes["ContentPermissionDenied"] = 138] = "ContentPermissionDenied";
    PlatformErrorCodes[PlatformErrorCodes["ContentInvalidExternalUrl"] = 139] = "ContentInvalidExternalUrl";
    PlatformErrorCodes[PlatformErrorCodes["ContentExternalFileCannotBeImportedLocally"] = 140] = "ContentExternalFileCannotBeImportedLocally";
    PlatformErrorCodes[PlatformErrorCodes["ContentTagSaveFailure"] = 141] = "ContentTagSaveFailure";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceUnmatchedFileError"] = 142] = "ContentPerforceUnmatchedFileError";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceChangelistResultNotFound"] = 143] = "ContentPerforceChangelistResultNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceChangelistFileItemsNotFound"] = 144] = "ContentPerforceChangelistFileItemsNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentPerforceInvalidRevisionError"] = 145] = "ContentPerforceInvalidRevisionError";
    PlatformErrorCodes[PlatformErrorCodes["ContentUnloadedSaveResult"] = 146] = "ContentUnloadedSaveResult";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyInvalidNumber"] = 147] = "ContentPropertyInvalidNumber";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyInvalidUrl"] = 148] = "ContentPropertyInvalidUrl";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyInvalidDate"] = 149] = "ContentPropertyInvalidDate";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyInvalidSet"] = 150] = "ContentPropertyInvalidSet";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyCannotDeserialize"] = 151] = "ContentPropertyCannotDeserialize";
    PlatformErrorCodes[PlatformErrorCodes["ContentRegexValidationFailOnProperty"] = 152] = "ContentRegexValidationFailOnProperty";
    PlatformErrorCodes[PlatformErrorCodes["ContentMaxLengthFailOnProperty"] = 153] = "ContentMaxLengthFailOnProperty";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyUnexpectedDeserializationError"] = 154] = "ContentPropertyUnexpectedDeserializationError";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyRequired"] = 155] = "ContentPropertyRequired";
    PlatformErrorCodes[PlatformErrorCodes["ContentCannotCreateFile"] = 156] = "ContentCannotCreateFile";
    PlatformErrorCodes[PlatformErrorCodes["ContentInvalidMigrationFile"] = 157] = "ContentInvalidMigrationFile";
    PlatformErrorCodes[PlatformErrorCodes["ContentMigrationAlteringProcessedItem"] = 158] = "ContentMigrationAlteringProcessedItem";
    PlatformErrorCodes[PlatformErrorCodes["ContentPropertyDefinitionNotFound"] = 159] = "ContentPropertyDefinitionNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentReviewDataChanged"] = 160] = "ContentReviewDataChanged";
    PlatformErrorCodes[PlatformErrorCodes["ContentRollbackRevisionNotInPackage"] = 161] = "ContentRollbackRevisionNotInPackage";
    PlatformErrorCodes[PlatformErrorCodes["ContentItemNotBasedOnLatestRevision"] = 162] = "ContentItemNotBasedOnLatestRevision";
    PlatformErrorCodes[PlatformErrorCodes["ContentUnauthorized"] = 163] = "ContentUnauthorized";
    PlatformErrorCodes[PlatformErrorCodes["ContentCannotCreateDeploymentPackage"] = 164] = "ContentCannotCreateDeploymentPackage";
    PlatformErrorCodes[PlatformErrorCodes["ContentUserNotFound"] = 165] = "ContentUserNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ContentLocalePermissionDenied"] = 166] = "ContentLocalePermissionDenied";
    PlatformErrorCodes[PlatformErrorCodes["ContentInvalidLinkToInternalEnvironment"] = 167] = "ContentInvalidLinkToInternalEnvironment";
    PlatformErrorCodes[PlatformErrorCodes["ContentInvalidBlacklistedContent"] = 168] = "ContentInvalidBlacklistedContent";
    PlatformErrorCodes[PlatformErrorCodes["ContentMacroMalformedNoContentId"] = 169] = "ContentMacroMalformedNoContentId";
    PlatformErrorCodes[PlatformErrorCodes["ContentMacroMalformedNoTemplateType"] = 170] = "ContentMacroMalformedNoTemplateType";
    PlatformErrorCodes[PlatformErrorCodes["ContentIllegalBNetMembershipId"] = 171] = "ContentIllegalBNetMembershipId";
    PlatformErrorCodes[PlatformErrorCodes["ContentLocaleDidNotMatchExpected"] = 172] = "ContentLocaleDidNotMatchExpected";
    PlatformErrorCodes[PlatformErrorCodes["ContentBabelCallFailed"] = 173] = "ContentBabelCallFailed";
    PlatformErrorCodes[PlatformErrorCodes["ContentEnglishPostLiveForbidden"] = 174] = "ContentEnglishPostLiveForbidden";
    PlatformErrorCodes[PlatformErrorCodes["ContentLocaleEditPermissionDenied"] = 175] = "ContentLocaleEditPermissionDenied";
    PlatformErrorCodes[PlatformErrorCodes["UserNonUniqueName"] = 200] = "UserNonUniqueName";
    PlatformErrorCodes[PlatformErrorCodes["UserManualLinkingStepRequired"] = 201] = "UserManualLinkingStepRequired";
    PlatformErrorCodes[PlatformErrorCodes["UserCreateUnknownSqlResult"] = 202] = "UserCreateUnknownSqlResult";
    PlatformErrorCodes[PlatformErrorCodes["UserCreateUnknownSqlException"] = 203] = "UserCreateUnknownSqlException";
    PlatformErrorCodes[PlatformErrorCodes["UserMalformedMembershipId"] = 204] = "UserMalformedMembershipId";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotFindRequestedUser"] = 205] = "UserCannotFindRequestedUser";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotLoadAccountCredentialLinkInfo"] = 206] = "UserCannotLoadAccountCredentialLinkInfo";
    PlatformErrorCodes[PlatformErrorCodes["UserInvalidMobileAppType"] = 207] = "UserInvalidMobileAppType";
    PlatformErrorCodes[PlatformErrorCodes["UserMissingMobilePairingInfo"] = 208] = "UserMissingMobilePairingInfo";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotGenerateMobileKeyWhileUsingMobileCredential"] = 209] = "UserCannotGenerateMobileKeyWhileUsingMobileCredential";
    PlatformErrorCodes[PlatformErrorCodes["UserGenerateMobileKeyExistingSlotCollision"] = 210] = "UserGenerateMobileKeyExistingSlotCollision";
    PlatformErrorCodes[PlatformErrorCodes["UserDisplayNameMissingOrInvalid"] = 211] = "UserDisplayNameMissingOrInvalid";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotLoadAccountProfileData"] = 212] = "UserCannotLoadAccountProfileData";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotSaveUserProfileData"] = 213] = "UserCannotSaveUserProfileData";
    PlatformErrorCodes[PlatformErrorCodes["UserEmailMissingOrInvalid"] = 214] = "UserEmailMissingOrInvalid";
    PlatformErrorCodes[PlatformErrorCodes["UserTermsOfUseRequired"] = 215] = "UserTermsOfUseRequired";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotCreateNewAccountWhileLoggedIn"] = 216] = "UserCannotCreateNewAccountWhileLoggedIn";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotResolveCentralAccount"] = 217] = "UserCannotResolveCentralAccount";
    PlatformErrorCodes[PlatformErrorCodes["UserInvalidAvatar"] = 218] = "UserInvalidAvatar";
    PlatformErrorCodes[PlatformErrorCodes["UserMissingCreatedUserResult"] = 219] = "UserMissingCreatedUserResult";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotChangeUniqueNameYet"] = 220] = "UserCannotChangeUniqueNameYet";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotChangeDisplayNameYet"] = 221] = "UserCannotChangeDisplayNameYet";
    PlatformErrorCodes[PlatformErrorCodes["UserCannotChangeEmail"] = 222] = "UserCannotChangeEmail";
    PlatformErrorCodes[PlatformErrorCodes["UserUniqueNameMustStartWithLetter"] = 223] = "UserUniqueNameMustStartWithLetter";
    PlatformErrorCodes[PlatformErrorCodes["UserNoLinkedAccountsSupportFriendListings"] = 224] = "UserNoLinkedAccountsSupportFriendListings";
    PlatformErrorCodes[PlatformErrorCodes["UserAcknowledgmentTableFull"] = 225] = "UserAcknowledgmentTableFull";
    PlatformErrorCodes[PlatformErrorCodes["UserCreationDestinyMembershipRequired"] = 226] = "UserCreationDestinyMembershipRequired";
    PlatformErrorCodes[PlatformErrorCodes["UserFriendsTokenNeedsRefresh"] = 227] = "UserFriendsTokenNeedsRefresh";
    PlatformErrorCodes[PlatformErrorCodes["MessagingUnknownError"] = 300] = "MessagingUnknownError";
    PlatformErrorCodes[PlatformErrorCodes["MessagingSelfError"] = 301] = "MessagingSelfError";
    PlatformErrorCodes[PlatformErrorCodes["MessagingSendThrottle"] = 302] = "MessagingSendThrottle";
    PlatformErrorCodes[PlatformErrorCodes["MessagingNoBody"] = 303] = "MessagingNoBody";
    PlatformErrorCodes[PlatformErrorCodes["MessagingTooManyUsers"] = 304] = "MessagingTooManyUsers";
    PlatformErrorCodes[PlatformErrorCodes["MessagingCanNotLeaveConversation"] = 305] = "MessagingCanNotLeaveConversation";
    PlatformErrorCodes[PlatformErrorCodes["MessagingUnableToSend"] = 306] = "MessagingUnableToSend";
    PlatformErrorCodes[PlatformErrorCodes["MessagingDeletedUserForbidden"] = 307] = "MessagingDeletedUserForbidden";
    PlatformErrorCodes[PlatformErrorCodes["MessagingCannotDeleteExternalConversation"] = 308] = "MessagingCannotDeleteExternalConversation";
    PlatformErrorCodes[PlatformErrorCodes["MessagingGroupChatDisabled"] = 309] = "MessagingGroupChatDisabled";
    PlatformErrorCodes[PlatformErrorCodes["MessagingMustIncludeSelfInPrivateMessage"] = 310] = "MessagingMustIncludeSelfInPrivateMessage";
    PlatformErrorCodes[PlatformErrorCodes["MessagingSenderIsBanned"] = 311] = "MessagingSenderIsBanned";
    PlatformErrorCodes[PlatformErrorCodes["MessagingGroupOptionalChatExceededMaximum"] = 312] = "MessagingGroupOptionalChatExceededMaximum";
    PlatformErrorCodes[PlatformErrorCodes["AddSurveyAnswersUnknownSqlException"] = 400] = "AddSurveyAnswersUnknownSqlException";
    PlatformErrorCodes[PlatformErrorCodes["ForumBodyCannotBeEmpty"] = 500] = "ForumBodyCannotBeEmpty";
    PlatformErrorCodes[PlatformErrorCodes["ForumSubjectCannotBeEmptyOnTopicPost"] = 501] = "ForumSubjectCannotBeEmptyOnTopicPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotLocateParentPost"] = 502] = "ForumCannotLocateParentPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumThreadLockedForReplies"] = 503] = "ForumThreadLockedForReplies";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownSqlResultDuringCreatePost"] = 504] = "ForumUnknownSqlResultDuringCreatePost";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownTagCreationError"] = 505] = "ForumUnknownTagCreationError";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownSqlResultDuringTagItem"] = 506] = "ForumUnknownSqlResultDuringTagItem";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownExceptionCreatePost"] = 507] = "ForumUnknownExceptionCreatePost";
    PlatformErrorCodes[PlatformErrorCodes["ForumQuestionMustBeTopicPost"] = 508] = "ForumQuestionMustBeTopicPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumExceptionDuringTagSearch"] = 509] = "ForumExceptionDuringTagSearch";
    PlatformErrorCodes[PlatformErrorCodes["ForumExceptionDuringTopicRetrieval"] = 510] = "ForumExceptionDuringTopicRetrieval";
    PlatformErrorCodes[PlatformErrorCodes["ForumAliasedTagError"] = 511] = "ForumAliasedTagError";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotLocateThread"] = 512] = "ForumCannotLocateThread";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownExceptionEditPost"] = 513] = "ForumUnknownExceptionEditPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotLocatePost"] = 514] = "ForumCannotLocatePost";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownExceptionGetOrCreateTags"] = 515] = "ForumUnknownExceptionGetOrCreateTags";
    PlatformErrorCodes[PlatformErrorCodes["ForumEditPermissionDenied"] = 516] = "ForumEditPermissionDenied";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownSqlResultDuringTagIdRetrieval"] = 517] = "ForumUnknownSqlResultDuringTagIdRetrieval";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotGetRating"] = 518] = "ForumCannotGetRating";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownExceptionGetRating"] = 519] = "ForumUnknownExceptionGetRating";
    PlatformErrorCodes[PlatformErrorCodes["ForumRatingsAccessError"] = 520] = "ForumRatingsAccessError";
    PlatformErrorCodes[PlatformErrorCodes["ForumRelatedPostAccessError"] = 521] = "ForumRelatedPostAccessError";
    PlatformErrorCodes[PlatformErrorCodes["ForumLatestReplyAccessError"] = 522] = "ForumLatestReplyAccessError";
    PlatformErrorCodes[PlatformErrorCodes["ForumUserStatusAccessError"] = 523] = "ForumUserStatusAccessError";
    PlatformErrorCodes[PlatformErrorCodes["ForumAuthorAccessError"] = 524] = "ForumAuthorAccessError";
    PlatformErrorCodes[PlatformErrorCodes["ForumGroupAccessError"] = 525] = "ForumGroupAccessError";
    PlatformErrorCodes[PlatformErrorCodes["ForumUrlExpectedButMissing"] = 526] = "ForumUrlExpectedButMissing";
    PlatformErrorCodes[PlatformErrorCodes["ForumRepliesCannotBeEmpty"] = 527] = "ForumRepliesCannotBeEmpty";
    PlatformErrorCodes[PlatformErrorCodes["ForumRepliesCannotBeInDifferentGroups"] = 528] = "ForumRepliesCannotBeInDifferentGroups";
    PlatformErrorCodes[PlatformErrorCodes["ForumSubTopicCannotBeCreatedAtThisThreadLevel"] = 529] = "ForumSubTopicCannotBeCreatedAtThisThreadLevel";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotCreateContentTopic"] = 530] = "ForumCannotCreateContentTopic";
    PlatformErrorCodes[PlatformErrorCodes["ForumTopicDoesNotExist"] = 531] = "ForumTopicDoesNotExist";
    PlatformErrorCodes[PlatformErrorCodes["ForumContentCommentsNotAllowed"] = 532] = "ForumContentCommentsNotAllowed";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownSqlResultDuringEditPost"] = 533] = "ForumUnknownSqlResultDuringEditPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownSqlResultDuringGetPost"] = 534] = "ForumUnknownSqlResultDuringGetPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumPostValidationBadUrl"] = 535] = "ForumPostValidationBadUrl";
    PlatformErrorCodes[PlatformErrorCodes["ForumBodyTooLong"] = 536] = "ForumBodyTooLong";
    PlatformErrorCodes[PlatformErrorCodes["ForumSubjectTooLong"] = 537] = "ForumSubjectTooLong";
    PlatformErrorCodes[PlatformErrorCodes["ForumAnnouncementNotAllowed"] = 538] = "ForumAnnouncementNotAllowed";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotShareOwnPost"] = 539] = "ForumCannotShareOwnPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumEditNoOp"] = 540] = "ForumEditNoOp";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownDatabaseErrorDuringGetPost"] = 541] = "ForumUnknownDatabaseErrorDuringGetPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumExceeedMaximumRowLimit"] = 542] = "ForumExceeedMaximumRowLimit";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotSharePrivatePost"] = 543] = "ForumCannotSharePrivatePost";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotCrossPostBetweenGroups"] = 544] = "ForumCannotCrossPostBetweenGroups";
    PlatformErrorCodes[PlatformErrorCodes["ForumIncompatibleCategories"] = 555] = "ForumIncompatibleCategories";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotUseTheseCategoriesOnNonTopicPost"] = 556] = "ForumCannotUseTheseCategoriesOnNonTopicPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumCanOnlyDeleteTopics"] = 557] = "ForumCanOnlyDeleteTopics";
    PlatformErrorCodes[PlatformErrorCodes["ForumDeleteSqlException"] = 558] = "ForumDeleteSqlException";
    PlatformErrorCodes[PlatformErrorCodes["ForumDeleteSqlUnknownResult"] = 559] = "ForumDeleteSqlUnknownResult";
    PlatformErrorCodes[PlatformErrorCodes["ForumTooManyTags"] = 560] = "ForumTooManyTags";
    PlatformErrorCodes[PlatformErrorCodes["ForumCanOnlyRateTopics"] = 561] = "ForumCanOnlyRateTopics";
    PlatformErrorCodes[PlatformErrorCodes["ForumBannedPostsCannotBeEdited"] = 562] = "ForumBannedPostsCannotBeEdited";
    PlatformErrorCodes[PlatformErrorCodes["ForumThreadRootIsBanned"] = 563] = "ForumThreadRootIsBanned";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotUseOfficialTagCategoryAsTag"] = 564] = "ForumCannotUseOfficialTagCategoryAsTag";
    PlatformErrorCodes[PlatformErrorCodes["ForumAnswerCannotBeMadeOnCreatePost"] = 565] = "ForumAnswerCannotBeMadeOnCreatePost";
    PlatformErrorCodes[PlatformErrorCodes["ForumAnswerCannotBeMadeOnEditPost"] = 566] = "ForumAnswerCannotBeMadeOnEditPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumAnswerPostIdIsNotADirectReplyOfQuestion"] = 567] = "ForumAnswerPostIdIsNotADirectReplyOfQuestion";
    PlatformErrorCodes[PlatformErrorCodes["ForumAnswerTopicIdIsNotAQuestion"] = 568] = "ForumAnswerTopicIdIsNotAQuestion";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownExceptionDuringMarkAnswer"] = 569] = "ForumUnknownExceptionDuringMarkAnswer";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnknownSqlResultDuringMarkAnswer"] = 570] = "ForumUnknownSqlResultDuringMarkAnswer";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotRateYourOwnPosts"] = 571] = "ForumCannotRateYourOwnPosts";
    PlatformErrorCodes[PlatformErrorCodes["ForumPollsMustBeTheFirstPostInTopic"] = 572] = "ForumPollsMustBeTheFirstPostInTopic";
    PlatformErrorCodes[PlatformErrorCodes["ForumInvalidPollInput"] = 573] = "ForumInvalidPollInput";
    PlatformErrorCodes[PlatformErrorCodes["ForumGroupAdminEditNonMember"] = 574] = "ForumGroupAdminEditNonMember";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotEditModeratorEditedPost"] = 575] = "ForumCannotEditModeratorEditedPost";
    PlatformErrorCodes[PlatformErrorCodes["ForumRequiresDestinyMembership"] = 576] = "ForumRequiresDestinyMembership";
    PlatformErrorCodes[PlatformErrorCodes["ForumUnexpectedError"] = 577] = "ForumUnexpectedError";
    PlatformErrorCodes[PlatformErrorCodes["ForumAgeLock"] = 578] = "ForumAgeLock";
    PlatformErrorCodes[PlatformErrorCodes["ForumMaxPages"] = 579] = "ForumMaxPages";
    PlatformErrorCodes[PlatformErrorCodes["ForumMaxPagesOldestFirst"] = 580] = "ForumMaxPagesOldestFirst";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotApplyForumIdWithoutTags"] = 581] = "ForumCannotApplyForumIdWithoutTags";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotApplyForumIdToNonTopics"] = 582] = "ForumCannotApplyForumIdToNonTopics";
    PlatformErrorCodes[PlatformErrorCodes["ForumCannotDownvoteCommunityCreations"] = 583] = "ForumCannotDownvoteCommunityCreations";
    PlatformErrorCodes[PlatformErrorCodes["ForumTopicsMustHaveOfficialCategory"] = 584] = "ForumTopicsMustHaveOfficialCategory";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentTopicMalformed"] = 585] = "ForumRecruitmentTopicMalformed";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentTopicNotFound"] = 586] = "ForumRecruitmentTopicNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentTopicNoSlotsRemaining"] = 587] = "ForumRecruitmentTopicNoSlotsRemaining";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentTopicKickBan"] = 588] = "ForumRecruitmentTopicKickBan";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentTopicRequirementsNotMet"] = 589] = "ForumRecruitmentTopicRequirementsNotMet";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentTopicNoPlayers"] = 590] = "ForumRecruitmentTopicNoPlayers";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentApproveFailMessageBan"] = 591] = "ForumRecruitmentApproveFailMessageBan";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentGlobalBan"] = 592] = "ForumRecruitmentGlobalBan";
    PlatformErrorCodes[PlatformErrorCodes["ForumUserBannedFromThisTopic"] = 593] = "ForumUserBannedFromThisTopic";
    PlatformErrorCodes[PlatformErrorCodes["ForumRecruitmentFireteamMembersOnly"] = 594] = "ForumRecruitmentFireteamMembersOnly";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipApplicationAlreadyResolved"] = 601] = "GroupMembershipApplicationAlreadyResolved";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipAlreadyApplied"] = 602] = "GroupMembershipAlreadyApplied";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipInsufficientPrivileges"] = 603] = "GroupMembershipInsufficientPrivileges";
    PlatformErrorCodes[PlatformErrorCodes["GroupIdNotReturnedFromCreation"] = 604] = "GroupIdNotReturnedFromCreation";
    PlatformErrorCodes[PlatformErrorCodes["GroupSearchInvalidParameters"] = 605] = "GroupSearchInvalidParameters";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipPendingApplicationNotFound"] = 606] = "GroupMembershipPendingApplicationNotFound";
    PlatformErrorCodes[PlatformErrorCodes["GroupInvalidId"] = 607] = "GroupInvalidId";
    PlatformErrorCodes[PlatformErrorCodes["GroupInvalidMembershipId"] = 608] = "GroupInvalidMembershipId";
    PlatformErrorCodes[PlatformErrorCodes["GroupInvalidMembershipType"] = 609] = "GroupInvalidMembershipType";
    PlatformErrorCodes[PlatformErrorCodes["GroupMissingTags"] = 610] = "GroupMissingTags";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipNotFound"] = 611] = "GroupMembershipNotFound";
    PlatformErrorCodes[PlatformErrorCodes["GroupInvalidRating"] = 612] = "GroupInvalidRating";
    PlatformErrorCodes[PlatformErrorCodes["GroupUserFollowingAccessError"] = 613] = "GroupUserFollowingAccessError";
    PlatformErrorCodes[PlatformErrorCodes["GroupUserMembershipAccessError"] = 614] = "GroupUserMembershipAccessError";
    PlatformErrorCodes[PlatformErrorCodes["GroupCreatorAccessError"] = 615] = "GroupCreatorAccessError";
    PlatformErrorCodes[PlatformErrorCodes["GroupAdminAccessError"] = 616] = "GroupAdminAccessError";
    PlatformErrorCodes[PlatformErrorCodes["GroupPrivatePostNotViewable"] = 617] = "GroupPrivatePostNotViewable";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipNotLoggedIn"] = 618] = "GroupMembershipNotLoggedIn";
    PlatformErrorCodes[PlatformErrorCodes["GroupNotDeleted"] = 619] = "GroupNotDeleted";
    PlatformErrorCodes[PlatformErrorCodes["GroupUnknownErrorUndeletingGroup"] = 620] = "GroupUnknownErrorUndeletingGroup";
    PlatformErrorCodes[PlatformErrorCodes["GroupDeleted"] = 621] = "GroupDeleted";
    PlatformErrorCodes[PlatformErrorCodes["GroupNotFound"] = 622] = "GroupNotFound";
    PlatformErrorCodes[PlatformErrorCodes["GroupMemberBanned"] = 623] = "GroupMemberBanned";
    PlatformErrorCodes[PlatformErrorCodes["GroupMembershipClosed"] = 624] = "GroupMembershipClosed";
    PlatformErrorCodes[PlatformErrorCodes["GroupPrivatePostOverrideError"] = 625] = "GroupPrivatePostOverrideError";
    PlatformErrorCodes[PlatformErrorCodes["GroupNameTaken"] = 626] = "GroupNameTaken";
    PlatformErrorCodes[PlatformErrorCodes["GroupDeletionGracePeriodExpired"] = 627] = "GroupDeletionGracePeriodExpired";
    PlatformErrorCodes[PlatformErrorCodes["GroupCannotCheckBanStatus"] = 628] = "GroupCannotCheckBanStatus";
    PlatformErrorCodes[PlatformErrorCodes["GroupMaximumMembershipCountReached"] = 629] = "GroupMaximumMembershipCountReached";
    PlatformErrorCodes[PlatformErrorCodes["NoDestinyAccountForClanPlatform"] = 630] = "NoDestinyAccountForClanPlatform";
    PlatformErrorCodes[PlatformErrorCodes["AlreadyRequestingMembershipForClanPlatform"] = 631] = "AlreadyRequestingMembershipForClanPlatform";
    PlatformErrorCodes[PlatformErrorCodes["AlreadyClanMemberOnPlatform"] = 632] = "AlreadyClanMemberOnPlatform";
    PlatformErrorCodes[PlatformErrorCodes["GroupJoinedCannotSetClanName"] = 633] = "GroupJoinedCannotSetClanName";
    PlatformErrorCodes[PlatformErrorCodes["GroupLeftCannotClearClanName"] = 634] = "GroupLeftCannotClearClanName";
    PlatformErrorCodes[PlatformErrorCodes["GroupRelationshipRequestPending"] = 635] = "GroupRelationshipRequestPending";
    PlatformErrorCodes[PlatformErrorCodes["GroupRelationshipRequestBlocked"] = 636] = "GroupRelationshipRequestBlocked";
    PlatformErrorCodes[PlatformErrorCodes["GroupRelationshipRequestNotFound"] = 637] = "GroupRelationshipRequestNotFound";
    PlatformErrorCodes[PlatformErrorCodes["GroupRelationshipBlockNotFound"] = 638] = "GroupRelationshipBlockNotFound";
    PlatformErrorCodes[PlatformErrorCodes["GroupRelationshipNotFound"] = 639] = "GroupRelationshipNotFound";
    PlatformErrorCodes[PlatformErrorCodes["GroupAlreadyAllied"] = 641] = "GroupAlreadyAllied";
    PlatformErrorCodes[PlatformErrorCodes["GroupAlreadyMember"] = 642] = "GroupAlreadyMember";
    PlatformErrorCodes[PlatformErrorCodes["GroupRelationshipAlreadyExists"] = 643] = "GroupRelationshipAlreadyExists";
    PlatformErrorCodes[PlatformErrorCodes["InvalidGroupTypesForRelationshipRequest"] = 644] = "InvalidGroupTypesForRelationshipRequest";
    PlatformErrorCodes[PlatformErrorCodes["GroupAtMaximumAlliances"] = 646] = "GroupAtMaximumAlliances";
    PlatformErrorCodes[PlatformErrorCodes["GroupCannotSetClanOnlySettings"] = 647] = "GroupCannotSetClanOnlySettings";
    PlatformErrorCodes[PlatformErrorCodes["ClanCannotSetTwoDefaultPostTypes"] = 648] = "ClanCannotSetTwoDefaultPostTypes";
    PlatformErrorCodes[PlatformErrorCodes["GroupMemberInvalidMemberType"] = 649] = "GroupMemberInvalidMemberType";
    PlatformErrorCodes[PlatformErrorCodes["GroupInvalidPlatformType"] = 650] = "GroupInvalidPlatformType";
    PlatformErrorCodes[PlatformErrorCodes["GroupMemberInvalidSort"] = 651] = "GroupMemberInvalidSort";
    PlatformErrorCodes[PlatformErrorCodes["GroupInvalidResolveState"] = 652] = "GroupInvalidResolveState";
    PlatformErrorCodes[PlatformErrorCodes["ClanAlreadyEnabledForPlatform"] = 653] = "ClanAlreadyEnabledForPlatform";
    PlatformErrorCodes[PlatformErrorCodes["ClanNotEnabledForPlatform"] = 654] = "ClanNotEnabledForPlatform";
    PlatformErrorCodes[PlatformErrorCodes["ClanEnabledButCouldNotJoinNoAccount"] = 655] = "ClanEnabledButCouldNotJoinNoAccount";
    PlatformErrorCodes[PlatformErrorCodes["ClanEnabledButCouldNotJoinAlreadyMember"] = 656] = "ClanEnabledButCouldNotJoinAlreadyMember";
    PlatformErrorCodes[PlatformErrorCodes["ClanCannotJoinNoCredential"] = 657] = "ClanCannotJoinNoCredential";
    PlatformErrorCodes[PlatformErrorCodes["NoClanMembershipForPlatform"] = 658] = "NoClanMembershipForPlatform";
    PlatformErrorCodes[PlatformErrorCodes["GroupToGroupFollowLimitReached"] = 659] = "GroupToGroupFollowLimitReached";
    PlatformErrorCodes[PlatformErrorCodes["ChildGroupAlreadyInAlliance"] = 660] = "ChildGroupAlreadyInAlliance";
    PlatformErrorCodes[PlatformErrorCodes["OwnerGroupAlreadyInAlliance"] = 661] = "OwnerGroupAlreadyInAlliance";
    PlatformErrorCodes[PlatformErrorCodes["AllianceOwnerCannotJoinAlliance"] = 662] = "AllianceOwnerCannotJoinAlliance";
    PlatformErrorCodes[PlatformErrorCodes["GroupNotInAlliance"] = 663] = "GroupNotInAlliance";
    PlatformErrorCodes[PlatformErrorCodes["ChildGroupCannotInviteToAlliance"] = 664] = "ChildGroupCannotInviteToAlliance";
    PlatformErrorCodes[PlatformErrorCodes["GroupToGroupAlreadyFollowed"] = 665] = "GroupToGroupAlreadyFollowed";
    PlatformErrorCodes[PlatformErrorCodes["GroupToGroupNotFollowing"] = 666] = "GroupToGroupNotFollowing";
    PlatformErrorCodes[PlatformErrorCodes["ClanMaximumMembershipReached"] = 667] = "ClanMaximumMembershipReached";
    PlatformErrorCodes[PlatformErrorCodes["ClanNameNotValid"] = 668] = "ClanNameNotValid";
    PlatformErrorCodes[PlatformErrorCodes["ClanNameNotValidError"] = 669] = "ClanNameNotValidError";
    PlatformErrorCodes[PlatformErrorCodes["AllianceOwnerNotDefined"] = 670] = "AllianceOwnerNotDefined";
    PlatformErrorCodes[PlatformErrorCodes["AllianceChildNotDefined"] = 671] = "AllianceChildNotDefined";
    PlatformErrorCodes[PlatformErrorCodes["ClanCultureIllegalCharacters"] = 672] = "ClanCultureIllegalCharacters";
    PlatformErrorCodes[PlatformErrorCodes["ClanTagIllegalCharacters"] = 673] = "ClanTagIllegalCharacters";
    PlatformErrorCodes[PlatformErrorCodes["ClanRequiresInvitation"] = 674] = "ClanRequiresInvitation";
    PlatformErrorCodes[PlatformErrorCodes["ClanMembershipClosed"] = 675] = "ClanMembershipClosed";
    PlatformErrorCodes[PlatformErrorCodes["ClanInviteAlreadyMember"] = 676] = "ClanInviteAlreadyMember";
    PlatformErrorCodes[PlatformErrorCodes["GroupInviteAlreadyMember"] = 677] = "GroupInviteAlreadyMember";
    PlatformErrorCodes[PlatformErrorCodes["GroupJoinApprovalRequired"] = 678] = "GroupJoinApprovalRequired";
    PlatformErrorCodes[PlatformErrorCodes["ClanTagRequired"] = 679] = "ClanTagRequired";
    PlatformErrorCodes[PlatformErrorCodes["GroupNameCannotStartOrEndWithWhiteSpace"] = 680] = "GroupNameCannotStartOrEndWithWhiteSpace";
    PlatformErrorCodes[PlatformErrorCodes["ClanCallsignCannotStartOrEndWithWhiteSpace"] = 681] = "ClanCallsignCannotStartOrEndWithWhiteSpace";
    PlatformErrorCodes[PlatformErrorCodes["ClanMigrationFailed"] = 682] = "ClanMigrationFailed";
    PlatformErrorCodes[PlatformErrorCodes["ClanNotEnabledAlreadyMemberOfAnotherClan"] = 683] = "ClanNotEnabledAlreadyMemberOfAnotherClan";
    PlatformErrorCodes[PlatformErrorCodes["GroupModerationNotPermittedOnNonMembers"] = 684] = "GroupModerationNotPermittedOnNonMembers";
    PlatformErrorCodes[PlatformErrorCodes["ClanCreationInWorldServerFailed"] = 685] = "ClanCreationInWorldServerFailed";
    PlatformErrorCodes[PlatformErrorCodes["ClanNotFound"] = 686] = "ClanNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ClanMembershipLevelDoesNotPermitThatAction"] = 687] = "ClanMembershipLevelDoesNotPermitThatAction";
    PlatformErrorCodes[PlatformErrorCodes["ClanMemberNotFound"] = 688] = "ClanMemberNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ClanMissingMembershipApprovers"] = 689] = "ClanMissingMembershipApprovers";
    PlatformErrorCodes[PlatformErrorCodes["ClanInWrongStateForRequestedAction"] = 690] = "ClanInWrongStateForRequestedAction";
    PlatformErrorCodes[PlatformErrorCodes["ClanNameAlreadyUsed"] = 691] = "ClanNameAlreadyUsed";
    PlatformErrorCodes[PlatformErrorCodes["ClanTooFewMembers"] = 692] = "ClanTooFewMembers";
    PlatformErrorCodes[PlatformErrorCodes["ClanInfoCannotBeWhitespace"] = 693] = "ClanInfoCannotBeWhitespace";
    PlatformErrorCodes[PlatformErrorCodes["GroupCultureThrottle"] = 694] = "GroupCultureThrottle";
    PlatformErrorCodes[PlatformErrorCodes["ClanTargetDisallowsInvites"] = 695] = "ClanTargetDisallowsInvites";
    PlatformErrorCodes[PlatformErrorCodes["ClanInvalidOperation"] = 696] = "ClanInvalidOperation";
    PlatformErrorCodes[PlatformErrorCodes["ClanFounderCannotLeaveWithoutAbdication"] = 697] = "ClanFounderCannotLeaveWithoutAbdication";
    PlatformErrorCodes[PlatformErrorCodes["ClanNameReserved"] = 698] = "ClanNameReserved";
    PlatformErrorCodes[PlatformErrorCodes["ClanApplicantInClanSoNowInvited"] = 699] = "ClanApplicantInClanSoNowInvited";
    PlatformErrorCodes[PlatformErrorCodes["ActivitiesUnknownException"] = 701] = "ActivitiesUnknownException";
    PlatformErrorCodes[PlatformErrorCodes["ActivitiesParameterNull"] = 702] = "ActivitiesParameterNull";
    PlatformErrorCodes[PlatformErrorCodes["ActivityCountsDiabled"] = 703] = "ActivityCountsDiabled";
    PlatformErrorCodes[PlatformErrorCodes["ActivitySearchInvalidParameters"] = 704] = "ActivitySearchInvalidParameters";
    PlatformErrorCodes[PlatformErrorCodes["ActivityPermissionDenied"] = 705] = "ActivityPermissionDenied";
    PlatformErrorCodes[PlatformErrorCodes["ShareAlreadyShared"] = 706] = "ShareAlreadyShared";
    PlatformErrorCodes[PlatformErrorCodes["ActivityLoggingDisabled"] = 707] = "ActivityLoggingDisabled";
    PlatformErrorCodes[PlatformErrorCodes["ItemAlreadyFollowed"] = 801] = "ItemAlreadyFollowed";
    PlatformErrorCodes[PlatformErrorCodes["ItemNotFollowed"] = 802] = "ItemNotFollowed";
    PlatformErrorCodes[PlatformErrorCodes["CannotFollowSelf"] = 803] = "CannotFollowSelf";
    PlatformErrorCodes[PlatformErrorCodes["GroupFollowLimitExceeded"] = 804] = "GroupFollowLimitExceeded";
    PlatformErrorCodes[PlatformErrorCodes["TagFollowLimitExceeded"] = 805] = "TagFollowLimitExceeded";
    PlatformErrorCodes[PlatformErrorCodes["UserFollowLimitExceeded"] = 806] = "UserFollowLimitExceeded";
    PlatformErrorCodes[PlatformErrorCodes["FollowUnsupportedEntityType"] = 807] = "FollowUnsupportedEntityType";
    PlatformErrorCodes[PlatformErrorCodes["NoValidTagsInList"] = 900] = "NoValidTagsInList";
    PlatformErrorCodes[PlatformErrorCodes["BelowMinimumSuggestionLength"] = 901] = "BelowMinimumSuggestionLength";
    PlatformErrorCodes[PlatformErrorCodes["CannotGetSuggestionsOnMultipleTagsSimultaneously"] = 902] = "CannotGetSuggestionsOnMultipleTagsSimultaneously";
    PlatformErrorCodes[PlatformErrorCodes["NotAValidPartialTag"] = 903] = "NotAValidPartialTag";
    PlatformErrorCodes[PlatformErrorCodes["TagSuggestionsUnknownSqlResult"] = 904] = "TagSuggestionsUnknownSqlResult";
    PlatformErrorCodes[PlatformErrorCodes["TagsUnableToLoadPopularTagsFromDatabase"] = 905] = "TagsUnableToLoadPopularTagsFromDatabase";
    PlatformErrorCodes[PlatformErrorCodes["TagInvalid"] = 906] = "TagInvalid";
    PlatformErrorCodes[PlatformErrorCodes["TagNotFound"] = 907] = "TagNotFound";
    PlatformErrorCodes[PlatformErrorCodes["SingleTagExpected"] = 908] = "SingleTagExpected";
    PlatformErrorCodes[PlatformErrorCodes["TagsExceededMaximumPerItem"] = 909] = "TagsExceededMaximumPerItem";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreInvalidParameters"] = 1000] = "IgnoreInvalidParameters";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreSqlException"] = 1001] = "IgnoreSqlException";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreErrorRetrievingGroupPermissions"] = 1002] = "IgnoreErrorRetrievingGroupPermissions";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreErrorInsufficientPermission"] = 1003] = "IgnoreErrorInsufficientPermission";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreErrorRetrievingItem"] = 1004] = "IgnoreErrorRetrievingItem";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreCannotIgnoreSelf"] = 1005] = "IgnoreCannotIgnoreSelf";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreIllegalType"] = 1006] = "IgnoreIllegalType";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreNotFound"] = 1007] = "IgnoreNotFound";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreUserGloballyIgnored"] = 1008] = "IgnoreUserGloballyIgnored";
    PlatformErrorCodes[PlatformErrorCodes["IgnoreUserIgnored"] = 1009] = "IgnoreUserIgnored";
    PlatformErrorCodes[PlatformErrorCodes["NotificationSettingInvalid"] = 1100] = "NotificationSettingInvalid";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiExpiredAccessToken"] = 1204] = "PsnApiExpiredAccessToken";
    PlatformErrorCodes[PlatformErrorCodes["PSNExForbidden"] = 1205] = "PSNExForbidden";
    PlatformErrorCodes[PlatformErrorCodes["PSNExSystemDisabled"] = 1218] = "PSNExSystemDisabled";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiErrorCodeUnknown"] = 1223] = "PsnApiErrorCodeUnknown";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiErrorWebException"] = 1224] = "PsnApiErrorWebException";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiBadRequest"] = 1225] = "PsnApiBadRequest";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiAccessTokenRequired"] = 1226] = "PsnApiAccessTokenRequired";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiInvalidAccessToken"] = 1227] = "PsnApiInvalidAccessToken";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiBannedUser"] = 1229] = "PsnApiBannedUser";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiAccountUpgradeRequired"] = 1230] = "PsnApiAccountUpgradeRequired";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiServiceTemporarilyUnavailable"] = 1231] = "PsnApiServiceTemporarilyUnavailable";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiServerBusy"] = 1232] = "PsnApiServerBusy";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiUnderMaintenance"] = 1233] = "PsnApiUnderMaintenance";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiProfileUserNotFound"] = 1234] = "PsnApiProfileUserNotFound";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiProfilePrivacyRestriction"] = 1235] = "PsnApiProfilePrivacyRestriction";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiProfileUnderMaintenance"] = 1236] = "PsnApiProfileUnderMaintenance";
    PlatformErrorCodes[PlatformErrorCodes["PsnApiAccountAttributeMissing"] = 1237] = "PsnApiAccountAttributeMissing";
    PlatformErrorCodes[PlatformErrorCodes["XblExSystemDisabled"] = 1300] = "XblExSystemDisabled";
    PlatformErrorCodes[PlatformErrorCodes["XblExUnknownError"] = 1301] = "XblExUnknownError";
    PlatformErrorCodes[PlatformErrorCodes["XblApiErrorWebException"] = 1302] = "XblApiErrorWebException";
    PlatformErrorCodes[PlatformErrorCodes["XblStsTokenInvalid"] = 1303] = "XblStsTokenInvalid";
    PlatformErrorCodes[PlatformErrorCodes["XblStsMissingToken"] = 1304] = "XblStsMissingToken";
    PlatformErrorCodes[PlatformErrorCodes["XblStsExpiredToken"] = 1305] = "XblStsExpiredToken";
    PlatformErrorCodes[PlatformErrorCodes["XblAccessToTheSandboxDenied"] = 1306] = "XblAccessToTheSandboxDenied";
    PlatformErrorCodes[PlatformErrorCodes["XblMsaResponseMissing"] = 1307] = "XblMsaResponseMissing";
    PlatformErrorCodes[PlatformErrorCodes["XblMsaAccessTokenExpired"] = 1308] = "XblMsaAccessTokenExpired";
    PlatformErrorCodes[PlatformErrorCodes["XblMsaInvalidRequest"] = 1309] = "XblMsaInvalidRequest";
    PlatformErrorCodes[PlatformErrorCodes["XblMsaFriendsRequireSignIn"] = 1310] = "XblMsaFriendsRequireSignIn";
    PlatformErrorCodes[PlatformErrorCodes["XblUserActionRequired"] = 1311] = "XblUserActionRequired";
    PlatformErrorCodes[PlatformErrorCodes["XblParentalControls"] = 1312] = "XblParentalControls";
    PlatformErrorCodes[PlatformErrorCodes["XblDeveloperAccount"] = 1313] = "XblDeveloperAccount";
    PlatformErrorCodes[PlatformErrorCodes["XblUserTokenExpired"] = 1314] = "XblUserTokenExpired";
    PlatformErrorCodes[PlatformErrorCodes["XblUserTokenInvalid"] = 1315] = "XblUserTokenInvalid";
    PlatformErrorCodes[PlatformErrorCodes["XblOffline"] = 1316] = "XblOffline";
    PlatformErrorCodes[PlatformErrorCodes["XblUnknownErrorCode"] = 1317] = "XblUnknownErrorCode";
    PlatformErrorCodes[PlatformErrorCodes["XblMsaInvalidGrant"] = 1318] = "XblMsaInvalidGrant";
    PlatformErrorCodes[PlatformErrorCodes["ReportNotYetResolved"] = 1400] = "ReportNotYetResolved";
    PlatformErrorCodes[PlatformErrorCodes["ReportOverturnDoesNotChangeDecision"] = 1401] = "ReportOverturnDoesNotChangeDecision";
    PlatformErrorCodes[PlatformErrorCodes["ReportNotFound"] = 1402] = "ReportNotFound";
    PlatformErrorCodes[PlatformErrorCodes["ReportAlreadyReported"] = 1403] = "ReportAlreadyReported";
    PlatformErrorCodes[PlatformErrorCodes["ReportInvalidResolution"] = 1404] = "ReportInvalidResolution";
    PlatformErrorCodes[PlatformErrorCodes["ReportNotAssignedToYou"] = 1405] = "ReportNotAssignedToYou";
    PlatformErrorCodes[PlatformErrorCodes["LegacyGameStatsSystemDisabled"] = 1500] = "LegacyGameStatsSystemDisabled";
    PlatformErrorCodes[PlatformErrorCodes["LegacyGameStatsUnknownError"] = 1501] = "LegacyGameStatsUnknownError";
    PlatformErrorCodes[PlatformErrorCodes["LegacyGameStatsMalformedSneakerNetCode"] = 1502] = "LegacyGameStatsMalformedSneakerNetCode";
    PlatformErrorCodes[PlatformErrorCodes["DestinyAccountAcquisitionFailure"] = 1600] = "DestinyAccountAcquisitionFailure";
    PlatformErrorCodes[PlatformErrorCodes["DestinyAccountNotFound"] = 1601] = "DestinyAccountNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyBuildStatsDatabaseError"] = 1602] = "DestinyBuildStatsDatabaseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCharacterStatsDatabaseError"] = 1603] = "DestinyCharacterStatsDatabaseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyPvPStatsDatabaseError"] = 1604] = "DestinyPvPStatsDatabaseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyPvEStatsDatabaseError"] = 1605] = "DestinyPvEStatsDatabaseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyGrimoireStatsDatabaseError"] = 1606] = "DestinyGrimoireStatsDatabaseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyStatsParameterMembershipTypeParseError"] = 1607] = "DestinyStatsParameterMembershipTypeParseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyStatsParameterMembershipIdParseError"] = 1608] = "DestinyStatsParameterMembershipIdParseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyStatsParameterRangeParseError"] = 1609] = "DestinyStatsParameterRangeParseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyStringItemHashNotFound"] = 1610] = "DestinyStringItemHashNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyStringSetNotFound"] = 1611] = "DestinyStringSetNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentLookupNotFoundForKey"] = 1612] = "DestinyContentLookupNotFoundForKey";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentItemNotFound"] = 1613] = "DestinyContentItemNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentSectionNotFound"] = 1614] = "DestinyContentSectionNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentPropertyNotFound"] = 1615] = "DestinyContentPropertyNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentConfigNotFound"] = 1616] = "DestinyContentConfigNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentPropertyBucketValueNotFound"] = 1617] = "DestinyContentPropertyBucketValueNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyUnexpectedError"] = 1618] = "DestinyUnexpectedError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInvalidAction"] = 1619] = "DestinyInvalidAction";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCharacterNotFound"] = 1620] = "DestinyCharacterNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInvalidFlag"] = 1621] = "DestinyInvalidFlag";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInvalidRequest"] = 1622] = "DestinyInvalidRequest";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemNotFound"] = 1623] = "DestinyItemNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInvalidCustomizationChoices"] = 1624] = "DestinyInvalidCustomizationChoices";
    PlatformErrorCodes[PlatformErrorCodes["DestinyVendorItemNotFound"] = 1625] = "DestinyVendorItemNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInternalError"] = 1626] = "DestinyInternalError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyVendorNotFound"] = 1627] = "DestinyVendorNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyRecentActivitiesDatabaseError"] = 1628] = "DestinyRecentActivitiesDatabaseError";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemBucketNotFound"] = 1629] = "DestinyItemBucketNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInvalidMembershipType"] = 1630] = "DestinyInvalidMembershipType";
    PlatformErrorCodes[PlatformErrorCodes["DestinyVersionIncompatibility"] = 1631] = "DestinyVersionIncompatibility";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemAlreadyInInventory"] = 1632] = "DestinyItemAlreadyInInventory";
    PlatformErrorCodes[PlatformErrorCodes["DestinyBucketNotFound"] = 1633] = "DestinyBucketNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCharacterNotInTower"] = 1634] = "DestinyCharacterNotInTower";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCharacterNotLoggedIn"] = 1635] = "DestinyCharacterNotLoggedIn";
    PlatformErrorCodes[PlatformErrorCodes["DestinyDefinitionsNotLoaded"] = 1636] = "DestinyDefinitionsNotLoaded";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInventoryFull"] = 1637] = "DestinyInventoryFull";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemFailedLevelCheck"] = 1638] = "DestinyItemFailedLevelCheck";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemFailedUnlockCheck"] = 1639] = "DestinyItemFailedUnlockCheck";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemUnequippable"] = 1640] = "DestinyItemUnequippable";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemUniqueEquipRestricted"] = 1641] = "DestinyItemUniqueEquipRestricted";
    PlatformErrorCodes[PlatformErrorCodes["DestinyNoRoomInDestination"] = 1642] = "DestinyNoRoomInDestination";
    PlatformErrorCodes[PlatformErrorCodes["DestinyServiceFailure"] = 1643] = "DestinyServiceFailure";
    PlatformErrorCodes[PlatformErrorCodes["DestinyServiceRetired"] = 1644] = "DestinyServiceRetired";
    PlatformErrorCodes[PlatformErrorCodes["DestinyTransferFailed"] = 1645] = "DestinyTransferFailed";
    PlatformErrorCodes[PlatformErrorCodes["DestinyTransferNotFoundForSourceBucket"] = 1646] = "DestinyTransferNotFoundForSourceBucket";
    PlatformErrorCodes[PlatformErrorCodes["DestinyUnexpectedResultInVendorTransferCheck"] = 1647] = "DestinyUnexpectedResultInVendorTransferCheck";
    PlatformErrorCodes[PlatformErrorCodes["DestinyUniquenessViolation"] = 1648] = "DestinyUniquenessViolation";
    PlatformErrorCodes[PlatformErrorCodes["DestinyErrorDeserializationFailure"] = 1649] = "DestinyErrorDeserializationFailure";
    PlatformErrorCodes[PlatformErrorCodes["DestinyValidAccountTicketRequired"] = 1650] = "DestinyValidAccountTicketRequired";
    PlatformErrorCodes[PlatformErrorCodes["DestinyShardRelayClientTimeout"] = 1651] = "DestinyShardRelayClientTimeout";
    PlatformErrorCodes[PlatformErrorCodes["DestinyShardRelayProxyTimeout"] = 1652] = "DestinyShardRelayProxyTimeout";
    PlatformErrorCodes[PlatformErrorCodes["DestinyPGCRNotFound"] = 1653] = "DestinyPGCRNotFound";
    PlatformErrorCodes[PlatformErrorCodes["DestinyAccountMustBeOffline"] = 1654] = "DestinyAccountMustBeOffline";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCanOnlyEquipInGame"] = 1655] = "DestinyCanOnlyEquipInGame";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCannotPerformActionOnEquippedItem"] = 1656] = "DestinyCannotPerformActionOnEquippedItem";
    PlatformErrorCodes[PlatformErrorCodes["DestinyQuestAlreadyCompleted"] = 1657] = "DestinyQuestAlreadyCompleted";
    PlatformErrorCodes[PlatformErrorCodes["DestinyQuestAlreadyTracked"] = 1658] = "DestinyQuestAlreadyTracked";
    PlatformErrorCodes[PlatformErrorCodes["DestinyTrackableQuestsFull"] = 1659] = "DestinyTrackableQuestsFull";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemNotTransferrable"] = 1660] = "DestinyItemNotTransferrable";
    PlatformErrorCodes[PlatformErrorCodes["DestinyVendorPurchaseNotAllowed"] = 1661] = "DestinyVendorPurchaseNotAllowed";
    PlatformErrorCodes[PlatformErrorCodes["DestinyContentVersionMismatch"] = 1662] = "DestinyContentVersionMismatch";
    PlatformErrorCodes[PlatformErrorCodes["DestinyItemActionForbidden"] = 1663] = "DestinyItemActionForbidden";
    PlatformErrorCodes[PlatformErrorCodes["DestinyRefundInvalid"] = 1664] = "DestinyRefundInvalid";
    PlatformErrorCodes[PlatformErrorCodes["DestinyPrivacyRestriction"] = 1665] = "DestinyPrivacyRestriction";
    PlatformErrorCodes[PlatformErrorCodes["DestinyActionInsufficientPrivileges"] = 1666] = "DestinyActionInsufficientPrivileges";
    PlatformErrorCodes[PlatformErrorCodes["DestinyInvalidClaimException"] = 1667] = "DestinyInvalidClaimException";
    PlatformErrorCodes[PlatformErrorCodes["DestinyLegacyPlatformRestricted"] = 1668] = "DestinyLegacyPlatformRestricted";
    PlatformErrorCodes[PlatformErrorCodes["DestinyLegacyPlatformInUse"] = 1669] = "DestinyLegacyPlatformInUse";
    PlatformErrorCodes[PlatformErrorCodes["DestinyLegacyPlatformInaccessible"] = 1670] = "DestinyLegacyPlatformInaccessible";
    PlatformErrorCodes[PlatformErrorCodes["DestinyCannotPerformActionAtThisLocation"] = 1671] = "DestinyCannotPerformActionAtThisLocation";
    PlatformErrorCodes[PlatformErrorCodes["DestinyThrottledByGameServer"] = 1672] = "DestinyThrottledByGameServer";
    PlatformErrorCodes[PlatformErrorCodes["FbInvalidRequest"] = 1800] = "FbInvalidRequest";
    PlatformErrorCodes[PlatformErrorCodes["FbRedirectMismatch"] = 1801] = "FbRedirectMismatch";
    PlatformErrorCodes[PlatformErrorCodes["FbAccessDenied"] = 1802] = "FbAccessDenied";
    PlatformErrorCodes[PlatformErrorCodes["FbUnsupportedResponseType"] = 1803] = "FbUnsupportedResponseType";
    PlatformErrorCodes[PlatformErrorCodes["FbInvalidScope"] = 1804] = "FbInvalidScope";
    PlatformErrorCodes[PlatformErrorCodes["FbUnsupportedGrantType"] = 1805] = "FbUnsupportedGrantType";
    PlatformErrorCodes[PlatformErrorCodes["FbInvalidGrant"] = 1806] = "FbInvalidGrant";
    PlatformErrorCodes[PlatformErrorCodes["InvitationExpired"] = 1900] = "InvitationExpired";
    PlatformErrorCodes[PlatformErrorCodes["InvitationUnknownType"] = 1901] = "InvitationUnknownType";
    PlatformErrorCodes[PlatformErrorCodes["InvitationInvalidResponseStatus"] = 1902] = "InvitationInvalidResponseStatus";
    PlatformErrorCodes[PlatformErrorCodes["InvitationInvalidType"] = 1903] = "InvitationInvalidType";
    PlatformErrorCodes[PlatformErrorCodes["InvitationAlreadyPending"] = 1904] = "InvitationAlreadyPending";
    PlatformErrorCodes[PlatformErrorCodes["InvitationInsufficientPermission"] = 1905] = "InvitationInsufficientPermission";
    PlatformErrorCodes[PlatformErrorCodes["InvitationInvalidCode"] = 1906] = "InvitationInvalidCode";
    PlatformErrorCodes[PlatformErrorCodes["InvitationInvalidTargetState"] = 1907] = "InvitationInvalidTargetState";
    PlatformErrorCodes[PlatformErrorCodes["InvitationCannotBeReactivated"] = 1908] = "InvitationCannotBeReactivated";
    PlatformErrorCodes[PlatformErrorCodes["InvitationNoRecipients"] = 1910] = "InvitationNoRecipients";
    PlatformErrorCodes[PlatformErrorCodes["InvitationGroupCannotSendToSelf"] = 1911] = "InvitationGroupCannotSendToSelf";
    PlatformErrorCodes[PlatformErrorCodes["InvitationTooManyRecipients"] = 1912] = "InvitationTooManyRecipients";
    PlatformErrorCodes[PlatformErrorCodes["InvitationInvalid"] = 1913] = "InvitationInvalid";
    PlatformErrorCodes[PlatformErrorCodes["InvitationNotFound"] = 1914] = "InvitationNotFound";
    PlatformErrorCodes[PlatformErrorCodes["TokenInvalid"] = 2000] = "TokenInvalid";
    PlatformErrorCodes[PlatformErrorCodes["TokenBadFormat"] = 2001] = "TokenBadFormat";
    PlatformErrorCodes[PlatformErrorCodes["TokenAlreadyClaimed"] = 2002] = "TokenAlreadyClaimed";
    PlatformErrorCodes[PlatformErrorCodes["TokenAlreadyClaimedSelf"] = 2003] = "TokenAlreadyClaimedSelf";
    PlatformErrorCodes[PlatformErrorCodes["TokenThrottling"] = 2004] = "TokenThrottling";
    PlatformErrorCodes[PlatformErrorCodes["TokenUnknownRedemptionFailure"] = 2005] = "TokenUnknownRedemptionFailure";
    PlatformErrorCodes[PlatformErrorCodes["TokenPurchaseClaimFailedAfterTokenClaimed"] = 2006] = "TokenPurchaseClaimFailedAfterTokenClaimed";
    PlatformErrorCodes[PlatformErrorCodes["TokenUserAlreadyOwnsOffer"] = 2007] = "TokenUserAlreadyOwnsOffer";
    PlatformErrorCodes[PlatformErrorCodes["TokenInvalidOfferKey"] = 2008] = "TokenInvalidOfferKey";
    PlatformErrorCodes[PlatformErrorCodes["TokenEmailNotValidated"] = 2009] = "TokenEmailNotValidated";
    PlatformErrorCodes[PlatformErrorCodes["TokenProvisioningBadVendorOrOffer"] = 2010] = "TokenProvisioningBadVendorOrOffer";
    PlatformErrorCodes[PlatformErrorCodes["TokenPurchaseHistoryUnknownError"] = 2011] = "TokenPurchaseHistoryUnknownError";
    PlatformErrorCodes[PlatformErrorCodes["TokenThrottleStateUnknownError"] = 2012] = "TokenThrottleStateUnknownError";
    PlatformErrorCodes[PlatformErrorCodes["TokenUserAgeNotVerified"] = 2013] = "TokenUserAgeNotVerified";
    PlatformErrorCodes[PlatformErrorCodes["TokenExceededOfferMaximum"] = 2014] = "TokenExceededOfferMaximum";
    PlatformErrorCodes[PlatformErrorCodes["TokenNoAvailableUnlocks"] = 2015] = "TokenNoAvailableUnlocks";
    PlatformErrorCodes[PlatformErrorCodes["TokenMarketplaceInvalidPlatform"] = 2016] = "TokenMarketplaceInvalidPlatform";
    PlatformErrorCodes[PlatformErrorCodes["TokenNoMarketplaceCodesFound"] = 2017] = "TokenNoMarketplaceCodesFound";
    PlatformErrorCodes[PlatformErrorCodes["TokenOfferNotAvailableForRedemption"] = 2018] = "TokenOfferNotAvailableForRedemption";
    PlatformErrorCodes[PlatformErrorCodes["TokenUnlockPartialFailure"] = 2019] = "TokenUnlockPartialFailure";
    PlatformErrorCodes[PlatformErrorCodes["TokenMarketplaceInvalidRegion"] = 2020] = "TokenMarketplaceInvalidRegion";
    PlatformErrorCodes[PlatformErrorCodes["TokenOfferExpired"] = 2021] = "TokenOfferExpired";
    PlatformErrorCodes[PlatformErrorCodes["RAFExceededMaximumReferrals"] = 2022] = "RAFExceededMaximumReferrals";
    PlatformErrorCodes[PlatformErrorCodes["RAFDuplicateBond"] = 2023] = "RAFDuplicateBond";
    PlatformErrorCodes[PlatformErrorCodes["RAFNoValidVeteranDestinyMembershipsFound"] = 2024] = "RAFNoValidVeteranDestinyMembershipsFound";
    PlatformErrorCodes[PlatformErrorCodes["RAFNotAValidVeteranUser"] = 2025] = "RAFNotAValidVeteranUser";
    PlatformErrorCodes[PlatformErrorCodes["RAFCodeAlreadyClaimedOrNotFound"] = 2026] = "RAFCodeAlreadyClaimedOrNotFound";
    PlatformErrorCodes[PlatformErrorCodes["RAFMismatchedDestinyMembershipType"] = 2027] = "RAFMismatchedDestinyMembershipType";
    PlatformErrorCodes[PlatformErrorCodes["RAFUnableToAccessPurchaseHistory"] = 2028] = "RAFUnableToAccessPurchaseHistory";
    PlatformErrorCodes[PlatformErrorCodes["RAFUnableToCreateBond"] = 2029] = "RAFUnableToCreateBond";
    PlatformErrorCodes[PlatformErrorCodes["RAFUnableToFindBond"] = 2030] = "RAFUnableToFindBond";
    PlatformErrorCodes[PlatformErrorCodes["RAFUnableToRemoveBond"] = 2031] = "RAFUnableToRemoveBond";
    PlatformErrorCodes[PlatformErrorCodes["RAFCannotBondToSelf"] = 2032] = "RAFCannotBondToSelf";
    PlatformErrorCodes[PlatformErrorCodes["RAFInvalidPlatform"] = 2033] = "RAFInvalidPlatform";
    PlatformErrorCodes[PlatformErrorCodes["RAFGenerateThrottled"] = 2034] = "RAFGenerateThrottled";
    PlatformErrorCodes[PlatformErrorCodes["RAFUnableToCreateBondVersionMismatch"] = 2035] = "RAFUnableToCreateBondVersionMismatch";
    PlatformErrorCodes[PlatformErrorCodes["RAFUnableToRemoveBondVersionMismatch"] = 2036] = "RAFUnableToRemoveBondVersionMismatch";
    PlatformErrorCodes[PlatformErrorCodes["RAFRedeemThrottled"] = 2037] = "RAFRedeemThrottled";
    PlatformErrorCodes[PlatformErrorCodes["NoAvailableDiscountCode"] = 2038] = "NoAvailableDiscountCode";
    PlatformErrorCodes[PlatformErrorCodes["DiscountAlreadyClaimed"] = 2039] = "DiscountAlreadyClaimed";
    PlatformErrorCodes[PlatformErrorCodes["DiscountClaimFailure"] = 2040] = "DiscountClaimFailure";
    PlatformErrorCodes[PlatformErrorCodes["DiscountConfigurationFailure"] = 2041] = "DiscountConfigurationFailure";
    PlatformErrorCodes[PlatformErrorCodes["DiscountGenerationFailure"] = 2042] = "DiscountGenerationFailure";
    PlatformErrorCodes[PlatformErrorCodes["DiscountAlreadyExists"] = 2043] = "DiscountAlreadyExists";
    PlatformErrorCodes[PlatformErrorCodes["TokenRequiresCredentialXuid"] = 2044] = "TokenRequiresCredentialXuid";
    PlatformErrorCodes[PlatformErrorCodes["TokenRequiresCredentialPsnid"] = 2045] = "TokenRequiresCredentialPsnid";
    PlatformErrorCodes[PlatformErrorCodes["OfferRequired"] = 2046] = "OfferRequired";
    PlatformErrorCodes[PlatformErrorCodes["ApiExceededMaxKeys"] = 2100] = "ApiExceededMaxKeys";
    PlatformErrorCodes[PlatformErrorCodes["ApiInvalidOrExpiredKey"] = 2101] = "ApiInvalidOrExpiredKey";
    PlatformErrorCodes[PlatformErrorCodes["ApiKeyMissingFromRequest"] = 2102] = "ApiKeyMissingFromRequest";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationDisabled"] = 2103] = "ApplicationDisabled";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationExceededMax"] = 2104] = "ApplicationExceededMax";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationDisallowedByScope"] = 2105] = "ApplicationDisallowedByScope";
    PlatformErrorCodes[PlatformErrorCodes["AuthorizationCodeInvalid"] = 2106] = "AuthorizationCodeInvalid";
    PlatformErrorCodes[PlatformErrorCodes["OriginHeaderDoesNotMatchKey"] = 2107] = "OriginHeaderDoesNotMatchKey";
    PlatformErrorCodes[PlatformErrorCodes["AccessNotPermittedByApplicationScope"] = 2108] = "AccessNotPermittedByApplicationScope";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationNameIsTaken"] = 2109] = "ApplicationNameIsTaken";
    PlatformErrorCodes[PlatformErrorCodes["RefreshTokenNotYetValid"] = 2110] = "RefreshTokenNotYetValid";
    PlatformErrorCodes[PlatformErrorCodes["AccessTokenHasExpired"] = 2111] = "AccessTokenHasExpired";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationTokenFormatNotValid"] = 2112] = "ApplicationTokenFormatNotValid";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationNotConfiguredForBungieAuth"] = 2113] = "ApplicationNotConfiguredForBungieAuth";
    PlatformErrorCodes[PlatformErrorCodes["ApplicationNotConfiguredForOAuth"] = 2114] = "ApplicationNotConfiguredForOAuth";
    PlatformErrorCodes[PlatformErrorCodes["OAuthAccessTokenExpired"] = 2115] = "OAuthAccessTokenExpired";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipInvalidType"] = 2200] = "PartnershipInvalidType";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipValidationError"] = 2201] = "PartnershipValidationError";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipValidationTimeout"] = 2202] = "PartnershipValidationTimeout";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipAccessFailure"] = 2203] = "PartnershipAccessFailure";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipAccountInvalid"] = 2204] = "PartnershipAccountInvalid";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipGetAccountInfoFailure"] = 2205] = "PartnershipGetAccountInfoFailure";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipDisabled"] = 2206] = "PartnershipDisabled";
    PlatformErrorCodes[PlatformErrorCodes["PartnershipAlreadyExists"] = 2207] = "PartnershipAlreadyExists";
    PlatformErrorCodes[PlatformErrorCodes["CommunityStreamingUnavailable"] = 2300] = "CommunityStreamingUnavailable";
    PlatformErrorCodes[PlatformErrorCodes["TwitchNotLinked"] = 2500] = "TwitchNotLinked";
    PlatformErrorCodes[PlatformErrorCodes["TwitchAccountNotFound"] = 2501] = "TwitchAccountNotFound";
    PlatformErrorCodes[PlatformErrorCodes["TwitchCouldNotLoadDestinyInfo"] = 2502] = "TwitchCouldNotLoadDestinyInfo";
    PlatformErrorCodes[PlatformErrorCodes["TrendingCategoryNotFound"] = 2600] = "TrendingCategoryNotFound";
    PlatformErrorCodes[PlatformErrorCodes["TrendingEntryTypeNotSupported"] = 2601] = "TrendingEntryTypeNotSupported";
})(PlatformErrorCodes = exports.PlatformErrorCodes || (exports.PlatformErrorCodes = {}));
/**
 * Enum for different stat category types
 * @enum
 */
var StatsCategoryType;
(function (StatsCategoryType) {
    StatsCategoryType[StatsCategoryType["None"] = 0] = "None";
    StatsCategoryType[StatsCategoryType["Kills"] = 1] = "Kills";
    StatsCategoryType[StatsCategoryType["Assists"] = 2] = "Assists";
    StatsCategoryType[StatsCategoryType["Deaths"] = 3] = "Deaths";
    StatsCategoryType[StatsCategoryType["Criticals"] = 4] = "Criticals";
    StatsCategoryType[StatsCategoryType["KDa"] = 5] = "KDa";
    StatsCategoryType[StatsCategoryType["KD"] = 6] = "KD";
    StatsCategoryType[StatsCategoryType["Score"] = 7] = "Score";
    StatsCategoryType[StatsCategoryType["Entered"] = 8] = "Entered";
    StatsCategoryType[StatsCategoryType["TimePlayed"] = 9] = "TimePlayed";
    StatsCategoryType[StatsCategoryType["MedalWins"] = 10] = "MedalWins";
    StatsCategoryType[StatsCategoryType["MedalGame"] = 11] = "MedalGame";
    StatsCategoryType[StatsCategoryType["MedalSpecialKills"] = 12] = "MedalSpecialKills";
    StatsCategoryType[StatsCategoryType["MedalSprees"] = 13] = "MedalSprees";
    StatsCategoryType[StatsCategoryType["MedalMultiKills"] = 14] = "MedalMultiKills";
    StatsCategoryType[StatsCategoryType["MedalAbilities"] = 15] = "MedalAbilities";
})(StatsCategoryType = exports.StatsCategoryType || (exports.StatsCategoryType = {}));
/**
 * Enum for different stat IDs
 * @enum
 */
var StatId;
(function (StatId) {
    StatId["ActivitiesClearedabilityKills"] = "DestinyInventoryItemDefinition";
    StatId["ActivitiesEntered"] = "ActivitiesEntered";
    StatId["ActivitiesWon"] = "ActivitiesWon";
    StatId["Assists"] = "Assists";
    StatId["AverageDeathDistance"] = "AverageDeathDistance";
    StatId["AverageKillDistance"] = "AverageKillDistance";
    StatId["AverageLifespan"] = "AverageLifespan";
    StatId["AverageScorePerKill"] = "AverageScorePerKill";
    StatId["AverageScorePerLife"] = "AverageScorePerLife";
    StatId["BestSingleGameKills"] = "BestSingleGameKills";
    StatId["BestSingleGameScore"] = "BestSingleGameScore";
    StatId["Completed"] = "Completed";
    StatId["FastestCompletionMsForActivity"] = "FastestCompletionMsForActivity";
    StatId["ActivityCompletions"] = "ActivityCompletions";
    StatId["ActivityDeaths"] = "ActivityDeaths";
    StatId["ActivityKills"] = "ActivityKills";
    StatId["ActivitySecondsPlayed"] = "ActivitySecondsPlayed";
    StatId["ActivityWins"] = "ActivityWins";
    StatId["ActivityGoalsMissed"] = "ActivityGoalsMissed";
    StatId["ActivityCompletedFailures"] = "ActivityCompletedFailures";
    StatId["ActivitySpecialActions"] = "ActivitySpecialActions";
    StatId["ActivityBestGoalsHit"] = "ActivityBestGoalsHit";
    StatId["ActivitySpecialScore"] = "ActivitySpecialScore";
    StatId["ActivityFastestObjectiveCompletionMs"] = "ActivityFastestObjectiveCompletionMs";
    StatId["ActivityBestSingleGameScore"] = "ActivityBestSingleGameScore";
    StatId["ActivityKillsDeathsRatio"] = "ActivityKillsDeathsRatio";
    StatId["ActivityKillsDeathsAssists"] = "ActivityKillsDeathsAssists";
    StatId["Deaths"] = "Deaths";
    StatId["Kills"] = "Kills";
    StatId["KillsDeathsRatio"] = "KillsDeathsRatio";
    StatId["KillsDeathsAssists"] = "KillsDeathsAssists";
    StatId["LbSingleGameKills"] = "LbSingleGameKills";
    StatId["LbPrecisionKills"] = "LbPrecisionKills";
    StatId["LbAssists"] = "LbAssists";
    StatId["LbDeaths"] = "LbDeaths";
    StatId["LbKills"] = "LbKills";
    StatId["LbObjectivesCompleted"] = "LbObjectivesCompleted";
    StatId["LbSingleGameScore"] = "LbSingleGameScore";
    StatId["MaximumPowerLevel"] = "MaximumPowerLevel";
    StatId["MedalAbilityDawnbladeAerial"] = "MedalAbilityDawnbladeAerial";
    StatId["MedalAbilityDawnbladeSlam"] = "MedalAbilityDawnbladeSlam";
    StatId["MedalAbilityFlowwalkerMulti"] = "MedalAbilityFlowwalkerMulti";
    StatId["MedalAbilityFlowwalkerQuick"] = "MedalAbilityFlowwalkerQuick";
    StatId["MedalAbilityGunslingerMulti"] = "MedalAbilityGunslingerMulti";
    StatId["MedalAbilityGunslingerQuick"] = "MedalAbilityGunslingerQuick";
    StatId["MedalAbilityJuggernautCombo"] = "MedalAbilityJuggernautCombo";
    StatId["MedalAbilityJuggernautSlam"] = "MedalAbilityJuggernautSlam";
    StatId["MedalAbilityNightstalkerLongRange"] = "MedalAbilityNightstalkerLongRange";
    StatId["MedalAbilityNightstalkerTetherQuick"] = "MedalAbilityNightstalkerTetherQuick";
    StatId["MedalAbilitySentinelCombo"] = "MedalAbilitySentinelCombo";
    StatId["MedalAbilitySentinelWard"] = "MedalAbilitySentinelWard";
    StatId["MedalAbilityStormcallerLandfall"] = "MedalAbilityStormcallerLandfall";
    StatId["MedalAbilityStormcallerMulti"] = "MedalAbilityStormcallerMulti";
    StatId["MedalAbilitySunbreakerLongRange"] = "MedalAbilitySunbreakerLongRange";
    StatId["MedalAbilitySunbreakerMulti"] = "MedalAbilitySunbreakerMulti";
    StatId["MedalAbilityVoidwalkerDistance"] = "MedalAbilityVoidwalkerDistance";
    StatId["MedalAbilityVoidwalkerVortex"] = "MedalAbilityVoidwalkerVortex";
    StatId["MedalAvenger"] = "MedalAvenger";
    StatId["MedalControlAdvantageHold"] = "MedalControlAdvantageHold";
    StatId["MedalControlAdvantageStreak"] = "MedalControlAdvantageStreak";
    StatId["MedalControlCaptureAllZones"] = "MedalControlCaptureAllZones";
    StatId["MedalControlMostAdvantage"] = "MedalControlMostAdvantage";
    StatId["MedalControlPerimeterKill"] = "MedalControlPerimeterKill";
    StatId["MedalControlPowerPlayWipe"] = "MedalControlPowerPlayWipe";
    StatId["MedalCountdownDefense"] = "MedalCountdownDefense";
    StatId["MedalCountdownDefusedLastStand"] = "MedalCountdownDefusedLastStand";
    StatId["MedalCountdownDefusedMulti"] = "MedalCountdownDefusedMulti";
    StatId["MedalCountdownDetonated"] = "MedalCountdownDetonated";
    StatId["MedalCountdownPerfect"] = "MedalCountdownPerfect";
    StatId["MedalCountdownRoundAllAlive"] = "MedalCountdownRoundAllAlive";
    StatId["MedalCycle"] = "MedalCycle";
    StatId["MedalDefeatHunterDodge"] = "MedalDefeatHunterDodge";
    StatId["MedalDefeatTitanBrace"] = "MedalDefeatTitanBrace";
    StatId["MedalDefeatWarlockSigil"] = "MedalDefeatWarlockSigil";
    StatId["MedalDefense"] = "MedalDefense";
    StatId["MedalMatchBlowout"] = "MedalMatchBlowout";
    StatId["MedalMatchComeback"] = "MedalMatchComeback";
    StatId["MedalMatchMostDamage"] = "MedalMatchMostDamage";
    StatId["MedalMatchNeverTrailed"] = "MedalMatchNeverTrailed";
    StatId["MedalMatchOvertime"] = "MedalMatchOvertime";
    StatId["MedalMatchUndefeated"] = "MedalMatchUndefeated";
    StatId["MedalMulti2x"] = "MedalMulti2x";
    StatId["MedalMulti3x"] = "MedalMulti3x";
    StatId["MedalMulti4x"] = "MedalMulti4x";
    StatId["MedalMultiEntireTeam"] = "MedalMultiEntireTeam";
    StatId["MedalPayback"] = "MedalPayback";
    StatId["MedalQuickStrike"] = "MedalQuickStrike";
    StatId["MedalStreak10x"] = "MedalStreak10x";
    StatId["MedalStreak5x"] = "MedalStreak5x";
    StatId["MedalStreakAbsurd"] = "MedalStreakAbsurd";
    StatId["MedalStreakCombined"] = "MedalStreakCombined";
    StatId["MedalStreakShutdown"] = "MedalStreakShutdown";
    StatId["MedalStreakTeam"] = "MedalStreakTeam";
    StatId["MedalSuperShutdown"] = "MedalSuperShutdown";
    StatId["MedalSupremacyCrestCreditStreak"] = "MedalSupremacyCrestCreditStreak";
    StatId["MedalSupremacyFirstCrest"] = "MedalSupremacyFirstCrest";
    StatId["MedalSupremacyNeverCollected"] = "MedalSupremacyNeverCollected";
    StatId["MedalSupremacyPerfectSecureRate"] = "MedalSupremacyPerfectSecureRate";
    StatId["MedalSupremacyRecoverStreak"] = "MedalSupremacyRecoverStreak";
    StatId["MedalSupremacySecureStreak"] = "MedalSupremacySecureStreak";
    StatId["MedalSurvivalComeback"] = "MedalSurvivalComeback";
    StatId["MedalSurvivalKnockout"] = "MedalSurvivalKnockout";
    StatId["MedalSurvivalQuickWipe"] = "MedalSurvivalQuickWipe";
    StatId["MedalSurvivalTeamUndefeated"] = "MedalSurvivalTeamUndefeated";
    StatId["MedalSurvivalUndefeated"] = "MedalSurvivalUndefeated";
    StatId["MedalSurvivalWinLastStand"] = "MedalSurvivalWinLastStand";
    StatId["MedalWeaponAuto"] = "MedalWeaponAuto";
    StatId["MedalWeaponFusion"] = "MedalWeaponFusion";
    StatId["MedalWeaponGrenade"] = "MedalWeaponGrenade";
    StatId["MedalWeaponHandCannon"] = "MedalWeaponHandCannon";
    StatId["MedalWeaponPulse"] = "MedalWeaponPulse";
    StatId["MedalWeaponRocket"] = "MedalWeaponRocket";
    StatId["MedalWeaponScout"] = "MedalWeaponScout";
    StatId["MedalWeaponShotgun"] = "MedalWeaponShotgun";
    StatId["MedalWeaponSidearm"] = "MedalWeaponSidearm";
    StatId["MedalWeaponSmg"] = "MedalWeaponSmg";
    StatId["MedalWeaponSniper"] = "MedalWeaponSniper";
    StatId["MedalWeaponSword"] = "MedalWeaponSword";
    StatId["MedalsUnknown"] = "MedalsUnknown";
    StatId["AllMedalsScore"] = "AllMedalsScore";
    StatId["AllMedalsEarned"] = "AllMedalsEarned";
    StatId["ObjectivesCompleted"] = "ObjectivesCompleted";
    StatId["PrecisionKills"] = "PrecisionKills";
    StatId["ResurrectionsPerformed"] = "ResurrectionsPerformed";
    StatId["ResurrectionsReceived"] = "ResurrectionsReceived";
    StatId["Score"] = "Score";
    StatId["SecondsPlayed"] = "SecondsPlayed";
    StatId["ActivityDurationSeconds"] = "ActivityDurationSeconds";
    StatId["Standing"] = "ActivityDurationSeconds";
    StatId["Suicides"] = "Suicides";
    StatId["Team"] = "Team";
    StatId["TotalDeathDistance"] = "TotalDeathDistance";
    StatId["TotalKillDistance"] = "TotalKillDistance";
    StatId["WeaponPrecisionKillsAutoRifle"] = "WeaponPrecisionKillsAutoRifle";
    StatId["WeaponPrecisionKillsFusionRifle"] = "WeaponPrecisionKillsFusionRifle";
    StatId["WeaponPrecisionKillsGrenade"] = "WeaponPrecisionKillsGrenade";
    StatId["WeaponPrecisionKillsHandCannon"] = "WeaponPrecisionKillsHandCannon";
    StatId["WeaponPrecisionKillsMachinegun"] = "WeaponPrecisionKillsMachinegun";
    StatId["WeaponPrecisionKillsMelee"] = "WeaponPrecisionKillsMelee";
    StatId["WeaponPrecisionKillsPulseRifle"] = "WeaponPrecisionKillsPulseRifle";
    StatId["WeaponPrecisionKillsRocketLauncher"] = "WeaponPrecisionKillsRocketLauncher";
    StatId["WeaponPrecisionKillsScoutRifle"] = "WeaponPrecisionKillsScoutRifle";
    StatId["WeaponPrecisionKillsShotgun"] = "WeaponPrecisionKillsShotgun";
    StatId["WeaponPrecisionKillsSniper"] = "WeaponPrecisionKillsSniper";
    StatId["WeaponPrecisionKillsSubmachinegun"] = "WeaponPrecisionKillsSubmachinegun";
    StatId["WeaponPrecisionKillsSuper"] = "WeaponPrecisionKillsSuper";
    StatId["WeaponPrecisionKillsRelic"] = "WeaponPrecisionKillsRelic";
    StatId["WeaponPrecisionKillsSideArm"] = "WeaponPrecisionKillsSideArm";
    StatId["WeaponKillsAutoRifle"] = "WeaponKillsAutoRifle";
    StatId["WeaponKillsFusionRifle"] = "WeaponKillsFusionRifle";
    StatId["WeaponKillsGrenade"] = "WeaponKillsGrenade";
    StatId["WeaponKillsHandCannon"] = "WeaponKillsHandCannon";
    StatId["WeaponKillsMachinegun"] = "WeaponKillsMachinegun";
    StatId["WeaponKillsMelee"] = "WeaponKillsMelee";
    StatId["WeaponKillsPulseRifle"] = "WeaponKillsPulseRifle";
    StatId["WeaponKillsRocketLauncher"] = "WeaponKillsRocketLauncher";
    StatId["WeaponKillsScoutRifle"] = "WeaponKillsScoutRifle";
    StatId["WeaponKillsShotgun"] = "WeaponKillsShotgun";
    StatId["WeaponKillsSniper"] = "WeaponKillsSniper";
    StatId["WeaponKillsSubmachinegun"] = "WeaponKillsSubmachinegun";
    StatId["WeaponKillsSuper"] = "WeaponKillsSuper";
    StatId["WeaponKillsRelic"] = "WeaponKillsRelic";
    StatId["WeaponKillsSideArm"] = "WeaponKillsSideArm";
    StatId["WeaponKillsSword"] = "WeaponKillsSword";
    StatId["WeaponKillsAbility"] = "WeaponKillsAbility";
    StatId["WeaponBestType"] = "WeaponBestType";
    StatId["WeaponKillsPrecisionKillsAutoRifle"] = "WeaponKillsPrecisionKillsAutoRifle";
    StatId["WeaponKillsPrecisionKillsFusionRifle"] = "WeaponKillsPrecisionKillsFusionRifle";
    StatId["WeaponKillsPrecisionKillsGrenade"] = "WeaponKillsPrecisionKillsGrenade";
    StatId["WeaponKillsPrecisionKillsHandCannon"] = "WeaponKillsPrecisionKillsHandCannon";
    StatId["WeaponKillsPrecisionKillsMachinegun"] = "WeaponKillsPrecisionKillsMachinegun";
    StatId["WeaponKillsPrecisionKillsMelee"] = "WeaponKillsPrecisionKillsMelee";
    StatId["WeaponKillsPrecisionKillsPulseRifle"] = "WeaponKillsPrecisionKillsPulseRifle";
    StatId["WeaponKillsPrecisionKillsRocketLauncher"] = "WeaponKillsPrecisionKillsRocketLauncher";
    StatId["WeaponKillsPrecisionKillsScoutRifle"] = "WeaponKillsPrecisionKillsScoutRifle";
    StatId["WeaponKillsPrecisionKillsShotgun"] = "WeaponKillsPrecisionKillsShotgun";
    StatId["WeaponKillsPrecisionKillsSniper"] = "WeaponKillsPrecisionKillsSniper";
    StatId["WeaponKillsPrecisionKillsSubmachinegun"] = "WeaponKillsPrecisionKillsSubmachinegun";
    StatId["WeaponKillsPrecisionKillsSuper"] = "WeaponKillsPrecisionKillsSuper";
    StatId["WeaponKillsPrecisionKillsRelic"] = "WeaponKillsPrecisionKillsRelic";
    StatId["WeaponKillsPrecisionKillsSideArm"] = "WeaponKillsPrecisionKillsSideArm";
    StatId["WinLossRatio"] = "WinLossRatio";
    StatId["UniqueWeaponAssists"] = "UniqueWeaponAssists";
    StatId["UniqueWeaponAssistDamage"] = "UniqueWeaponAssistDamage";
    StatId["UniqueWeaponKills"] = "UniqueWeaponKills";
    StatId["UniqueWeaponPrecisionKills"] = "UniqueWeaponPrecisionKills";
    StatId["UniqueWeaponKillsPrecisionKills"] = "UniqueWeaponKillsPrecisionKills";
    StatId["AllParticipantsCount"] = "AllParticipantsCount";
    StatId["AllParticipantsScore"] = "AllParticipantsScore";
    StatId["AllParticipantsTimePlayed"] = "AllParticipantsTimePlayed";
    StatId["ActivityAssists"] = "ActivityAssists";
    StatId["CompletionReason"] = "CompletionReason";
    StatId["FireteamId"] = "FireteamId";
    StatId["LongestKillSpree"] = "LongestKillSpree";
    StatId["LongestSingleLife"] = "LongestSingleLife";
    StatId["MostPrecisionKills"] = "MostPrecisionKills";
    StatId["OrbsDropped"] = "OrbsDropped";
    StatId["OrbsGathered"] = "OrbsGathered";
    StatId["StartSeconds"] = "StartSeconds";
    StatId["TimePlayedSeconds"] = "TimePlayedSeconds";
    StatId["PlayerCount"] = "PlayerCount";
    StatId["ActivityPrecisionKills"] = "ActivityPrecisionKills";
    StatId["PublicEventsCompleted"] = "PublicEventsCompleted";
    StatId["PublicEventsJoined"] = "PublicEventsJoined";
    StatId["RemainingTimeAfterQuitSeconds"] = "RemainingTimeAfterQuitSeconds";
    StatId["TeamScore"] = "TeamScore";
    StatId["TotalActivityDurationSeconds"] = "TotalActivityDurationSeconds";
    StatId["DailyMedalsEarned"] = "DailyMedalsEarned";
    StatId["CombatRating"] = "CombatRating";
    StatId["LbMostPrecisionKills"] = "LbMostPrecisionKills";
    StatId["LbLongestKillSpree"] = "LbLongestKillSpree";
    StatId["LbLongestKillDistance"] = "LbLongestKillDistance";
    StatId["LbFastestCompletionMs"] = "LbFastestCompletionMs";
    StatId["LbLongestSingleLife"] = "LbLongestSingleLife";
    StatId["FastestCompletionMs"] = "FastestCompletionMs";
    StatId["LongestKillDistance"] = "LongestKillDistance";
    StatId["HighestCharacterLevel"] = "HighestCharacterLevel";
    StatId["HighestLightLevel"] = "HighestLightLevel";
    StatId["HighestSandboxLevel"] = "HighestSandboxLevel";
    StatId["SparksCaptured"] = "SparksCaptured";
    StatId["SlamDunks"] = "SlamDunks";
    StatId["StyleDunks"] = "StyleDunks";
    StatId["DunkKills"] = "DunkKills";
    StatId["CarrierKills"] = "CarrierKills";
    StatId["ActivityGatesHit"] = "ActivityGatesHit";
    StatId["RaceCompletionSeconds"] = "RaceCompletionSeconds";
    StatId["GatesHit"] = "GatesHit";
    StatId["RaceCompletionMilliseconds"] = "RaceCompletionMilliseconds";
})(StatId = exports.StatId || (exports.StatId = {}));
/**
 * Enum for different type definitions
 * @enum
 */
var TypeDefinition;
(function (TypeDefinition) {
    TypeDefinition["DestinyActivityGraphDefinition"] = "DestinyActivityGraphDefinition";
    TypeDefinition["DestinyActivityModeDefinition"] = "DestinyActivityModeDefinition";
    TypeDefinition["DestinyActivityModifierDefinition"] = "DestinyActivityModifierDefinition";
    TypeDefinition["DestinyActivityTypeDefinition"] = "DestinyActivityTypeDefinition";
    TypeDefinition["DestinyBondDefinition"] = "DestinyBondDefinition";
    TypeDefinition["DestinyClassDefinition"] = "DestinyClassDefinition";
    TypeDefinition["DestinyDamageTypeDefinition"] = "DestinyDamageTypeDefinition";
    TypeDefinition["DestinyDestinationDefinition"] = "DestinyDestinationDefinition";
    TypeDefinition["DestinyEnemyRaceDefinition"] = "DestinyEnemyRaceDefinition";
    TypeDefinition["DestinyFactionDefinition"] = "DestinyFactionDefinition";
    TypeDefinition["DestinyGenderDefinition"] = "DestinyGenderDefinition";
    TypeDefinition["DestinyHistoricalStatsDefinition"] = "DestinyHistoricalStatsDefinition";
    TypeDefinition["DestinyInventoryBucketDefinition"] = "DestinyInventoryBucketDefinition";
    TypeDefinition["DestinyInventoryItemDefinition"] = "DestinyInventoryItemDefinition";
    TypeDefinition["DestinyItemCategoryDefinition"] = "DestinyItemCategoryDefinition";
    TypeDefinition["DestinyItemTierTypeDefinition"] = "DestinyItemTierTypeDefinition";
    TypeDefinition["DestinyLocationDefinition"] = "DestinyLocationDefinition";
    TypeDefinition["DestinyLoreDefinition"] = "DestinyLoreDefinition";
    TypeDefinition["DestinyMedalTierDefinition"] = "DestinyMedalTierDefinition";
    TypeDefinition["DestinyMilestoneDefinition"] = "DestinyMilestoneDefinition";
    TypeDefinition["DestinyObjectiveDefinition"] = "DestinyObjectiveDefinition";
    TypeDefinition["DestinyPlaceDefinition"] = "DestinyPlaceDefinition";
    TypeDefinition["DestinyProgressionDefinition"] = "DestinyProgressionDefinition";
    TypeDefinition["DestinyProgressionLevelRequirementDefinition"] = "DestinyProgressionLevelRequirementDefinition";
    TypeDefinition["DestinyRaceDefinition"] = "DestinyRaceDefinition";
    TypeDefinition["DestinyRewardSourceDefinition"] = "DestinyRewardSourceDefinition";
    TypeDefinition["DestinySackRewardItemListDefinition"] = "DestinySackRewardItemListDefinition";
    TypeDefinition["DestinySandboxPerkDefinition"] = "DestinySandboxPerkDefinition";
    TypeDefinition["DestinySocketCategoryDefinition"] = "DestinySocketCategoryDefinition";
    TypeDefinition["DestinySocketTypeDefinition"] = "DestinySocketTypeDefinition";
    TypeDefinition["DestinyStatDefinition"] = "DestinyStatDefinition";
    TypeDefinition["DestinyStatGroupDefinition"] = "DestinyStatGroupDefinition";
    TypeDefinition["DestinyTalentGridDefinition"] = "DestinyTalentGridDefinition";
    TypeDefinition["DestinyUnlockDefinition"] = "DestinyUnlockDefinition";
    TypeDefinition["DestinyVendorCategoryDefinition"] = "DestinyVendorCategoryDefinition";
    TypeDefinition["DestinyVendorDefinition"] = "DestinyVendorDefinition";
})(TypeDefinition = exports.TypeDefinition || (exports.TypeDefinition = {}));
/**
 * Enum for the transfer status of an item
 * @enum
 */
var TransferStatus;
(function (TransferStatus) {
    TransferStatus[TransferStatus["CanTransfer"] = 0] = "CanTransfer";
    TransferStatus[TransferStatus["ItemIsEquipped"] = 1] = "ItemIsEquipped";
    TransferStatus[TransferStatus["NotTransferrable"] = 2] = "NotTransferrable";
    TransferStatus[TransferStatus["NoRoomInDestination"] = 4] = "NoRoomInDestination";
})(TransferStatus = exports.TransferStatus || (exports.TransferStatus = {}));
/**
 * Enum for unit types
 * @enum
 */
var UnitType;
(function (UnitType) {
    UnitType[UnitType["None"] = 0] = "None";
    UnitType[UnitType["Count"] = 1] = "Count";
    UnitType[UnitType["PerGame"] = 2] = "PerGame";
    UnitType[UnitType["Seconds"] = 3] = "Seconds";
    UnitType[UnitType["Points"] = 4] = "Points";
    UnitType[UnitType["Team"] = 5] = "Team";
    UnitType[UnitType["Distance"] = 6] = "Distance";
    UnitType[UnitType["Percent"] = 7] = "Percent";
    UnitType[UnitType["Ratio"] = 8] = "Ratio";
    UnitType[UnitType["Boolean"] = 9] = "Boolean";
    UnitType[UnitType["WeaponType"] = 10] = "WeaponType";
    UnitType[UnitType["Standing"] = 11] = "Standing";
    UnitType[UnitType["Milliseconds"] = 12] = "Milliseconds";
})(UnitType = exports.UnitType || (exports.UnitType = {}));
/**
 * Enum for the vendor item refund policy
 * @enum
 */
var VendorItemRefundPolicy;
(function (VendorItemRefundPolicy) {
    VendorItemRefundPolicy[VendorItemRefundPolicy["NotRefundable"] = 0] = "NotRefundable";
    VendorItemRefundPolicy[VendorItemRefundPolicy["DeletesItem"] = 1] = "DeletesItem";
    VendorItemRefundPolicy[VendorItemRefundPolicy["RevokesLicense"] = 2] = "RevokesLicense";
})(VendorItemRefundPolicy = exports.VendorItemRefundPolicy || (exports.VendorItemRefundPolicy = {}));
/**
 * Enum for the vendor item status
 * @enum
 */
var VendorItemStatus;
(function (VendorItemStatus) {
    VendorItemStatus[VendorItemStatus["Success"] = 0] = "Success";
    VendorItemStatus[VendorItemStatus["NoInventorySpace"] = 1] = "NoInventorySpace";
    VendorItemStatus[VendorItemStatus["NoFunds"] = 2] = "NoFunds";
    VendorItemStatus[VendorItemStatus["NoProgression"] = 4] = "NoProgression";
    VendorItemStatus[VendorItemStatus["NoUnlock"] = 8] = "NoUnlock";
    VendorItemStatus[VendorItemStatus["NoQuantity"] = 16] = "NoQuantity";
    VendorItemStatus[VendorItemStatus["OutsidePurchaseWindow"] = 32] = "OutsidePurchaseWindow";
    VendorItemStatus[VendorItemStatus["NotAvailable"] = 64] = "NotAvailable";
    VendorItemStatus[VendorItemStatus["UniquenessViolation"] = 128] = "UniquenessViolation";
    VendorItemStatus[VendorItemStatus["UnknownError"] = 256] = "UnknownError";
    VendorItemStatus[VendorItemStatus["AlreadySelling"] = 512] = "AlreadySelling";
    VendorItemStatus[VendorItemStatus["Unsellable"] = 1024] = "Unsellable";
    VendorItemStatus[VendorItemStatus["SellingInhibited"] = 2048] = "SellingInhibited";
    VendorItemStatus[VendorItemStatus["AlreadyOwned"] = 4096] = "AlreadyOwned";
})(VendorItemStatus = exports.VendorItemStatus || (exports.VendorItemStatus = {}));
