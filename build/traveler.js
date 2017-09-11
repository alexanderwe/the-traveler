"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise");
var rp = require("request-promise-native");
/**
 * Entry class for accessing the Destiny 2 API
 */
var Traveler = /** @class */ (function () {
    function Traveler(config) {
        this.debug = false;
        this.apikey = config.apikey;
        this.apibase = 'https://www.bungie.net/Platform/Destiny2';
        this.assetbase = 'https://www.bungie.net/';
        this.options = {
            headers: {
                'User-Agent': config.userAgent,
                'X-API-Key': this.apikey,
            },
            json: true,
            simple: true,
            uri: '',
        };
        this.debug = config.debug;
    }
    /**
     * Gets the current manifest in a JSON document
     * @async
     * @return {Promise.Object} When fulfilled returns an object containing the current Destiny 2 manifest
     */
    Traveler.prototype.getDestinyManifest = function () {
        var _this = this;
        this.options.uri = this.apibase + "/Manifest/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.searchDestinyPlayer = function (membershipType, displayName) {
        var _this = this;
        this.options.uri = this.apibase + "/SearchDestinyPlayer/" + membershipType + "/" + displayName + "/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getProfile = function (membershipType, destinyMembershipId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Profile/" + destinyMembershipId + "/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getCharacter = function (membershipType, destinyMembershipId, characterId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Profile/" + destinyMembershipId + "/Character/" + characterId + "/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed
     * @async
     * @param groupId Group ID of the clan whose stats you wish to fetch
     * @return {Promise.object} When fulfilled returns an object containing information about the weekly clan results
     */
    Traveler.prototype.getClanWeeklyRewardState = function (groupId) {
        var _this = this;
        this.options.uri = this.apibase + "/Clan/" + groupId + "/WeeklyRewardState/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getItem = function (membershipType, destinyMembershipId, itemInstanceId) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Profile/" + destinyMembershipId + "/Item/" + itemInstanceId + "/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getVendors = function (membershipType, destinyMembershipId, characterId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Profile/" + destinyMembershipId + "/Character/" + characterId + "/Vendors/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getVendor = function (membershipType, destinyMembershipId, characterId, vendorHash, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Profile/" + destinyMembershipId + "/Character/" + characterId + "/Vendors/" + vendorHash + "/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Ge the post carnage report for a specific activity ID
     * @async
     * @param activityId The activity ID for getting the carnage report
     * @return {Promise.object} When fulfilled returns an object containing the carnage report for the specified activity
     */
    Traveler.prototype.getPostGameCarnageReport = function (activityId) {
        var _this = this;
        this.options.uri = this.apibase + "/Stats/PostGameCarnageReport/" + activityId + "/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Get historical stats definitions. This contains the values for the `statId` key.
     * @async
     */
    Traveler.prototype.getHistoricalStatsDefinition = function () {
        var _this = this;
        this.options.uri = this.apibase + "/Stats/Definition/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getClanLeaderboards = function (groupId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/Stats/Leaderboards/Clans/" + groupId + "/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getClanAggregateStats = function (groupId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/Stats/AggregateClanStats/" + groupId + "/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getLeaderboards = function (membershipType, destinyMembershipId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Account/" + destinyMembershipId + "/Stats/Leaderboards/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getLeaderboardsForCharacter = function (membershipType, destinyMembershipId, characterId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/Stats/Leaderboards/" + membershipType + "/" + destinyMembershipId + "/" + characterId + "/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.searchDestinyEntities = function (searchTerm, type, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/Armory/Search/{type}/{searchTerm}/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getHistoricalStats = function (membershipType, destinyMembershipId, characterId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Account/" + destinyMembershipId + "/Character/" + characterId + "/Stats/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getHistoricalStatsForAccount = function (membershipType, destinyMembershipId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Account/" + destinyMembershipId + "/Stats/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
     * <li>mode {number} A single game mode to get the history for
     * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
     * </li>
     * <li>page {number}: Page number to return, starting with 0</li>
     * </ul>
     * @return {Promise.object} When fulfilled returns an object containing stats for activities for the specified character
     */
    Traveler.prototype.getActivityHistory = function (membershipType, destinyMembershipId, characterId, queryStringParameters) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Account/" + destinyMembershipId + "/Character/" + characterId + "/Stats/Activities/" + this.resolveQueryStringParameters(queryStringParameters);
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getUniqueWeaponHistory = function (membershipType, destinyMembershipId, characterId) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Account/" + destinyMembershipId + "/Character/" + characterId + "/Stats/UniqueWeapons/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
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
    Traveler.prototype.getAggregateActivityStats = function (membershipType, destinyMembershipId, characterId) {
        var _this = this;
        this.options.uri = this.apibase + "/" + membershipType + "/Account/" + destinyMembershipId + "/Character/" + characterId + "/Stats/AggregateActivityStats/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @async
     * @param milestoneHash The identifier for the milestone to be returned
     * @return {Promise.object} When fulfilled returns an object containing aggregated information about recent activities
     */
    Traveler.prototype.getPublicMilestoneContent = function (milestoneHash) {
        var _this = this;
        this.options.uri = this.apibase + "/Milestones/" + milestoneHash + "/Content/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Gets public information about currently available Milestones
     * @async
     */
    Traveler.prototype.getPublicMilestones = function () {
        var _this = this;
        this.options.uri = this.apibase + "/Milestones/";
        return new Promise(function (resolve, reject) {
            _this.makeRequest(_this.options)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Base function for making the request to the API endpoint. We need this, because we can do error validation, or agregated functions here.
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    Traveler.prototype.makeRequest = function (options) {
        var _this = this;
        if (this.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Debug url:' + options.uri);
        }
        return new Promise(function (resolve, reject) {
            rp(_this.options)
                .then(function (response) {
                if (response.ErrorCode !== 1) {
                    reject(response);
                }
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Generates the query string parameters out of the specified object which contains the parameters
     * @param queryStringParameters: Object which contains the query keys and values
     * @return The query string to add to the endpoint url
     */
    Traveler.prototype.resolveQueryStringParameters = function (queryStringParameters) {
        var queryString = '?';
        var end = Object.entries(queryStringParameters).length;
        var count = 0;
        Object.entries(queryStringParameters).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            count++;
            if (count !== end) {
                queryString = queryString.concat(key, '=', value, '&');
            }
            else {
                queryString = queryString.concat(key, '=', value);
            }
        });
        return queryString;
    };
    return Traveler;
}());
exports.default = Traveler;
