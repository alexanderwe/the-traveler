
import * as fs from 'fs';
import * as SZIP from 'node-stream-zip';
import * as querystring from 'querystring';
import * as request from 'request';
import * as rp from 'request-promise-native';
import { BungieMembershipType, TypeDefinition } from './enums';
import HTTPService from './HttpService';
import {
    IAPIResponse,
    IConfig,
    IDestinyActivityHistoryResults,
    IDestinyAdvancedAwaInitializeResponse,
    IDestinyAdvancedAwaPermissionRequested,
    IDestinyAggregateActivityResults,
    IDestinyCharacterResponse,
    IDestinyClanAggregateStat,
    IDestinyDefinition,
    IDestinyEntitySearchResult,
    IDestinyEquipItemResults,
    IDestinyHistoricalStatsAccountResult,
    IDestinyHistoricalStatsByPeriod,
    IDestinyHistoricalStatsDefinition,
    IDestinyHistoricalWeaponStatsData,
    IDestinyItemActionRequest,
    IDestinyItemResponse,
    IDestinyItemSetActionRequest,
    IDestinyItemStateRequest,
    IDestinyItemTransferRequest,
    IDestinyManifest,
    IDestinyMilestone,
    IDestinyMilestoneContent,
    IDestinyPostGameCarnageReportData,
    IDestinyPostMasterTransferRequest,
    IDestinyProfileResponse,
    IDestinyPublicMilestone,
    IDestinyReportOffensePgcrRequest,
    IDestinyVendorResponse,
    IOAuthConfig,
    IOAuthResponse,
    IQueryStringParameters,
    IUserInfoCard,
    IUserMembershipData,
} from './interfaces';
import OAuthError from './OAuthError';

/**
 * Entry class for accessing the Destiny 2 API
 */
export default class Traveler {
    private apikey: string;
    private userAgent: string;
    private oauthConfig: IOAuthConfig;
    private _oauth: IOAuthResponse;
    private apibase: string;
    private rootURL: string;
    private httpService: HTTPService;
    private options: rp.OptionsWithUri;
    private oauthOptions: rp.OptionsWithUri; // Used when making authenticated calls to the API

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
        this.httpService = new HTTPService(config.debug);
    }

    /**
     * Gets the current manifest in a JSON document
     * @async
     * @return {Promise.IAPIResponse<IDestinyManifest>} When fulfilled returns an object containing the current Destiny 2 manifest
     */
    public getDestinyManifest(): Promise<IAPIResponse<IDestinyManifest>> {
        this.options.uri = `${this.apibase}/Manifest/`;
        return new Promise<IAPIResponse<IDestinyManifest>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyManifest>) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Returns the static definition of an entity of the given Type and hash identifier. Examine the API Documentation for the Type Names of entities that have their own definitions.
     * Note that the return type will always *inherit from* DestinyDefinition, but the specific type returned will be the requested entity type if it can be found.
     * Please don't use this as a chatty alternative to the Manifest database if you require large sets of data, but for simple and one-off accesses this should be handy.
     * @param entityType
     * @param hashIdentifier
     * @return {Promise.IAPIResponse<IDestinyDefinition>} When fulfilled returns an object containing the static definition of an entity.
     */
    public getDestinyEntityDefinition(typeDefinition: TypeDefinition, hashIdentifier: string): Promise<IAPIResponse<IDestinyDefinition>> {
        this.options.uri = `${this.apibase}/Manifest/${typeDefinition}/${hashIdentifier}/`;
        return new Promise<IAPIResponse<IDestinyDefinition>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyDefinition>) => {
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
     * @return {Promise.IAPIResponse<IUserInfoCard[]>} When fulfilled returns an object containing information about the found user
     */
    public searchDestinyPlayer(membershipType: BungieMembershipType, displayName: string): Promise<IAPIResponse<IUserInfoCard[]>> {
        this.options.uri = `${this.apibase}/SearchDestinyPlayer/${membershipType}/${displayName}/`;
        return new Promise<IAPIResponse<IUserInfoCard[]>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IUserInfoCard[]>) => {
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
     * @return {Promise.IAPIResponse<IDestinyProfileResponse>} When fulfilled returns an object containing information about the user profile 
     */
    public getProfile(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyProfileResponse>> {
        if (this.oauthOptions) { // if we have oauth available use it
            this.oauthOptions.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
            return new Promise<IAPIResponse<IDestinyProfileResponse>>((resolve, reject) => {
                this.httpService.get(this.oauthOptions)
                    .then((response: IAPIResponse<IDestinyProfileResponse>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
            return new Promise<IAPIResponse<IDestinyProfileResponse>>((resolve, reject) => {
                this.httpService.get(this.options)
                    .then((response: IAPIResponse<IDestinyProfileResponse>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }

    }

    /**
     * Retrieve information about the Bungie.net profile of the currently authenticated user
     * @async
     * @return {Promise.IAPIResponse<IUserMembershipData>} When fulfilled returns an object containing information about the membership data of the current logged in user.
     */
    public getMembershipDataForCurrentUser(): Promise<IAPIResponse<IUserMembershipData>> {
        if (this.oauthOptions) {
            this.oauthOptions.uri = `${this.rootURL}Platform/User/GetMembershipsForCurrentUser/`;
            return new Promise<IAPIResponse<IUserMembershipData>>((resolve, reject) => {
                this.httpService.get(this.oauthOptions)
                    .then((response: IAPIResponse<IUserMembershipData>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
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
     * @return {Promise.IAPIResponse<IDestinyCharacterResponse>} When fulfilled returns an object containing stats about the specified character
     */
    public getCharacter(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyCharacterResponse>> {
        if (this.oauthOptions) { // if we have oauth available use it
            this.oauthOptions.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
            return new Promise<IAPIResponse<IDestinyCharacterResponse>>((resolve, reject) => {
                this.httpService.get(this.oauthOptions)
                    .then((response: IAPIResponse<IDestinyCharacterResponse>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
            return new Promise<IAPIResponse<IDestinyCharacterResponse>>((resolve, reject) => {
                this.httpService.get(this.options)
                    .then((response: IAPIResponse<IDestinyCharacterResponse>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }

    /**
     * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @return {Promise.IAPIResponse} When fulfilled returns an object containing information about the weekly clan results
     */
    public getClanWeeklyRewardState(groupId: string): Promise<IAPIResponse<IDestinyMilestone>> {
        this.options.uri = `${this.apibase}/Clan/${groupId}/WeeklyRewardState/`;
        return new Promise<IAPIResponse<IDestinyMilestone>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyMilestone>) => {
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
     * @return {Promise.IAPIResponse<IDestinyItemResponse>} When fulfilled returns an object containing stats about the queried item
     */
    public getItem(membershipType: BungieMembershipType, destinyMembershipId: string, itemInstanceId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyItemResponse>> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<IDestinyItemResponse>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyItemResponse>) => {
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
     * @return {Promise.IAPIResponse<IDestinyVendorResponse[]>} When fulfilled returns an object containing all available vendors
     */
    public getVendors(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyVendorResponse[]>> {
        if (this.oauthOptions) { // if we have oauth available use it
            this.oauthOptions.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${this.resolveQueryStringParameters(queryStringParameters)}`;
            return new Promise<IAPIResponse<IDestinyVendorResponse[]>>((resolve, reject) => {
                this.httpService.get(this.oauthOptions)
                    .then((response: IAPIResponse<IDestinyVendorResponse[]>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${this.resolveQueryStringParameters(queryStringParameters)}`;
            return new Promise<IAPIResponse<IDestinyVendorResponse[]>>((resolve, reject) => {
                this.httpService.get(this.options)
                    .then((response: IAPIResponse<IDestinyVendorResponse[]>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }

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
     * @return {Promise.IAPIResponse<IDestinyVendorResponse>} When fulfilled returns an object containing all available vendors
     */
    public getVendor(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, vendorHash: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyVendorResponse>> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<IDestinyVendorResponse>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyVendorResponse>) => {
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
     * @return {Promise.IAPIResponse<IDestinyPostGameCarnageReportData>} When fulfilled returns an object containing the carnage report for the specified activity
     */
    public getPostGameCarnageReport(activityId: string): Promise<IAPIResponse<IDestinyPostGameCarnageReportData>> {
        this.options.uri = `${this.apibase}/Stats/PostGameCarnageReport/${activityId}/`;
        return new Promise<IAPIResponse<IDestinyPostGameCarnageReportData>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyPostGameCarnageReportData>) => {
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
    public getHistoricalStatsDefinition(): Promise<IAPIResponse<IDestinyHistoricalStatsDefinition>> {
        this.options.uri = `${this.apibase}/Stats/Definition/`;
        return new Promise<IAPIResponse<IDestinyHistoricalStatsDefinition>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyHistoricalStatsDefinition>) => {
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
     * @return {Promise.IAPIResponse<object>} When fulfilled returns an object containing leaderboards for a clan
     */
    public getClanLeaderboards(groupId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<object>> {
        this.options.uri = `${this.apibase}/Stats/Leaderboards/Clans/${groupId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<object>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<object>) => {
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
     * @return {Promise.IAPIResponse<IDestinyClanAggregateStat[]>} When fulfilled returns an object containing aggregated stats for a clan
     */
    public getClanAggregateStats(groupId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyClanAggregateStat[]>> {
        this.options.uri = `${this.apibase}/Stats/AggregateClanStats/${groupId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<IDestinyClanAggregateStat[]>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyClanAggregateStat[]>) => {
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
     * @return {Promise.IAPIResponse<object>} When fulfilled returns an object containing the leaderboard
     */
    public getLeaderboards(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<object>> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<object>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<object>) => {
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
     * @return {Promise.IAPIResponse} When fulfilled returns an object containing the leaderboard
     */
    public getLeaderboardsForCharacter(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<object>> {
        this.options.uri = `${this.apibase}/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<object>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<object>) => {
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
     * @param typeDefinition The type of entity for which you want to search
     * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
     * <ul>
     * <li>page {number} Page number to return, starting with 0</li>
     * @return {Promise.IAPIResponse<IDestinyEntitySearchResult>} The entities search result
     */
    public searchDestinyEntities(searchTerm: string, typeDefinition: TypeDefinition, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyEntitySearchResult>> {
        this.options.uri = `${this.apibase}/Armory/Search/${typeDefinition}/${searchTerm}/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<IDestinyEntitySearchResult>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyEntitySearchResult>) => {
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
     * @return {Promise.IAPIResponse} When fulfilled returns an object containing stats about the characters historical stats
     */
    public getHistoricalStats(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<{
        [key: string]: IDestinyHistoricalStatsByPeriod;
    }>> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<{
            [key: string]: IDestinyHistoricalStatsByPeriod;
        }>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<{
                    [key: string]: IDestinyHistoricalStatsByPeriod;
                }>) => {
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
     * @return {Promise.IAPIResponse<IDestinyHistoricalStatsAccountResult>} When fulfilled returns an object containing stats about the found user's account
     */
    public getHistoricalStatsForAccount(membershipType: BungieMembershipType, destinyMembershipId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyHistoricalStatsAccountResult>> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Stats/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<IDestinyHistoricalStatsAccountResult>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyHistoricalStatsAccountResult>) => {
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
     * @return {Promise.IAPIResponse<IDestinyActivityHistoryResults>} When fulfilled returns an object containing stats for activities for the specified character
     */
    public getActivityHistory(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string, queryStringParameters: IQueryStringParameters): Promise<IAPIResponse<IDestinyActivityHistoryResults>> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/${this.resolveQueryStringParameters(queryStringParameters)}`;
        return new Promise<IAPIResponse<IDestinyActivityHistoryResults>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyActivityHistoryResults>) => {
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
     * @return {Promise.IAPIResponse<IDestinyHistoricalWeaponStatsData>} When fulfilled returns an object containing information about the weapon usage for the indiciated character
     */
    public getUniqueWeaponHistory(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string): Promise<IAPIResponse<IDestinyHistoricalWeaponStatsData>> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`;
        return new Promise<IAPIResponse<IDestinyHistoricalWeaponStatsData>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyHistoricalWeaponStatsData>) => {
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
     * @return {Promise.IAPIResponse<IDestinyAggregateActivityResults>} When fulfilled returns an object containing aggregated information about recent activities
     */
    public getAggregateActivityStats(membershipType: BungieMembershipType, destinyMembershipId: string, characterId: string): Promise<IAPIResponse<IDestinyAggregateActivityResults>> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`;
        return new Promise<IAPIResponse<IDestinyAggregateActivityResults>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyAggregateActivityResults>) => {
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
     * @return {Promise.IAPIResponse<IDestinyMilestoneContent>} When fulfilled returns an object containing aggregated information about recent activities
     */
    public getPublicMilestoneContent(milestoneHash: string): Promise<IAPIResponse<IDestinyMilestoneContent>> {
        this.options.uri = `${this.apibase}/Milestones/${milestoneHash}/Content/`;
        return new Promise<IAPIResponse<IDestinyMilestoneContent>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<IDestinyMilestoneContent>) => {
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
    public getPublicMilestones(): Promise<IAPIResponse<{ [key: string]: IDestinyPublicMilestone }>> {
        this.options.uri = `${this.apibase}/Milestones/`;
        return new Promise<IAPIResponse<{ [key: string]: IDestinyPublicMilestone }>>((resolve, reject) => {
            this.httpService.get(this.options)
                .then((response: IAPIResponse<{ [key: string]: IDestinyPublicMilestone }>) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
    public equipItem(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = itemActionRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/EquipItem/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<number>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<number>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

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
    public equipItems(itemActionRequest: IDestinyItemSetActionRequest): Promise<IAPIResponse<IDestinyEquipItemResults>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = itemActionRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/EquipItems/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<IDestinyEquipItemResults>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<IDestinyEquipItemResults>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

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
    public setItemLockState(stateRequest: IDestinyItemStateRequest): Promise<IAPIResponse<number>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = stateRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/SetLockState/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<number>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<number>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

    /**
     * Extract an item from the Postmaster, with whatever implications that may entail. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item.
     * @async
     * @param postMasterTransferRequest 
     */
    public pullFromPostmaster(postMasterTransferRequest: IDestinyPostMasterTransferRequest): Promise<IAPIResponse<number>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = postMasterTransferRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/PullFromPostmaster/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<number>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<number>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

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
    public transferItem(transferRequest: IDestinyItemTransferRequest): Promise<IAPIResponse<number>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = transferRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/TransferItem/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<number>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<number>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

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
    public insertSocketPlug(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = itemActionRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/InsertSocketPlug/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<number>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<number>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

    /**
     * Activate a Talent Node <strong>NOT RELEASED</strong>
     * @async
     * @not-released
     * @param itemActionRequest An object containing following keys: <br />
     * <ul>
     * <li>itemId {string} - The itemInstanceId (**not hash**) of the node you want to activate</li>
     * <li>charcterId {string} - The character ID of the character</li>
     * <li>membershipType {number} - The BungieMemberschipType</li>
     * </ul>
     */
    public activateTalentNode(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = itemActionRequest;
            this.oauthOptions.uri = `${this.apibase}/Actions/Items/ActivateTalentNode/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<number>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<number>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

    /**
     * Initialize a request to perform an advanced write action.
     * @async
     * @param awaPermissionRequest An object containing following keys: <br />
     * <ul>
     * <li>type {object} - Type of advanced write action.</li>
     * <li>charcterId {number} - Item instance ID the action shall be applied to. This is optional for all but a new AwaType values. Rule of thumb is to provide the item instance ID if one is available.</li>
     * <li>membershipType {number} - The BungieMemberschipType</li>
     * <li>characterId {number} Destiny character ID, if applicable, that will be affected by the action.</li>
     * </ul>
     * 
     */
    public awaInitializeRequest(awaPermissionRequest: IDestinyAdvancedAwaPermissionRequested): Promise<IAPIResponse<IDestinyAdvancedAwaInitializeResponse>> {
        if (this.oauth !== undefined) {
            this.oauthOptions.body = awaPermissionRequest;
            this.oauthOptions.uri = `${this.apibase}/Awa/Initialize/`;
            this.oauthOptions.json = true;
            return new Promise<IAPIResponse<IDestinyAdvancedAwaInitializeResponse>>((resolve, reject) => {
                this.httpService.post(this.oauthOptions)
                    .then((response: IAPIResponse<IDestinyAdvancedAwaInitializeResponse>) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } else {
            throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
        }
    }

    /**
     * Generates the OAuthURL where your users need to sign up to give your application access to
     * authorized endpoints.
     */
    public generateOAuthURL(): string {
        if (this.oauthConfig.clientId !== undefined) {
            return `https://www.bungie.net/en/OAuth/Authorize?client_id=${this.oauthConfig.clientId}&response_type=code`;
        } else {
            throw new OAuthError('You did not specify a OAuth client ID. Your OAuth config is this: ' + JSON.stringify(this.oauthConfig));
        }
    }

    /**
     * Retreive the Oauth access token from the authorization code
     * @async
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
                    'user-agent': this.userAgent,

                },
                json: true,
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
                    'user-agent': this.userAgent,
                },
                json: true,
                uri: 'https://www.bungie.net/platform/app/oauth/token/',
            };
        }
        return new Promise<IOAuthResponse>((resolve, reject) => {
            this.httpService.post(options)
                .then((response: IOAuthResponse) => {
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
     * @async
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
            this.httpService.post(options)
                .then((response: IOAuthResponse) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Download the specified manifest file
     * @async
     * @param manifestUrl The url of the manifest you want to download
     * @param filename The filename of the final unzipped file. This is used for the constructor of [[Manifest]]
     * @return {Promise.string} When fulfilled returns the path of the saved manifest file
     */
    public downloadManifest(manifestUrl: string, filename?: string): Promise<string> {
        this.options.uri = `https://www.bungie.net/${manifestUrl}`;
        const outStream = fs.createWriteStream(`${manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}.zip`);
        return new Promise<string>((resolve, reject) => {
            request(this.options)
                .on('response', (res: any, body: any) => {
                    // do nothing
                }).pipe(outStream)
                .on('finish', () => {
                    const zip = new SZIP({
                        file: `${manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}.zip`,
                        storeEntries: true,
                    });

                    const fileName = manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1);

                    zip.on('ready', () => {
                        zip.extract(manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1), filename, (err: object, count: number) => {

                            if (err) {
                                reject(new Error('Error extracting zip'));
                            } else {
                                resolve(filename);
                            }
                        });
                    });
                });
        });
    }

    /**
     * Generates the query string parameters out of the specified object which contains the parameters
     * @async
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

    get oauth(): IOAuthResponse {
        return this._oauth;
    }

    set oauth(oauth: IOAuthResponse) {
        this._oauth = oauth;
        this.oauthOptions = {
            headers: {
                'Authorization': `Bearer ${this.oauth.access_token}`,
                'X-API-Key': this.apikey,
                'user-agent': this.userAgent,
            },
            uri: '',
        };
    }

}
