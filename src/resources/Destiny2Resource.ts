import * as fs from 'fs';
import * as SZIP from 'node-stream-zip';
import got = require('got');

import HTTPService from '../HttpService';
import BungieResource from './BungieResoure';

import { ServerResponse } from '../type-definitions/common';
import {
  BungieMembershipType,
  DestinyCharacterResponse,
  DestinyActivityHistoryResults,
  DestinyManifest,
  DestinyDefinition,
  DestinyLinkedProfilesResponse,
  DestinyProfileResponse,
  DestinyMilestone,
  DestinyItemResponse,
  DestinyVendorsResponse,
  DestinyVendorResponse,
  DestinyCollectibleNodeDetailResponse,
  DestinyPostGameCarnageReportData,
  DestinyHistoricalStatsDefinition,
  DestinyClanAggregateStat,
  DestinyEntitySearchResult,
  DestinyHistoricalStatsByPeriod,
  DestinyHistoricalStatsAccountResult,
  DestinyActivity,
  DestinyHistoricalWeaponStatsData,
  DestinyAggregateActivityResults,
  DestinyMilestoneContent,
  DestinyPublicMilestone
} from '../type-definitions/destiny2';
import { UserInfoCard } from '../type-definitions/user';
import { QueryStringParameters, DictionaryResponse, TypeDefinition } from '../type-definitions/additions';

import { resolveQueryStringParameters } from '../util';

export default class Destiny2Resource extends BungieResource {
  protected resourcePath: string;

  constructor(httpService: HTTPService) {
    super(httpService);
    this.resourcePath = `${this.basePath}/Destiny2`;
  }

  /**
   * Returns the current version of the manifest as a json object.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getDestinyManifest()
   * .then(response => {
   *   console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @returns {Promise<ServerResponse<DestinyManifest>>}  When fulfilled returns an object containing the current Destiny 2 manifest
   * @memberof Destiny2Resource
   */
  public getDestinyManifest(): Promise<ServerResponse<DestinyManifest>> {
    return new Promise<ServerResponse<DestinyManifest>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Manifest/`)
        .then((response: ServerResponse<DestinyManifest>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Returns the static definition of an entity of the given Type and hash identifier. Examine the API Documentation for the Type Names of entities that have their own definitions.
   * Note that the return type will always *inherit from* DestinyDefinition, but the specific type returned will be the requested entity type if it can be found.
   * Please don't use this as a chatty alternative to the Manifest database if you require large sets of data, but for simple and one-off accesses this should be handy.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { TypeDefinition } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getDestinyEntityDefinition(
   *    TypeDefinition.DestinyInventoryItemDefinition,
   *    'hashIdentifier'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   * @param {string} typeDefinition
   * @param {string} hashIdentifier
   * @returns {Promise<ServerResponse<DestinyDefinition>>}
   * @memberof Destiny2Resource
   */
  public getDestinyEntityDefinition(
    typeDefinition: string,
    hashIdentifier: string
  ): Promise<ServerResponse<DestinyDefinition>> {
    return new Promise<ServerResponse<DestinyDefinition>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Manifest/${typeDefinition}/${hashIdentifier}/`)
        .then((response: ServerResponse<DestinyDefinition>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Search for a Destiny 2 player by name
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .searchDestinyPlayer(
   *    BungieMembershipType.All,
   *    'displayName'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} displayName  The full gamertag or PSN id of the player. Spaces and case are ignored
   * @returns {Promise<ServerResponse<UserInfoCard[]>>}
   * @memberof Destiny2Resource
   */
  public searchDestinyPlayer(
    membershipType: BungieMembershipType,
    displayName: string
  ): Promise<ServerResponse<UserInfoCard[]>> {
    return new Promise<ServerResponse<UserInfoCard[]>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/SearchDestinyPlayer/${membershipType}/${displayName}/`)
        .then((response: ServerResponse<UserInfoCard[]>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Returns a summary information about all profiles linked to the requesting membership type/membership ID that have valid Destiny information.
   * The passed-in Membership Type/Membership ID may be a Bungie.Net membership or a Destiny membership.
   * It only returns the minimal amount of data to begin making more substantive requests, but will hopefully serve as a useful alternative to UserServices for people who just care about Destiny data.
   * Note that it will only return linked accounts whose linkages you are allowed to view.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getLinkedProfiles(
   *    BungieMembershipType.TigerPSN,
   *    'destinyMembershipId'
   * );
   * .then(response => {
   *  console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType
   * @param {string} destinyMembershipId
   * @returns {Promise<ServerResponse<DestinyLinkedProfilesResponse>>}
   * @memberof Destiny2Resource
   */
  public getLinkedProfiles(
    membershipType: BungieMembershipType,
    destinyMembershipId: string
  ): Promise<ServerResponse<DestinyLinkedProfilesResponse>> {
    return new Promise<ServerResponse<DestinyLinkedProfilesResponse>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/${membershipType}/Profile/${destinyMembershipId}/LinkedProfiles/`)
        .then((response: ServerResponse<DestinyLinkedProfilesResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Returns Destiny Profile information for the supplied membership.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getProfile(
   *    BungieMembershipType.TigerPsn,
   *    'membershipId',
   *    {components: [DestinyComponentType.Profiles]}
   * )
   * .then(response => {
   *  console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType  A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny ID (Account ID)
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional access token to request data with an oauth scopes
   * @returns {Promise<ServerResponse<DestinyProfileResponse>>}
   * @memberof Destiny2Resource
   *
   */
  public getProfile(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: QueryStringParameters,
    oauthAccesstoken?: string
  ): Promise<ServerResponse<DestinyProfileResponse>> {
    return new Promise<ServerResponse<DestinyProfileResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/${membershipType}/Profile/${destinyMembershipId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: ServerResponse<DestinyProfileResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Retrieve aggregrated details about a Destiny Characters
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getCharacter(
   *    BungieMembershipType.TigerPSN,
   *    'destinyMembershipId',
   *    'characterId',
   *    {
   *    components: [
   *      DestinyComponentType.Characters,
   *      DestinyComponentType.CharacterInventories,
   *      DestinyComponentType.CharacterProgressions,
   *      DestinyComponentType.CharacterRenderData,
   *      DestinyComponentType.CharacterActivities,
   *      DestinyComponentType.CharacterEquipment
   *    ]
   * })
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId Destiny membership ID.
   * @param {string} characterId ID of the character.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional oauth access token
   * @returns {Promise<ServerResponse<DestinyCharacterResponse>>}
   * @memberof Destiny2Resource
   */
  public getCharacter(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: QueryStringParameters,
    oauthAccesstoken?: string
  ): Promise<ServerResponse<DestinyCharacterResponse>> {
    return new Promise<ServerResponse<DestinyCharacterResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: ServerResponse<DestinyCharacterResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', // used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getClanWeeklyRewardState('groupId')
   * .then(response => {
   *    console.log(response);
   *  })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {string} groupId A valid group id of the clan
   * @returns {Promise<ServerResponse<DestinyMilestone>>} When fulfilled returns an object containing information about the weekly clan results
   * @memberof Destiny2Resource
   */
  public getClanWeeklyRewardState(groupId: string): Promise<ServerResponse<DestinyMilestone>> {
    return new Promise<ServerResponse<DestinyMilestone>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Clan/${groupId}/WeeklyRewardState/`)
        .then((response: ServerResponse<DestinyMilestone>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Get the details of an instanced Destiny Item. Materials and other non-instanced items can not be queried with this endpoint.
   * The items are coupled with an specific Destiny Account
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getItem(
   *    BungieMembershipType.PSN,
   *    'destinyMembershipId',
   *    'itemInstanceId',
   *    { components: [DestinyComponentType.ItemCommonData] }
   * )
   * .then(response => {
   *    console.log(response);
   *  })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny ID (Account ID)
   * @param {string} itemInstanceId ID of the Destiny Item
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<ServerResponse<DestinyItemResponse>>} When fulfilled returns an object containing stats about the queried item
   * @memberof Destiny2Resource
   */
  public getItem(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    itemInstanceId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyItemResponse>> {
    return new Promise<ServerResponse<DestinyItemResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DestinyItemResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Get currently available vendors from the list of vendors that can possibly have rotating inventory.
   * Note that this does not include things like preview vendors and vendors-as-kiosks, neither of whom have rotating/dynamic inventories. Use their definitions as-is for those.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getVendors(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    'characterId',
   *    {
   *      components: [DestinyComponentType.VendorReceipts]
   *    },
   *    'oauthAccesstoken'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId Destiny membership ID of another user. You may be denied.
   * @param {string} characterId The Destiny Character ID of the character for whom we're getting vendor info.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional oauth access toen
   * @returns {Promise<ServerResponse<DestinyVendorsResponse>>} When fulfilled returns an object containing all available vendors
   * @memberof Destiny2Resource
   */
  public getVendors(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: QueryStringParameters,
    oauthAccesstoken: string
  ): Promise<ServerResponse<DestinyVendorsResponse>> {
    return new Promise<ServerResponse<DestinyVendorsResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: ServerResponse<DestinyVendorsResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Get items available from vendors where the vendors have items for sale that are common for everyone.
   * If any portion of the Vendor's available inventory is character or account specific, we will be unable to return their data from this endpoint due to the way that available inventory is computed.
   * As I am often guilty of saying: 'It's a long story...'
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getPublicVendors(
   *    {
   *      components: [DestinyComponentType.Vendors]
   *    }
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<ServerResponse<DestinyVendorsResponse>>} When fulfilled returns an object containing all valid components for the public Vendors endpoint
   * @memberof Destiny2Resource
   */
  public getPublicVendors(
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyVendorsResponse>> {
    return new Promise<ServerResponse<DestinyVendorsResponse>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Vendors/${resolveQueryStringParameters(queryStringParameters)}`)
        .then((response: ServerResponse<DestinyVendorsResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Retrieve all currently available vendors for a specific character
   * @async
   * @param membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param destinyMembershipId The Destiny ID (Account ID)
   * @param characterId ID of the character for whom to get the vendor info
   * @param vendorHash Hash identifier of the vendor to retreieve
   * @param queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @return {Promise.IAPIResponse<DestinyVendorResponse>} When fulfilled returns an object containing all available vendors
   */

  /**
   * Get the details of a specific Vendor.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2.
   * .getVendor(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    'characterId',
   *    'vendorHash'
   *    {
   *      components: [DestinyComponentType.VendorReceipts,  DestinyComponentType.VendorSales]
   *    },
   *    'oauthAccesstoken'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType  A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId Destiny membership ID of another user. You may be denied.
   * @param {string} characterId The Destiny Character ID of the character for whom we're getting vendor info.
   * @param {string} vendorHash The Hash identifier of the Vendor to be returned.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IAPIResponse<DestinyVendorResponse>>}
   * @memberof Destiny2Resource
   */
  public getVendor(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    vendorHash: string,
    queryStringParameters: QueryStringParameters,
    oauthAccesstoken: string
  ): Promise<ServerResponse<DestinyVendorResponse>> {
    return new Promise<ServerResponse<DestinyVendorResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: ServerResponse<DestinyVendorResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Given a Presentation Node that has Collectibles as direct descendants, this will return item details about those descendants in the context of the requesting character.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getCollectibleNodeDetails(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    'characterId',
   *    1234567890,
   *    {components: [DestinyComponentType.Collectibles]},
   *    'oauthAccesstoken'
   * )
   * .then(response => {
   *   console.log(response);
   * })
   * .catch(err => {
   *   console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.PSN` for this endpoint.
   * @param {string} destinyMembershipId Destiny membership ID of another user. You may be denied.
   * @param {string} characterId The Destiny Character ID of the character for whom we're getting collectible detail info.
   * @param {number} collectiblePresentationNodeHash The hash identifier of the Presentation Node for whom we should return collectible details. Details will only be returned for collectibles that are direct descendants of this node.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<ServerResponse<DestinyCollectibleNodeDetailResponse>>} When fulfilled returns the detailed information about a Collectible Presentation Node and any Collectibles that are direct descendants.
   * @memberof Destiny2Resource
   */
  public getCollectibleNodeDetails(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    collectiblePresentationNodeHash: number,
    queryStringParameters: QueryStringParameters,
    oauthAccesstoken: string
  ): Promise<ServerResponse<DestinyCollectibleNodeDetailResponse>> {
    return new Promise<ServerResponse<DestinyCollectibleNodeDetailResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Collectibles/${collectiblePresentationNodeHash}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: ServerResponse<DestinyCollectibleNodeDetailResponse>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets the available post game carnage report for the activity ID.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   *  traveler.destiny2
   *  .getPostGameCarnageReport('activityId')
   *  .then(response => {
   *    console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   * @param {string} activityId The ID of the activity whose PGCR is requested.
   * @returns {Promise<ServerResponse<DestinyPostGameCarnageReportData>>} When fulfilled returns an object containing the carnage report for the specified activity
   * @memberof Destiny2Resource
   */
  public getPostGameCarnageReport(activityId: string): Promise<ServerResponse<DestinyPostGameCarnageReportData>> {
    return new Promise<ServerResponse<DestinyPostGameCarnageReportData>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Stats/PostGameCarnageReport/${activityId}/`)
        .then((response: ServerResponse<DestinyPostGameCarnageReportData>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets historical stats definitions.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   *  traveler.destiny2.getHistoricalStatsDefinition()
   *  .then(response => {
   *    console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   * @returns {Promise<ServerResponse<{ [key: string]: DestinyHistoricalStatsDefinition }>>}
   * @memberof Destiny2Resource
   */
  public getHistoricalStatsDefinition(): Promise<ServerResponse<DictionaryResponse<DestinyHistoricalStatsDefinition>>> {
    return new Promise<ServerResponse<{ [key: string]: DestinyHistoricalStatsDefinition }>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Stats/Definition/`)
        .then((response: ServerResponse<DictionaryResponse<DestinyHistoricalStatsDefinition>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus.
   * PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { DestinyActivityModeType } from 'the-traveler/type-definitions/destiny2';
   * import { StatId } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   *  .getClanLeaderboards('groupId', {
   *    modes: [DestinyActivityModeType.AllPvP, DestinyActivityModeType.AllPvE],
   *    maxtop: 10,
   *    statid: StatId.ActivitiesWon
   *  })
   * .then(response => {
   *  console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   * @param {string} groupId Group ID of the clan whose leaderboards you wish to fetch.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
   * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
   * {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
   * </ul>
   * @returns {Promise<ServerResponse<DictionaryResponse<object>>} When fulfilled returns an object containing leaderboards for a clan
   * @memberof Destiny2Resource
   */
  public getClanLeaderboards(
    groupId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DictionaryResponse<object>>> {
    return new Promise<ServerResponse<DictionaryResponse<object>>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Stats/Leaderboards/Clans/${groupId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DictionaryResponse<object>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets aggregated stats for a clan using the same categories as the clan leaderboards. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { DestinyActivityModeType } from 'the-traveler/type-definitions/destiny2';
   * import { StatId } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   *  .getClanAggregateStats('groupId', {
   *    modes: [DestinyActivityModeType.AllPvP, DestinyActivityModeType.AllPvE]
   *  })
   * .then(response => {
   *  console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   * @param {string} groupId Group ID of the clan whose leaderboards you wish to fetch.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {string[]}: Array of game modes for which to get stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<ServerResponse<DestinyClanAggregateStat[]>>}
   * @memberof Destiny2Resource
   */
  public getClanAggregateStats(
    groupId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyClanAggregateStat[]>> {
    return new Promise<ServerResponse<DestinyClanAggregateStat[]>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Stats/AggregateClanStats/${groupId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DestinyClanAggregateStat[]>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus.
   * PREVIEW: This endpoint has not yet been implemented. It is being returned for a preview of future functionality, and for public comment/suggestion/preparation.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyActivityModeType } from 'the-traveler/type-definitions/destiny2';
   * import { StatId } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getLeaderboards(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    {
   *    modes: [DestinyActivityModeType.AllPvP, DestinyActivityModeType.AllPvE],
   *    maxtop: 10,
   *    statid: StatId.ActivitiesWon
   *    }
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType The Destiny membershipId of the user to retrieve.
   * @param {string} destinyMembershipId A valid non-BungieNet membership type.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
   * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
   * See {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<ServerResponse<DictionaryResponse<object>>>}
   * @memberof Destiny2Resource
   */
  public getLeaderboards(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DictionaryResponse<object>>> {
    return new Promise<ServerResponse<DictionaryResponse<object>>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DictionaryResponse<object>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyActivityModeType } from 'the-traveler/type-definitions/destiny2';
   * import { StatId } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getLeaderboardsForCharacter(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    'characterId',
   *    {
   *    modes: [DestinyActivityModeType.AllPvP, DestinyActivityModeType.AllPvE],
   *    maxtop: 10,
   *    statid: StatId.ActivitiesWon
   *    }
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny membershipId of the user to retrieve.
   * @param {string} characterId The specific character to build the leaderboard around for the provided Destiny Membership.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
   * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
   * //TODO: Change the link of all enums
   * See {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<ServerResponse<DictionaryResponse<object>>>}
   * @memberof Destiny2Resource
   */
  public getLeaderboardsForCharacter(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DictionaryResponse<object>>> {
    return new Promise<ServerResponse<DictionaryResponse<object>>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DictionaryResponse<object>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets a page list of Destiny items.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { TypeDefinition } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .searchDestinyEntities(
   *    'moon',
   *    TypeDefinition.DestinyInventoryItemDefinition,
   *    { page: 0 })
   * .then(response => {
   *  console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @param {string} searchTerm The string to use when searching for Destiny entities.
   * @param {TypeDefinition} typeDefinition The type of entity for whom you would like results. These correspond to the entity's definition contract name. For instance, if you are looking for items, this property should be 'DestinyInventoryItemDefinition'.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>page {number} Page number to return, starting with 0</li>
   * </ul>
   * @returns {Promise<ServerResponse<DestinyEntitySearchResult>>} The entities search result
   * @memberof Destiny2Resource
   */
  public searchDestinyEntities(
    searchTerm: string,
    typeDefinition: TypeDefinition,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyEntitySearchResult>> {
    return new Promise<ServerResponse<DestinyEntitySearchResult>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Armory/Search/${typeDefinition}/${searchTerm}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DestinyEntitySearchResult>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets historical stats for indicated character.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyStatsGroupType, PeriodType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getHistoricalStats(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    'characterId',
   *    {
   *      dayend: '2017-09-30',
   *      daystart: '2017-09-20',
   *      groups: [DestinyStatsGroupType.Activity],
   *      periodType: PeriodType.Activity
   *    }
   * )
   * .then(response => {
   *   console.log(response);
   * })
   *.catch(err => {
   *  console.log(err);
   *});
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny membershipId of the user to retrieve.
   * @param {string} characterId The id of the character to retrieve. You can omit this character ID or set it to 0 to get aggregate stats across all characters.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>dayend {string}: Last day to return when daily stats are requested. Use the format YYYY-MM-DD</li>
   * <li>daystart {string}: First day to return when daily stats are requested. Use the format YYYY-MM-DD</li>
   * <li>groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers.<br >
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
   * </li>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats.<br >
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>periodType {number}: Indicates a specific period type to return. <br >
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-PeriodType.html#schema_Destiny-HistoricalStats-Definitions-PeriodType|PeriodType} for the different period type numbers
   * </li>
   * </ul>
   * @returns {Promise<ServerResponse<DictionaryResponse<DestinyHistoricalStatsByPeriod>>>}
   * @memberof Destiny2Resource
   */
  public getHistoricalStats(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DictionaryResponse<DestinyHistoricalStatsByPeriod>>> {
    return new Promise<ServerResponse<DictionaryResponse<DestinyHistoricalStatsByPeriod>>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DictionaryResponse<DestinyHistoricalStatsByPeriod>>) => {
          resolve(response);
        })
        .catch(err => {
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
   * @return {Promise.IAPIResponse<DestinyHistoricalStatsAccountResult>} When fulfilled returns an object containing stats about the found user's account
   */

  /**
   * Gets aggregate historical stats organized around each character for a given account.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyStatsGroupType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getHistoricalStatsForAccount(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    {groups: [DestinyStatsGroupType.Activity]}
   * )
   * .then(response => {
   *   console.log(response);
   * })
   *.catch(err => {
   *  console.log(err);
   *});
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny membershipId of the user to retrieve.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li> groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers. <br >/
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
   * </ul>
   * @returns {Promise<ServerResponse<DestinyHistoricalStatsAccountResult>>}
   * @memberof Destiny2Resource
   */
  public getHistoricalStatsForAccount(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyHistoricalStatsAccountResult>> {
    return new Promise<ServerResponse<DestinyHistoricalStatsAccountResult>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/${membershipType}/Account/${destinyMembershipId}/Stats/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DestinyHistoricalStatsAccountResult>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets activity history stats for indicated character.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyActivityModeType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getActivityHistory(
   *    BungieMembershipType.TigerPsn,
   *    'destinyMembershipId',
   *    'characterId',
   *    {
   *      count: 10,
   *      mode: DestinyActivityModeType.AllPvE,
   *      page: 0
   *      })
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny membershipId of the user to retrieve.
   * @param {string} characterId The id of the character to retrieve.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>count {number}: Number of rows to return</li>
   * <li>mode {number} A single game mode to get the history for the specified character. <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>page {number}: Page number to return, starting with 0</li>
   * </ul>
   * @returns {Promise<ServerResponse<DestinyActivityHistoryResults>>}
   * @memberof Destiny2Resource
   */
  public getActivityHistory(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyActivityHistoryResults>> {
    return new Promise<ServerResponse<DestinyActivityHistoryResults>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: ServerResponse<DestinyActivityHistoryResults>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets details about unique weapon usage, including all exotic weapons.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   *  .getUniqueWeaponHistory(
   *      BungieMembershipType.TigerPsn,
   *     'destinyMembershipId',
   *     'characterId'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny membershipId of the user to retrieve.
   * @param {string} characterId The id of the character to retrieve.
   * @returns {Promise<ServerResponse<DestinyHistoricalWeaponStatsData>>}
   * @memberof Destiny2Resource
   */
  public getUniqueWeaponHistory(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string
  ): Promise<ServerResponse<DestinyHistoricalWeaponStatsData>> {
    return new Promise<ServerResponse<DestinyHistoricalWeaponStatsData>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`
        )
        .then((response: ServerResponse<DestinyHistoricalWeaponStatsData>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets all activities the character has participated in together with aggregate statistics for those activities.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   *  .getDestinyAggregateActivityStats(
   *      BungieMembershipType.TigerPsn,
   *     'destinyMembershipId',
   *     'characterId'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny membershipId of the user to retrieve.
   * @param {string} characterId The specific character whose activities should be returned.
   * @returns {Promise<ServerResponse<DestinyAggregateActivityResults>>}
   * @memberof Destiny2Resource
   */
  public getDestinyAggregateActivityStats(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string
  ): Promise<ServerResponse<DestinyAggregateActivityResults>> {
    return new Promise<ServerResponse<DestinyAggregateActivityResults>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`
        )
        .then((response: ServerResponse<DestinyAggregateActivityResults>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets custom localized content for the milestone of the given hash, if it exists.
   * @async
   * @param milestoneHash The identifier for the milestone to be returned
   * @return {Promise.IAPIResponse<DestinyMilestoneContent>} When fulfilled returns an object containing aggregated information about recent activities
   */

  /**
   * Gets custom localized content for the milestone of the given hash, if it exists.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   *  .getPublicMilestoneContent(
   *     'milestoneHash'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {string} milestoneHash The identifier for the milestone to be returned.
   * @returns {Promise<ServerResponse<DestinyMilestoneContent>>}
   * @memberof Destiny2Resource
   */
  public getPublicMilestoneContent(milestoneHash: string): Promise<ServerResponse<DestinyMilestoneContent>> {
    return new Promise<ServerResponse<DestinyMilestoneContent>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Milestones/${milestoneHash}/Content/`)
        .then((response: ServerResponse<DestinyMilestoneContent>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets public information about currently available Milestones.
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getPublicMilestones()
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @returns {Promise<ServerResponse<DictionaryResponse<DestinyPublicMilestone>>}
   * @memberof Destiny2Resource
   */
  public getPublicMilestones(): Promise<ServerResponse<DictionaryResponse<DestinyPublicMilestone>>> {
    return new Promise<ServerResponse<DictionaryResponse<DestinyPublicMilestone>>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Milestones/`)
        .then((response: ServerResponse<DictionaryResponse<DestinyPublicMilestone>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Download the specified manifest file, extract the zip and also deleting the zip afterwards
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   *  .getDestinyManifest()
   *  .then(response => {
   *    traveler.destiny2
   *    .downloadManifest(response.Response.mobileWorldContentPaths['en'])
   *      .then(response => {
   *        console.log(response);
   *      })
   *      .catch(err => {
   *        console.log(err);
   *        });
   *    })
   *    .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {string} manifestUrl The url of the manifest you want to download
   * @param {string} [filename] The filename of the final unzipped file. This is used for the constructor of [[Manifest]]
   * @returns {Promise<string>} When fulfilled returns the path of the saved manifest file
   * @memberof Destiny2Resource
   */
  public downloadManifest(manifestUrl: string, filename?: string): Promise<string> {
    const downloadFileName = manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1);
    const outputFileName = `${filename ? filename : manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}`;

    const outStream = fs.createWriteStream(`${downloadFileName}.zip`);

    return new Promise<string>((resolve, reject) => {
      got
        .stream(`https://www.bungie.net/${manifestUrl}`)
        .pipe(outStream)
        .on('finish', () => {
          const zip = new SZIP({
            file: `${downloadFileName}.zip`,
            storeEntries: true
          });

          zip.on('ready', () => {
            zip.extract(downloadFileName, outputFileName, (err: object, count: number) => {
              if (err) {
                reject(new Error('Error extracting zip'));
              } else {
                zip.close();
                fs.unlink(`${downloadFileName}.zip`, err => {
                  if (err) {
                    reject(new Error('Error deleting .zip file'));
                  }
                  resolve(outputFileName);
                });
              }
            });
          });
        });
    });
  }

  /**
   * Download the specified json manifest file
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getDestinyManifest()
   * .then(response => {
   *  traveler.destiny2
   *    .downloadManifestJSON(response.Response.jsonWorldContentPaths['en'])
   *    .then(response => {
   *      console.log(response);
   *     })
   *     .catch(err => {
   *       console.log(err);
   *     });
   *  })
   *  .catch(err => {
   *   console.log(err);
   *  });
   * ```
   *
   * @param {string} manifestUrl The url of the manifest you want to download
   * @param {string} [filename] The filename of the final .json file downloaded
   * @returns {Promise<string>} When fulfilled returns the path of the saved manifest file
   * @memberof Destiny2Resource
   */
  public downloadManifestJSON(manifestUrl: string, filename?: string): Promise<string> {
    const outStream = fs.createWriteStream(
      `${filename ? filename : manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}`
    );
    return new Promise<string>((resolve, reject) => {
      got
        .stream(`https://www.bungie.net/${manifestUrl}`)
        .pipe(outStream)
        .on('finish', () => {
          resolve(filename);
        });
    });
  }
}
