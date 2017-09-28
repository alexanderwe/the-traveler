import 'es6-map';
import { BungieMembershipType, TypeDefinition } from './enums';
import { IAPIResponse, IConfig, IDestinyActivityHistoryResults, IDestinyAggregateActivityResults, IDestinyCharacterResponse, IDestinyClanAggregateStat, IDestinyDefinition, IDestinyEntitySearchResult, IDestinyEquipItemResults, IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsByPeriod, IDestinyHistoricalStatsDefinition, IDestinyHistoricalWeaponStatsData, IDestinyItemActionRequest, IDestinyItemResponse, IDestinyItemSetActionRequest, IDestinyItemStateRequest, IDestinyItemTransferRequest, IDestinyManifest, IDestinyMilestone, IDestinyMilestoneContent, IDestinyPostGameCarnageReportData, IDestinyProfileResponse, IDestinyPublicMilestone, IDestinyVendorResponse, IOAuthResponse, IQueryStringParameters, IUserInfoCard } from './interfaces';
/**
 * Entry class for accessing the Destiny 2 API
 */
export default class Traveler {
    private apikey;
    private userAgent;
    private oauthConfig;
    private _oauth;
    private apibase;
    private rootURL;
    private httpService;
    private options;
    private oauthOptions;
    constructor(config: IConfig);
    /**
     * Gets the current manifest in a JSON document
     * @async
     * @return {Promise.IAPIResponse<IDestinyManifest>} When fulfilled returns an object containing the current Destiny 2 manifest
     */
    getDestinyManifest(): Promise<IAPIResponse<IDestinyManifest>>;
    /**
     * Returns the static definition of an entity of the given Type and hash identifier. Examine the API Documentation for the Type Names of entities that have their own definitions.
     * Note that the return type will always *inherit from* DestinyDefinition, but the specific type returned will be the requested entity type if it can be found.
     * Please don't use this as a chatty alternative to the Manifest database if you require large sets of data, but for simple and one-off accesses this should be handy.
     * @param entityType
     * @param hashIdentifier
     * @return {Promise.IAPIResponse<IDestinyDefinition>} When fulfilled returns an object containing the static definition of an entity.
     */
    getDestinyEntityDefinition(typeDefinition: TypeDefinition, hashIdentifier: string): Promise<IAPIResponse<IDestinyDefinition>>;
    /**
     * Search for a Destiny 2 player by name
     * @async
     * @param displayName The full gamertag or PSN id of the player. Spaces and case are ignored
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>4: PC (Blizzard)</li>
     * <li>254: Bungie</li>
     * </ul>
     * Keep in mind that `-1` or `MembershipType.All` is only applicable on this endpoint.
     * @return {Promise.IAPIResponse<IUserInfoCard>} When fulfilled returns an object containing information about the found user
     */
    searchDestinyPlayer(membershipType: BungieMembershipType, displayName: string): Promise<IAPIResponse<IUserInfoCard>>;
    /**
     * Retrieve information about the Destiny Profile
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint..
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyProfileResponse>} When fulfilled returns an object containing stats about the specified character
     */
    getProfile(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyProfileResponse>>;
    /**
     * Retrieve aggregrated details about a Destiny Characters
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param characterId ID of the character
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyCharacterResponse>} When fulfilled returns an object containing stats about the specified character
     */
    getCharacter(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyCharacterResponse>>;
    /**
     * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @return {Promise.IAPIResponse} When fulfilled returns an object containing information about the weekly clan results
     */
    getClanWeeklyRewardState(groupId: string): Promise<IAPIResponse<IDestinyMilestone>>;
    /**
     * Get the details of an instanced Destiny Item. Materials and other non-instanced items can not be queried with this endpoint.
     * The items are coupled with an specific Destiny Account
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param  destinyMembershipId The Destiny ID (Account ID)
     * @param  itemInstanceId: ID of the Destiny Item
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyItemResponse>} When fulfilled returns an object containing stats about the queried item
     */
    getItem(membershipType: BungieMembershipType, destinyMembershipId: string, itemInstanceId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyItemResponse>>;
    /**
     * Retrieve all currently available vendors for a specific character
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character for whom to get the vendor info
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyVendorResponse[]>} When fulfilled returns an object containing all available vendors
     */
    getVendors(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyVendorResponse[]>>;
    /**
     * Retrieve all currently available vendors for a specific character
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character for whom to get the vendor info
     * @param vendorHash Hash identifier of the vendor to retreieve
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyVendorResponse>} When fulfilled returns an object containing all available vendors
     */
    getVendor(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, vendorHash: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyVendorResponse>>;
    /**
     * Ge the post carnage report for a specific activity ID
     * @async
     * @param activityId The activity ID for getting the carnage report
     * @return {Promise.IAPIResponse<IDestinyPostGameCarnageReportData>} When fulfilled returns an object containing the carnage report for the specified activity
     */
    getPostGameCarnageReport(activityId: string): Promise<IAPIResponse<IDestinyPostGameCarnageReportData>>;
    /**
     * Get historical stats definitions. This contains the values for the `<br` key.
     * @async
     */
    getHistoricalStatsDefinition(): Promise<IAPIResponse<IDestinyHistoricalStatsDefinition>>;
    /**
     * Get the leaderboard of a clan
     * @async
     * @param groupId Group ID of the clan whose leaderboards you wish to fetch
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
     * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
     * {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
     * </ul>
     * @return {Promise.IAPIResponse<object>} When fulfilled returns an object containing leaderboards for a clan
     */
    getClanLeaderboards(groupId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<object>>;
    /**
     * Gets aggregated stats for a clan using the same categories as the clan leaderboards
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {string[]}: Array of game modes for which to get stats <br />
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyClanAggregateStat[]>} When fulfilled returns an object containing aggregated stats for a clan
     */
    getClanAggregateStats(groupId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyClanAggregateStat[]>>;
    /**
     * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus.
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
     * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
     * See {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
     * </ul>
     * @return {Promise.IAPIResponse<object>} When fulfilled returns an object containing the leaderboard
     */
    getLeaderboards(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<object>>;
    /**
     * Gets leaderboards for the specified character and friend's
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
     * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
     * See {@link https://github.com/alexanderwe/the-traveler/blob/master/docs/globals.html|<brs} for available ids</li>
     * </ul>
     * @return {Promise.IAPIResponse} When fulfilled returns an object containing the leaderboard
     */
    getLeaderboardsForCharacter(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<object>>;
    /**
     * Gets a page list of Destiny items
     * @async
     * @param searchTerm The string to use when searching for Destiny entities
     * @param typeDefinition The type of entity for which you want to search
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>page {number} Page number to return, starting with 0</li>
     * @return {Promise.IAPIResponse<IDestinyEntitySearchResult>} The entities search result
     */
    searchDestinyEntities(searchTerm: string, typeDefinition: TypeDefinition, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyEntitySearchResult>>;
    /**
     * Gets activity history stats for indicated character
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>dayend {string}: Last day to return when daily stats are requested. Use the format YYYY-MM-DD</li>
     * <li>daystart {string}: First day to return when daily stats are requested. Use the format YYYY-MM-DD</li>
     * <li>groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers.<br >/
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
     * </li>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats.<br >/
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>periodType {number}: Indicates a specific period type to return. <br >/
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-PeriodType.html#schema_Destiny-HistoricalStats-Definitions-PeriodType|PeriodType} for the different period type numbers
     * </li>
     * </ul>
     * @return {Promise.IAPIResponse} When fulfilled returns an object containing stats about the characters historical stats
     */
    getHistoricalStats(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<{
        [key: string]: IDestinyHistoricalStatsByPeriod;
    }>>;
    /**
     * Retrieve aggregrated details about a Destiny account's characters
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li> groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers. <br >/
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyHistoricalStatsAccountResult>} When fulfilled returns an object containing stats about the found user's account
     */
    getHistoricalStatsForAccount(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyHistoricalStatsAccountResult>>;
    /**
     * Gets activity history stats for indicated character
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>count {number}: Number of rows to return</li>
     * <li>mode {number} A single game mode to get the history for the specified character. <br />
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>page {number}: Page number to return, starting with 0</li>
     * </ul>
     * @return {Promise.IAPIResponse<IDestinyActivityHistoryResults>} When fulfilled returns an object containing stats for activities for the specified character
     */
    getActivityHistory(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyActivityHistoryResults>>;
    /**
     * Gets details about unique weapon usage, including all exotic weapons
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @return {Promise.IAPIResponse<IDestinyHistoricalWeaponStatsData>} When fulfilled returns an object containing information about the weapon usage for the indiciated character
     */
    getUniqueWeaponHistory(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string): Promise<IAPIResponse<IDestinyHistoricalWeaponStatsData>>;
    /**
     * Gets all activities the character has participated in together with aggregate statistics for those activities
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @return {Promise.IAPIResponse<IDestinyAggregateActivityResults>} When fulfilled returns an object containing aggregated information about recent activities
     */
    getAggregateActivityStats(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string): Promise<IAPIResponse<IDestinyAggregateActivityResults>>;
    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @async
     * @param milestoneHash The identifier for the milestone to be returned
     * @return {Promise.IAPIResponse<IDestinyMilestoneContent>} When fulfilled returns an object containing aggregated information about recent activities
     */
    getPublicMilestoneContent(milestoneHash: string): Promise<IAPIResponse<IDestinyMilestoneContent>>;
    /**
     * Gets public information about currently available Milestones
     * @async
     */
    getPublicMilestones(): Promise<IAPIResponse<{
        [key: string]: IDestinyPublicMilestone;
    }>>;
    /**
     * Equip an item from the inventory. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.
     * @async
     * @param itemActionRequest An object containing following keys: <br />
     * <ul>
     * <li>itemId {string} - The itemInstanceId (**not hash**) of the item you want to equipt</li>
     * <li>charcterId {string} The character ID of the character who gets the item</li>
     * <li>membershipType {number} The BungieMemberschipType</li>
     * </ul>
     */
    equipItem(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>>;
    /**
     * Equip multiple items from the inventory. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.
     * @async
     * @param itemActionRequest An object containing following keys: <br />
     * <ul>
     * <li>itemIds {string[]} - Multiple itemInstanceIds (**not hasesh**) of the items you want to equipt</li>
     * <li>charcterId {string} The character ID of the character who gets the item</li>
     * <li>membershipType {number} The BungieMemberschipType</li>
     * </ul>
     */
    equipItems(itemActionRequest: IDestinyItemSetActionRequest): Promise<IAPIResponse<IDestinyEquipItemResults>>;
    /**
     * Set the Lock State for an instanced item in your inventory. You must have a valid Destiny Account.
     * @async
     * @param stateRequest An object containing following keys: <br />
     * <ul>
     * <li>state {boolean}: Set lock state = true, remove lock state = false</li>
     * <li>itemId {string}: Multiple itemInstanceId (**not hash**) of the item which you want to change the lock state on</li>
     * <li>charcterId {string}: The character ID of the character who owns the item</li>
     * <li>membershipType {number}: The BungieMemberschipType</li>
     * </ul>
     */
    setItemLockState(stateRequest: IDestinyItemStateRequest): Promise<IAPIResponse<number>>;
    /**
     * Transfer an item to/from your vault. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item (in your inventory).
     * @async
     * @param transferRequest An object containing following keys: <br />
     * <ul>
     * <li>itemReferenceHash {string}: hash of the item</li>
     * <li>stackSize{number}: How many of the item</li>
     * <li>transferToVault {boolean} Transfer to vault - true, from vault - false</li>
     * <li>itemId {string}: itemInstanceId (**not hash**) of the item which you want to transfer/li>
     * <li>charcterId {string}: The character ID of the character who owns the item</li>
     * <li>membershipType {umber}: The BungieMemberschipType</li>
     * </ul>
     */
    transferItem(transferRequest: IDestinyItemTransferRequest): Promise<IAPIResponse<number>>;
    /**
     * Insert a plug into a socketed item. <strong>NOT RELEASED</strong>
     * @async
     * @not-released
     * @param itemActionRequest An object containing following keys: <br />
     * <ul>
     * <li>itemId {string} - The itemInstanceId (**not hash**) of the item you want to equipt</li>
     * <li>charcterId {string} The character ID of the character who gets the item</li>
     * <li>membershipType {number} The BungieMemberschipType</li>
     * </ul>
     */
    insertSocketPlug(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>>;
    /**
     * Activate a Talent Node <strong>NOT RELEASED</strong>
     * @async
     * @not-released
     * @param itemActionRequest An object containing following keys: <br />
     * <ul>
     * <li>itemId {string} - The itemInstanceId (**not hash**) of the node you want to activate/li>
     * <li>charcterId {string} The character ID of the character</li>
     * <li>membershipType {number} The BungieMemberschipType</li>
     * </ul>
     */
    activateTalentNode(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>>;
    /**
     * Generates the OAuthURL where your users need to sign up to give your application access to
     * authorized endpoints.
     */
    generateOAuthURL(): string;
    /**
     * Retreive the Oauth access token from the authorization code
     * @async
     * @param code The authorization code from the oauth redirect url
     */
    getAccessToken(code: string): Promise<IOAuthResponse>;
    /**
     * Use the refreshToken to retrieve a new valid access_token.
     * Please keep the expiration durations in mind.
     * <strong>This is only possible with a confidential app, as only this will get a refresh token to use</strong>
     * @async
     * @param refreshToken
     */
    refreshToken(refreshToken: string): Promise<IOAuthResponse>;
    /**
     * Generates the query string parameters out of the specified object which contains the parameters
     * @async
     * @param queryStringParameters: Object which contains the query keys and values
     * @return The query string to add to the endpoint url
     */
    private resolveQueryStringParameters(queryStringParameters);
    oauth: IOAuthResponse;
}
