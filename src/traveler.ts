import 'es6-promise';
import * as rp from 'request-promise-native';

/**
 * Interface for defining an object for the Traveler class
 * @interface
 */
export interface IConfig {
    apikey: string;
    userAgent: string;
}

export default class Traveler {
    private apikey: string;
    private apibase: string;
    private assetbase: string;
    private options: rp.OptionsWithUri;

    constructor(config: IConfig) {
        this.apikey = config.apikey;
        this.apibase = 'http://www.bungie.net/Platform/Destiny2';
        this.assetbase = 'http://www.bungie.net/';
        this.options = {
            headers: {
                'User-Agent': config.userAgent,
                'X-API-Key': this.apikey,
            },
            json: true,
            simple: true, // Automatically parses the JSON string in the response
            uri: '',
        };
    }

    // #4
    /**
     * Retrieve stats about the history of activites of a Destiny 2 character
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param characterId ID of the character
     * @param components A string array containing differnt Destiny component type enum numbers
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different components IDs
     * @return {Promise.object} When fulfilled returns an object containing stats about the characters history of activities
     */
    public getCharacterActivityStats(membershipType: string, destinyMembershipId: string, characterId: string): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // #5
    /**
     * Retrieve aggregrated details about a Destiny Account
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param characterId ID of the character
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @param components A string array containing differnt Destiny component type enum numbers
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.
     * @return {Promise.object} When fulfilled returns an object containing stats about the specified character
     */
    public getCharacter(membershipType: string, destinyMembershipId: string, characterId: string, components: string[]): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/?components=${components.join(',')}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // #6
    /**
     * Gets aggregated stats for a clan using the same categories as the clan leaderboards
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @param gameModes Array of game modes for which to get stats
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * @return {Promise.object} When fulfilled returns an object containing aggregated stats for a clan
     */
    public getAggregatedClanStats(groupId: string, gameModes: string[]) {
        this.options.uri = `${this.apibase}/Stats/AggregateClanStats/${groupId}/?modes=${gameModes.join(',')}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // #7
    /**
     * Get the leaderboard of a clan
     * @async
     * @param groupId Group ID of the clan whose leaderboards you wish to fetch
     * @param gameModes Array of game modes for which to get stats
     * @param maxtop Maximum number of top players to return. Use a large number to get entire leaderboard
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * @param statid ID of stat to return rather than returning all Leaderboard stats.
     * @return {Promise.object} When fulfilled returns an object containing leaderboards for a clan
     */
    public getClanLeaderboard(groupId: string, gameModes: string[], maxtop: number, statid?: string) {
        this.options.uri = `${this.apibase}/Stats/Leaderboards/Clans/${groupId}/?modes=${gameModes.join(',')}&maxtop=${maxtop}` + `${statid ? '&statid=' + statid : ''}`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // #10
    /**
     * Gets the current manifest in a JSON document
     * @async
     */
    public getManifest() {
        this.options.uri = `${this.apibase}/Manifest/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // #14
    /**
     * Retrieve aggregrated details about a Destiny Account
     * @async
     * @param membershipType A valid non-BungieNet membership type, or All <ul>
     * <li>-1: ALL</li>
     * <li>1: Xbox</li>
     * <li>2: PSN</li>
     * <li>254: Bungie</li>
     * </ul>
     * @param destinyMembershipId The Destiny ID (Account ID)
     * @return {Promise.object} When fulfilled returns an object containing stats about the found user's account
     */
    public getAccountStats(membershipType: string, destinyMembershipId: string): Promise<object> {
        this.options.uri = `${this.apibase}/${membershipType}/Account/${destinyMembershipId}/Stats/`;
        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
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
    public searchPlayer(membershipType: string, displayName: string): Promise<object> {
        this.options.uri = `${this.apibase}/SearchDestinyPlayer/${membershipType}/${displayName}/`;

        return new Promise<object>((resolve, reject) => {
            this.makeRequest(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
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
     * Base function for making the request to the API endpoint
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    private makeRequest(options: rp.OptionsWithUri): Promise<any> {
        return new Promise<object>((resolve, reject) => {
            rp(this.options)
                .then((response) => {
                    if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}
