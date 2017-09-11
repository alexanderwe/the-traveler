"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * Enum for Destiny acitivity mode type
 * @enum
 */
var DestinyActivityModeType;
(function (DestinyActivityModeType) {
    DestinyActivityModeType[DestinyActivityModeType["None"] = 0] = "None";
    DestinyActivityModeType[DestinyActivityModeType["Story"] = 2] = "Story";
    DestinyActivityModeType[DestinyActivityModeType["Strike"] = 3] = "Strike";
    DestinyActivityModeType[DestinyActivityModeType["Reserved4"] = 4] = "Reserved4";
    DestinyActivityModeType[DestinyActivityModeType["AllPvP"] = 5] = "AllPvP";
    DestinyActivityModeType[DestinyActivityModeType["Patrol"] = 6] = "Patrol";
    DestinyActivityModeType[DestinyActivityModeType["AllPvE"] = 7] = "AllPvE";
    DestinyActivityModeType[DestinyActivityModeType["Reserved9"] = 9] = "Reserved9";
    DestinyActivityModeType[DestinyActivityModeType["Control"] = 10] = "Control";
    DestinyActivityModeType[DestinyActivityModeType["Reserved11"] = 11] = "Reserved11";
    DestinyActivityModeType[DestinyActivityModeType["Team"] = 12] = "Team";
    DestinyActivityModeType[DestinyActivityModeType["Reserved13"] = 13] = "Reserved13";
    DestinyActivityModeType[DestinyActivityModeType["Reserved15"] = 15] = "Reserved15";
    DestinyActivityModeType[DestinyActivityModeType["Nightfall"] = 16] = "Nightfall";
    DestinyActivityModeType[DestinyActivityModeType["Heroic"] = 17] = "Heroic";
    DestinyActivityModeType[DestinyActivityModeType["AllStrikes"] = 18] = "AllStrikes";
    DestinyActivityModeType[DestinyActivityModeType["Reserved19"] = 19] = "Reserved19";
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
    DestinyActivityModeType[DestinyActivityModeType["Reserved32"] = 32] = "Reserved32";
    DestinyActivityModeType[DestinyActivityModeType["Survival"] = 37] = "Survival";
    DestinyActivityModeType[DestinyActivityModeType["Countdown"] = 38] = "Countdown";
    DestinyActivityModeType[DestinyActivityModeType["Reserved39"] = 39] = "Reserved39";
    DestinyActivityModeType[DestinyActivityModeType["Social"] = 40] = "Social";
})(DestinyActivityModeType = exports.DestinyActivityModeType || (exports.DestinyActivityModeType = {}));
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
 * Enum for different search types
 * @enum
 */
var SearchType;
(function (SearchType) {
    SearchType[SearchType["DestinyInventoryItemDefinition"] = 0] = "DestinyInventoryItemDefinition";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
