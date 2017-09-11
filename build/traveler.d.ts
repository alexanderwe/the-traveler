import 'es6-promise';
import { SearchType } from './enums';
import { IConfig, IQueryStringParameters } from './interfaces';
/**
 * Entry class for accessing the Destiny 2 API
 */
export default class Traveler {
    private apikey;
    private apibase;
    private assetbase;
    private debug?;
    private options;
    constructor(config: IConfig);
    /**
     * Gets the current manifest in a JSON document
     * @async
     */
    getDestinyManifest(): Promise<object>;
    /**
     * Search for a Destiny 2 player by name
     * @async
     * @param displayName The full gamertag or PSN id of the player. Spaces and case are ignored
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @return {Promise.Object} When fulfilled returns an object containing information about the found user
     */
    searchDestinyPlayer(membershipType: string, displayName: string): Promise<object>;
    /**
     * Retrieve information about the Destiny Profile
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing stats about the specified character
     */
    getProfile(membershipType: string, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Retrieve aggregrated details about a Destiny Characters
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param characterId ID of the character
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing stats about the specified character
     */
    getCharacter(membershipType: string, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @return {Promise.object} When fulfilled returns an object containing information about the weekly clan results
     */
    getClanWeeklyRewardState(groupId: string): Promise<object>;
    /**
     * Get the details of an instanced Destiny Item. Materials and other non-instanced items can not be queried with this endpoint.
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param  destinyMembershipId The Destiny ID (Account ID)
     * @param  itemInstanceId: ID of the Destiny Item
     * @return {Promise.object} When fulfilled returns an object containing stats about the queried item
     */
    getItem(membershipType: string, destinyMembershipId: string, itemInstanceId: string): Promise<object>;
    /**
     * Retrieve all currently available vendors for a specific character
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character for whom to get the vendor info
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing all available vendors
     */
    getVendors(membershipType: string, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Retrieve all currently available vendors for a specific character
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character for whom to get the vendor info
     * @param vendorHash Hash identifier of the vendor to retreieve
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing all available vendors
     */
    getVendor(membershipType: string, destinyMembershipId: string, characterId: string, vendorHash: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Ge the post carnage report for a specific activity ID
     * @async
     * @param activityId The activity ID for getting the carnage report
     * @return {Promise.object} When fulfilled returns an object containing the carnage report for the specified activity
     */
    getPostGameCarnageReport(activityId: string): Promise<object>;
    /**
     * Get historical stats definitions. This contains the values for the `statId` key.
     * @async
     */
    getHistoricalStatsDefinition(): Promise<object>;
    /**
     * Get the leaderboard of a clan
     * @async
     * @param groupId Group ID of the clan whose leaderboards you wish to fetch
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
     * <li>statid {string}: ID of stat to return rather than returning all Leaderboard stats.
     * {@link https://github.com/alexanderwe/the-traveler/blob/master/docs/globals.html|StatIDs} for available ids</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing leaderboards for a clan
     */
    getClanLeaderboards(groupId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets aggregated stats for a clan using the same categories as the clan leaderboards
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {string[]}: Array of game modes for which to get stats
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing aggregated stats for a clan
     */
    getClanAggregateStats(groupId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus.
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
     * <li>statid {string}: ID of stat to return rather than returning all Leaderboard stats.
     * {@link https://github.com/alexanderwe/the-traveler/blob/master/docs/globals.html|StatIDs} for available ids</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing the leaderboard
     */
    getLeaderboards(membershipType: string, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets leaderboards for the specified character and friend's
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
     * <li>statid {string}: ID of stat to return rather than returning all Leaderboard stats.
     * {@link https://github.com/alexanderwe/the-traveler/blob/master/docs/globals.html|StatIDs} for available ids</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing the leaderboard
     */
    getLeaderboardsForCharacter(membershipType: string, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets a page list of Destiny items
     * @async
     * @param searchTerm The string to use when searching for Destiny entities
     * @param type The type of entity for whom you would like results
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>page {number} Page number to return, starting with 0
     * @return {Promise.object} The entities search result
     */
    searchDestinyEntities(searchTerm: string, type: SearchType, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets activity history stats for indicated character
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>dayend {string}: Last day to return when daily stats are requested. Use the format YYYY-MM-DD</li>
     * <li>daystart {string}: First day to return when daily stats are requested. Use the format YYYY-MM-DD</li>
     * <li>groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers.
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
     * </li>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats.
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>periodType {number}: Indicates a specific period type to return.
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-PeriodType.html#schema_Destiny-HistoricalStats-Definitions-PeriodType|PeriodType} for the different period type numbers
     * </li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing stats about the characters historical stats
     */
    getHistoricalStats(membershipType: string, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Retrieve aggregrated details about a Destiny account's characters
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li> groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers.
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing stats about the found user's account
     */
    getHistoricalStatsForAccount(membershipType: string, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets activity history stats for indicated character
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>count {number}: Number of rows to return</li>
     * <li>modes {strings[]} Different gameMode IDs for which to get the stats.
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>page {number}: Page number to return, starting with 0</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing stats for activities for the specified character
     */
    getActivityHistory(membershipType: string, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object>;
    /**
     * Gets details about unique weapon usage, including all exotic weapons
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @return {Promise.object} When fulfilled returns an object containing information about the weapon usage for the indiciated character
     */
    getUniqueWeaponHistory(membershipType: string, destinyMembershipId: string, characterId: string): Promise<object>;
    /**
     * Gets all activities the character has participated in together with aggregate statistics for those activities
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @return {Promise.object} When fulfilled returns an object containing aggregated information about recent activities
     */
    getAggregateActivityStats(membershipType: string, destinyMembershipId: string, characterId: string): Promise<object>;
    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @async
     * @param milestoneHash The identifier for the milestone to be returned
     */
    getPublicMilestoneContent(milestoneHash: string): Promise<object>;
    /**
     * Gets public information about currently available Milestones
     * @async
     */
    getPublicMilestones(): Promise<object>;
    /**
     * Base function for making the request to the API endpoint. We need this, because we can do error validation, or agregated functions here.
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    private makeRequest(options);
    /**
     * Generates the query string parameters out of the specified object which contains the parameters
     * @param queryStringParameters: Object which contains the query keys and values
     * @return The query string to add to the endpoint url
     */
    private resolveQueryStringParameters(queryStringParameters);
}
