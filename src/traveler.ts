import 'es6-promise';
import * as rp from 'request-promise-native';
const querystring = require('querystring');
import { BungieMembershipType, SearchType } from './enums';
import { IConfig, IOAuthConfig, IOAuthResponse, IQueryStringParameters } from './interfaces';

/**
 * Entry class for accessing the Destiny 2 API
 */
export default class Traveler {
    private apikey: string;
    private userAgent: string;
    private oauthConfig: IOAuthConfig;
    private oauth: IOAuthResponse;
    private apibase: string;
    private rootURL: string;
    private debug?: boolean = false;
    private options: rp.OptionsWithUri;

    constructor(config: IConfig) {
        this.apikey = config.apikey;
        this.userAgent = config.userAgent;
        this.oauthConfig = {
            clientId: config.oauthClientId,
            clientSecret: config.oauthClientSecret,
        };
        this.apibase = 'https://www.bungie.net/Platform/Destiny2';
        this.rootURL = 'https://www.bungie.net/';
        this.options = {
            headers: {
                'User-Agent': this.userAgent,
                'X-API-Key': this.apikey,
            },
            json: true,
            simple: true, // Automatically parses the JSON string in the response
            uri: '',
        };
        this.debug = config.debug;
    }

    /**
     * Gets the current manifest in a JSON document
     * @async
     * @return {Promise.Object} When fulfilled returns an object containing the current Destiny 2 manifest
     */
    public getDestinyManifest() {
        this.options.uri = `${this.apibase}/Manifest/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.Object} When fulfilled returns an object containing information about the found user
     */
    public searchDestinyPlayer(membershipType: BungieMembershipType, displayName: string): Promise<object> {
        this.options.uri = `${this.apibase}/SearchDestinyPlayer/${membershipType}/${displayName}/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing stats about the specified character
     */
    public getProfile(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing stats about the specified character
     */
    public getCharacter(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @return {Promise.object} When fulfilled returns an object containing information about the weekly clan results
     */
    public getClanWeeklyRewardState(groupId: string): Promise<object> {
        this.options.uri = `${this.apibase}/Clan/${groupId}/WeeklyRewardState/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing stats about the queried item
     */
    public getItem(membershipType: BungieMembershipType, destinyMembershipId: string, itemInstanceId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing all available vendors
     */
    public getVendors(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing all available vendors
     */
    public getVendor(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, vendorHash: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Ge the post carnage report for a specific activity ID
     * @async
     * @param activityId The activity ID for getting the carnage report
     * @return {Promise.object} When fulfilled returns an object containing the carnage report for the specified activity
     */
    public getPostGameCarnageReport(activityId: string): Promise<object> {
        this.options.uri = `${this.apibase}/Stats/PostGameCarnageReport/${activityId}/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Get historical stats definitions. This contains the values for the `<br` key.
     * @async
     */
    public getHistoricalStatsDefinition(): Promise<object> {
        this.options.uri = `${this.apibase}/Stats/Definition/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing leaderboards for a clan
     */
    public getClanLeaderboards(groupId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/Stats/Leaderboards/Clans/${groupId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Gets aggregated stats for a clan using the same categories as the clan leaderboards
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>modes {string[]}: Array of game modes for which to get stats <br />
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing aggregated stats for a clan
     */
    public getClanAggregateStats(groupId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/Stats/AggregateClanStats/${groupId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing the leaderboard
     */
    public getLeaderboards(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing the leaderboard
     */
    public getLeaderboardsForCharacter(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Gets a page list of Destiny items
     * @async
     * @param searchTerm The string to use when searching for Destiny entities
     * @param type The type of entity for whom you would like results
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>page {number} Page number to return, starting with 0</li>
     * @return {Promise.object} The entities search result
     */
    public searchDestinyEntities(searchTerm: string, type: SearchType, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/Armory/Search/${type}/${searchTerm}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing stats about the characters historical stats
     */
    public getHistoricalStats(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing stats about the found user's account
     */
    public getHistoricalStatsForAccount(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Stats/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
     * @return {Promise.object} When fulfilled returns an object containing stats for activities for the specified character
     */
    public getActivityHistory(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Gets details about unique weapon usage, including all exotic weapons
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @return {Promise.object} When fulfilled returns an object containing information about the weapon usage for the indiciated character
     */
    public getUniqueWeaponHistory(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Gets all activities the character has participated in together with aggregate statistics for those activities
     * @async
     * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
     * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
     * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @return {Promise.object} When fulfilled returns an object containing aggregated information about recent activities
     */
    public getAggregateActivityStats(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @async
     * @param milestoneHash The identifier for the milestone to be returned
     * @return {Promise.object} When fulfilled returns an object containing aggregated information about recent activities
     */
    public getPublicMilestoneContent(milestoneHash: string): Promise<object> {
        this.options.uri = `${this.apibase}/Milestones/${milestoneHash}/Content/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Gets public information about currently available Milestones
     * @async
     */
    public getPublicMilestones(): Promise<object> {
        this.options.uri = `${this.apibase}/Milestones/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Generates the OAuthURL where your users need to sign up to give your application access to 
     * authorized endpoints.
     */
    public generateOAuthURL(): string {
        if (this.oauthConfig.clientId !== undefined) {
            return `https://www.bungie.net/en/OAuth/Authorize?client_id=${this.oauthConfig.clientId}&response_type=code`;
        } else {
            throw new Error('You did not specify a oauth client id');
        }
    }

    /**
     * Retreive the Oauth access token from the authorization code
     * @param code The authorization code from the oauth redirect url
     */
    public getAccessToken(code: string): Promise<IOAuthResponse> {

        let options: rp.OptionsWithUri;
        if (this.oauthConfig.clientSecret) {  // you use a confidential client
            options = {
                body: querystring.stringify({
                    client_id: this.oauthConfig.clientId,
                    code: `${code}`,
                    grant_type: 'authorization_code',
                }),
                headers: {
                    'authorization': `Basic ${new Buffer(`${this.oauthConfig.clientId}:${this.oauthConfig.clientSecret}`).toString('base64')}`,
                    'content-type': 'application/x-www-form-urlencoded',

                },
                json: true,
                method: 'POST',
                uri: 'https://www.bungie.net/platform/app/oauth/token/',
            };
        } else {
            options = {
                body: querystring.stringify({
                    client_id: this.oauthConfig.clientId,
                    code: `${code}`,
                    grant_type: 'authorization_code',
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                json: true,
                method: 'POST',
                uri: 'https://www.bungie.net/platform/app/oauth/token/',
            };
        }
        return new Promise<IOAuthResponse>((resolve, reject) => {
            this.makeRequest(options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Use the refreshToken to retrieve a new valid access_token. 
     * Please keep the expiration durations in mind.
     * <strong>This is only possible with a confidential app, as only this will get a refresh token to use</strong>
     * @param refreshToken 
     */
    public refreshToken(refreshToken: string): Promise<IOAuthResponse> {
        const options = {
            body: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: `${refreshToken}`,
            }),
            headers: {
                'authorization': `Basic ${new Buffer(`${this.oauthConfig.clientId}:${this.oauthConfig.clientSecret}`).toString('base64')}`,
                'content-type': 'application/x-www-form-urlencoded',

            },
            json: true,
            method: 'POST',
            uri: 'https://www.bungie.net/platform/app/oauth/token/',
        };

        return new Promise<IOAuthResponse>((resolve, reject) => {
            this.makeRequest(options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Base function for making the request to the API endpoint. We need this, because we can do error validation, or agregated functions here.
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    private makeRequest(options: rp.OptionsWithUri): Promise<any> {
        if (this.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Debug url:' + options.uri);
        }
        return new Promise<object>((resolve, reject) => {
            rp(options)
                .then((response) => {
                    if (response.access_token) { // this is a oauth reponse
                        resolve(response);
                    } else if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Generates the query string parameters out of the specified object which contains the parameters
     * @param queryStringParameters: Object which contains the query keys and values
     * @return The query string to add to the endpoint url
     */
    private resolveQueryStringParameters(queryStringParameters: IQueryStringParameters): string {
        let queryString = '?';
        const end = Object.keys(queryStringParameters).length;
        let count = 0;

        for (const key in queryStringParameters) {
            if (queryStringParameters.hasOwnProperty(key)) {
                count++;
                const value = queryStringParameters[key];
                if (count !== end) {
                    queryString = queryString.concat(key, '=', value, '&');
                } else {
                    queryString = queryString.concat(key, '=', value);
                }
            }
        }
        return queryString;
    }
}
