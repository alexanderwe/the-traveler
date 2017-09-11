
/**
 * Enum for Desinty component type
 * @enum 
 */
export enum ComponentType {
    None = 0,
    Profiles = 100,
    VendorReceipts = 101,
    ProfileInventories = 102,
    ProfileCurrencies = 103,
    Characters = 200,
    CharacterInventories = 201,
    CharacterProgressions = 202,
    CharacterRenderData = 203,
    CharacterActivities = 204,
    CharacterEquipment = 205,
    ItemInstances = 300,
    ItemObjectives = 301,
    ItemPerks = 302,
    ItemRenderData = 303,
    ItemStats = 304,
    ItemSockets = 305,
    ItemTalentGrids = 306,
    ItemCommonData = 307,
    ItemPlugStates = 308,
    Vendors = 400,
    VendorCategories = 401,
    VendorSales = 402,
    Kiosks = 500,
}

/**
 * Enum for Destiny acitivity mode type
 * @enum 
 */
export enum DestinyActivityModeType {
    None = 0,
    Story = 2,
    Strike = 3,
    Reserved4 = 4,
    AllPvP = 5,
    Patrol = 6,
    AllPvE = 7,
    Reserved9 = 9,
    Control = 10,
    Reserved11 = 11,
    Team = 12,
    Reserved13 = 13,
    Reserved15 = 15,
    Nightfall = 16,
    Heroic = 17,
    AllStrikes = 18,
    Reserved19 = 19,
    Reserved20 = 20,
    Reserved21 = 21,
    Reserved22 = 22,
    Reserved24 = 24,
    Reserved25 = 25,
    Reserved26 = 26,
    Reserved27 = 27,
    Reserved28 = 28,
    Reserved29 = 29,
    Reserved30 = 30,
    Reserved32 = 32,
    Survival = 37,
    Countdown = 38,
    Reserved39 = 39,
    Social = 40,
}

/**
 * Enum for Destiny stats group type
 * @enum 
 */
export enum DestinyStatsGroupType {
    None = 0,
    General = 1,
    Weapons = 2,
    Medals = 3,
    ReservedGroups = 100,
    Leadboards = 101,
    Activity = 102,
    UniqueWeapon = 103,
    Internal = 104,
}

/**
 * Enum for Destiny period type
 * @enum 
 */
export enum PeriodType {
    None = 0,
    Daily = 1,
    AllTime = 2,
    Activity = 3,
}

/**
 * Enum for different search types
 * @enum 
 */
export enum SearchType {
    DestinyInventoryItemDefinition,
}
