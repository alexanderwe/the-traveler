import * as fs from 'fs';
import * as SZIP from 'node-stream-zip';
import got = require('got');

import HTTPService from '../HttpService';
import BungieResource from './BungieResoure';

import { IServerResponse } from '../type-definitions/common';
import {
  BungieMembershipType,
  IDestinyCharacterResponse,
  IDestinyActivityHistoryResults,
  IDestinyManifest,
  IDestinyDefinition,
  IDestinyLinkedProfilesResponse,
  IDestinyProfileResponse,
  IDestinyMilestone,
  IDestinyItemResponse,
  IDestinyVendorsResponse,
  IDestinyVendorResponse,
  IDestinyCollectibleNodeDetailResponse,
  IDestinyPostGameCarnageReportData,
  IDestinyHistoricalStatsDefinition,
  IDestinyClanAggregateStat,
  IDestinyEntitySearchResult,
  IDestinyHistoricalStatsByPeriod,
  IDestinyHistoricalStatsAccountResult,
  IDestinyActivity,
  IDestinyHistoricalWeaponStatsData,
  IDestinyAggregateActivityResults,
  IDestinyMilestoneContent,
  IDestinyPublicMilestone
} from '../type-definitions/destiny2';
import { IUserInfoCard } from '../type-definitions/user';
import { IQueryStringParameters, IDictionaryResponse, TypeDefinition } from '../type-definitions/additions';

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
   * @returns {Promise<IServerResponse<IDestinyManifest>>}  When fulfilled returns an object containing the current Destiny 2 manifest
   * @memberof Destiny2Resource
   */
  public getDestinyManifest(): Promise<IServerResponse<IDestinyManifest>> {
    return new Promise<IServerResponse<IDestinyManifest>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Manifest/`)
        .then((response: IServerResponse<IDestinyManifest>) => {
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
   * import { TypeDefinition } from './type-definitions/additions';
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
   * @returns {Promise<IServerResponse<IDestinyDefinition>>}
   * @memberof Destiny2Resource
   */
  public getDestinyEntityDefinition(
    typeDefinition: string,
    hashIdentifier: string
  ): Promise<IServerResponse<IDestinyDefinition>> {
    return new Promise<IServerResponse<IDestinyDefinition>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Manifest/${typeDefinition}/${hashIdentifier}/`)
        .then((response: IServerResponse<IDestinyDefinition>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Search for a Destiny 2 player by name
   *   import { TypeDefinition } from './type-definitions/additions';
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from './type-definitions/app';
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
   * @returns {Promise<IServerResponse<IUserInfoCard[]>>}
   * @memberof Destiny2Resource
   */
  public searchDestinyPlayer(
    membershipType: BungieMembershipType,
    displayName: string
  ): Promise<IServerResponse<IUserInfoCard[]>> {
    return new Promise<IServerResponse<IUserInfoCard[]>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/SearchDestinyPlayer/${membershipType}/${displayName}/`)
        .then((response: IServerResponse<IUserInfoCard[]>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
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
   * @returns {Promise<IServerResponse<IDestinyLinkedProfilesResponse>>}
   * @memberof Destiny2Resource
   */
  public getLinkedProfiles(
    membershipType: BungieMembershipType,
    destinyMembershipId: string
  ): Promise<IServerResponse<IDestinyLinkedProfilesResponse>> {
    return new Promise<IServerResponse<IDestinyLinkedProfilesResponse>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/${membershipType}/Profile/${destinyMembershipId}/LinkedProfiles/`)
        .then((response: IServerResponse<IDestinyLinkedProfilesResponse>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyComponentType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional access token to request data with an oauth scopes
   * @returns {Promise<IServerResponse<IDestinyProfileResponse>>}
   * @memberof Destiny2Resource
   *
   */
  public getProfile(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: IQueryStringParameters,
    oauthAccesstoken?: string
  ): Promise<IServerResponse<IDestinyProfileResponse>> {
    return new Promise<IServerResponse<IDestinyProfileResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/${membershipType}/Profile/${destinyMembershipId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: IServerResponse<IDestinyProfileResponse>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyComponentType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional oauth access token
   * @returns {Promise<IServerResponse<IDestinyCharacterResponse>>}
   * @memberof Destiny2Resource
   */
  public getCharacter(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: IQueryStringParameters,
    oauthAccesstoken?: string
  ): Promise<IServerResponse<IDestinyCharacterResponse>> {
    return new Promise<IServerResponse<IDestinyCharacterResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: IServerResponse<IDestinyCharacterResponse>) => {
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
   * @returns {Promise<IServerResponse<IDestinyMilestone>>} When fulfilled returns an object containing information about the weekly clan results
   * @memberof Destiny2Resource
   */
  public getClanWeeklyRewardState(groupId: string): Promise<IServerResponse<IDestinyMilestone>> {
    return new Promise<IServerResponse<IDestinyMilestone>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Clan/${groupId}/WeeklyRewardState/`)
        .then((response: IServerResponse<IDestinyMilestone>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyComponentType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IServerResponse<IDestinyItemResponse>>} When fulfilled returns an object containing stats about the queried item
   * @memberof Destiny2Resource
   */
  public getItem(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    itemInstanceId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDestinyItemResponse>> {
    return new Promise<IServerResponse<IDestinyItemResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDestinyItemResponse>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyComponentType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional oauth access toen
   * @returns {Promise<IServerResponse<IDestinyVendorsResponse>>} When fulfilled returns an object containing all available vendors
   * @memberof Destiny2Resource
   */
  public getVendors(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: IQueryStringParameters,
    oauthAccesstoken: string
  ): Promise<IServerResponse<IDestinyVendorsResponse>> {
    return new Promise<IServerResponse<IDestinyVendorsResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: IServerResponse<IDestinyVendorsResponse>) => {
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
   * @return {Promise.IAPIResponse<IDestinyVendorResponse>} When fulfilled returns an object containing all available vendors
   */

  /**
   * Get the details of a specific Vendor.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyComponentType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IAPIResponse<IDestinyVendorResponse>>}
   * @memberof Destiny2Resource
   */
  public getVendor(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    vendorHash: string,
    queryStringParameters: IQueryStringParameters,
    oauthAccesstoken: string
  ): Promise<IServerResponse<IDestinyVendorResponse>> {
    return new Promise<IServerResponse<IDestinyVendorResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: IServerResponse<IDestinyVendorResponse>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyComponentType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IServerResponse<IDestinyCollectibleNodeDetailResponse>>} When fulfilled returns the detailed information about a Collectible Presentation Node and any Collectibles that are direct descendants.
   * @memberof Destiny2Resource
   */
  public getCollectibleNodeDetails(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    collectiblePresentationNodeHash: number,
    queryStringParameters: IQueryStringParameters,
    oauthAccesstoken: string
  ): Promise<IServerResponse<IDestinyCollectibleNodeDetailResponse>> {
    return new Promise<IServerResponse<IDestinyCollectibleNodeDetailResponse>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Collectibles/${collectiblePresentationNodeHash}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then((response: IServerResponse<IDestinyCollectibleNodeDetailResponse>) => {
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
   * @returns {Promise<IServerResponse<IDestinyPostGameCarnageReportData>>} When fulfilled returns an object containing the carnage report for the specified activity
   * @memberof Destiny2Resource
   */
  public getPostGameCarnageReport(activityId: string): Promise<IServerResponse<IDestinyPostGameCarnageReportData>> {
    return new Promise<IServerResponse<IDestinyPostGameCarnageReportData>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Stats/PostGameCarnageReport/${activityId}/`)
        .then((response: IServerResponse<IDestinyPostGameCarnageReportData>) => {
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
   * @returns {Promise<IServerResponse<{ [key: string]: IDestinyHistoricalStatsDefinition }>>}
   * @memberof Destiny2Resource
   */
  public getHistoricalStatsDefinition(): Promise<
    IServerResponse<IDictionaryResponse<IDestinyHistoricalStatsDefinition>>
  > {
    return new Promise<IServerResponse<{ [key: string]: IDestinyHistoricalStatsDefinition }>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Stats/Definition/`)
        .then((response: IServerResponse<IDictionaryResponse<IDestinyHistoricalStatsDefinition>>) => {
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
   * import { DestinyActivityModeType } from './type-definitions/destiny2';
   * import { StatId } from './type-definitions/additions';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
   * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
   * {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
   * </ul>
   * @returns {Promise<IServerResponse<IDictionaryResponse<object>>} When fulfilled returns an object containing leaderboards for a clan
   * @memberof Destiny2Resource
   */
  public getClanLeaderboards(
    groupId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDictionaryResponse<object>>> {
    return new Promise<IServerResponse<IDictionaryResponse<object>>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Stats/Leaderboards/Clans/${groupId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDictionaryResponse<object>>) => {
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
   * import { DestinyActivityModeType } from './type-definitions/destiny2';
   * import { StatId } from './type-definitions/additions';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {string[]}: Array of game modes for which to get stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IServerResponse<IDestinyClanAggregateStat[]>>}
   * @memberof Destiny2Resource
   */
  public getClanAggregateStats(
    groupId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDestinyClanAggregateStat[]>> {
    return new Promise<IServerResponse<IDestinyClanAggregateStat[]>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Stats/AggregateClanStats/${groupId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDestinyClanAggregateStat[]>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyActivityModeType } from './type-definitions/destiny2';
   * import { StatId } from './type-definitions/additions';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
   * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
   * See {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IServerResponse<IDictionaryResponse<object>>>}
   * @memberof Destiny2Resource
   */
  public getLeaderboards(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDictionaryResponse<object>>> {
    return new Promise<IServerResponse<IDictionaryResponse<object>>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDictionaryResponse<object>>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyActivityModeType } from './type-definitions/destiny2';
   * import { StatId } from './type-definitions/additions';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>modes {strings[]} Different gameMode IDs for which to get the stats <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>maxtop {number}: Maximum number of top players to return. Use a large number to get entire leaderboard
   * <li><statId {string}: ID of stat to return rather than returning all Leaderboard stats. <br />
   * //TODO: Change the link of all enums
   * See {@link https://alexanderwe.github.io/the-traveler/enums/statid.html|StatIds} for available ids</li>
   * </ul> You must request at least one component to receive results.
   * @returns {Promise<IServerResponse<IDictionaryResponse<object>>>}
   * @memberof Destiny2Resource
   */
  public getLeaderboardsForCharacter(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDictionaryResponse<object>>> {
    return new Promise<IServerResponse<IDictionaryResponse<object>>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDictionaryResponse<object>>) => {
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
   * import { TypeDefinition } from './type-definitions/additions';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>page {number} Page number to return, starting with 0</li>
   * </ul>
   * @returns {Promise<IServerResponse<IDestinyEntitySearchResult>>} The entities search result
   * @memberof Destiny2Resource
   */
  public searchDestinyEntities(
    searchTerm: string,
    typeDefinition: TypeDefinition,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDestinyEntitySearchResult>> {
    return new Promise<IServerResponse<IDestinyEntitySearchResult>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Armory/Search/${typeDefinition}/${searchTerm}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDestinyEntitySearchResult>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyStatsGroupType, PeriodType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
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
   * @returns {Promise<IServerResponse<IDictionaryResponse<IDestinyHistoricalStatsByPeriod>>>}
   * @memberof Destiny2Resource
   */
  public getHistoricalStats(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDictionaryResponse<IDestinyHistoricalStatsByPeriod>>> {
    return new Promise<IServerResponse<IDictionaryResponse<IDestinyHistoricalStatsByPeriod>>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDictionaryResponse<IDestinyHistoricalStatsByPeriod>>) => {
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
   * @return {Promise.IAPIResponse<IDestinyHistoricalStatsAccountResult>} When fulfilled returns an object containing stats about the found user's account
   */

  /**
   * Gets aggregate historical stats organized around each character for a given account.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyStatsGroupType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li> groups {string[]}: Group of stats to include, otherwise only general stats are returned. Use the numbers. <br >/
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType.html#schema_Destiny-HistoricalStats-Definitions-DestinyStatsGroupType|DestinyStatsGroupType} for the different IDs
   * </ul>
   * @returns {Promise<IServerResponse<IDestinyHistoricalStatsAccountResult>>}
   * @memberof Destiny2Resource
   */
  public getHistoricalStatsForAccount(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDestinyHistoricalStatsAccountResult>> {
    return new Promise<IServerResponse<IDestinyHistoricalStatsAccountResult>>((resolve, reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/${membershipType}/Account/${destinyMembershipId}/Stats/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDestinyHistoricalStatsAccountResult>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
   * import { DestinyActivityModeType } from './type-definitions/destiny2';
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
   * @param {IQueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>count {number}: Number of rows to return</li>
   * <li>mode {number} A single game mode to get the history for the specified character. <br />
   * See {@link https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType|DestinyActivityModeType} for the different game mode IDs
   * </li>
   * <li>page {number}: Page number to return, starting with 0</li>
   * </ul>
   * @returns {Promise<IServerResponse<IDestinyActivityHistoryResults>>}
   * @memberof Destiny2Resource
   */
  public getActivityHistory(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string,
    queryStringParameters: IQueryStringParameters
  ): Promise<IServerResponse<IDestinyActivityHistoryResults>> {
    return new Promise<IServerResponse<IDestinyActivityHistoryResults>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then((response: IServerResponse<IDestinyActivityHistoryResults>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
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
   * @returns {Promise<IServerResponse<IDestinyHistoricalWeaponStatsData>>}
   * @memberof Destiny2Resource
   */
  public getUniqueWeaponHistory(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string
  ): Promise<IServerResponse<IDestinyHistoricalWeaponStatsData>> {
    return new Promise<IServerResponse<IDestinyHistoricalWeaponStatsData>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`
        )
        .then((response: IServerResponse<IDestinyHistoricalWeaponStatsData>) => {
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
   * import { BungieMembershipType } from './type-definitions/app';
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
   * @returns {Promise<IServerResponse<IDestinyAggregateActivityResults>>}
   * @memberof Destiny2Resource
   */
  public getDestinyAggregateActivityStats(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    characterId: string
  ): Promise<IServerResponse<IDestinyAggregateActivityResults>> {
    return new Promise<IServerResponse<IDestinyAggregateActivityResults>>((resolve, reject) => {
      this.httpService
        .get(
          `${
            this.resourcePath
          }/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`
        )
        .then((response: IServerResponse<IDestinyAggregateActivityResults>) => {
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
   * @return {Promise.IAPIResponse<IDestinyMilestoneContent>} When fulfilled returns an object containing aggregated information about recent activities
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
   * @returns {Promise<IServerResponse<IDestinyMilestoneContent>>}
   * @memberof Destiny2Resource
   */
  public getPublicMilestoneContent(milestoneHash: string): Promise<IServerResponse<IDestinyMilestoneContent>> {
    return new Promise<IServerResponse<IDestinyMilestoneContent>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Milestones/${milestoneHash}/Content/`)
        .then((response: IServerResponse<IDestinyMilestoneContent>) => {
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
   * @returns {Promise<IServerResponse<IDictionaryResponse<IDestinyPublicMilestone>>}
   * @memberof Destiny2Resource
   */
  public getPublicMilestones(): Promise<IServerResponse<IDictionaryResponse<IDestinyPublicMilestone>>> {
    return new Promise<IServerResponse<IDictionaryResponse<IDestinyPublicMilestone>>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Milestones/`)
        .then((response: IServerResponse<IDictionaryResponse<IDestinyPublicMilestone>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Download the specified manifest file, extract the zip and also deleting the zip afterwards
   *
   * @param {string} manifestUrl The url of the manifest you want to download
   * @param {string} [filename] The filename of the final unzipped file. This is used for the constructor of [[Manifest]]
   * @returns {Promise<string>} When fulfilled returns the path of the saved manifest file
   * @memberof Destiny2Resource
   */
  public downloadManifest(manifestUrl: string, filename?: string): Promise<string> {
    const outStream = fs.createWriteStream(`${manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}.zip`);
    return new Promise<string>((resolve, reject) => {
      got
        .stream(`https://www.bungie.net/${manifestUrl}`)
        .pipe(outStream)
        .on('finish', () => {
          const zip = new SZIP({
            file: `${manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}.zip`,
            storeEntries: true
          });

          const fileName = manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1);

          zip.on('ready', () => {
            zip.extract(
              manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1),
              filename,
              (err: object, count: number) => {
                if (err) {
                  reject(new Error('Error extracting zip'));
                } else {
                  zip.close();
                  fs.unlink(`${manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}.zip`, err => {
                    if (err) {
                      reject(new Error('Error deleting .zip file'));
                    }
                    resolve(filename);
                  });
                }
              }
            );
          });
        });
    });
  }

  /**
   * Download the specified manifest file, extract the zip and also deleting the zip afterwards
   *
   * @param {string} manifestUrl The url of the manifest you want to download
   * @param {string} [filename] The filename of the final unzipped file. This is used for the constructor of [[Manifest]]
   * @returns {Promise<string>} When fulfilled returns the path of the saved manifest file
   * @memberof Destiny2Resource
   */
  public downloadManifestJSON(manifestUrl: string, filename?: string): Promise<string> {
    const outStream = fs.createWriteStream(`${manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}`);
    return new Promise<string>((resolve, reject) => {
      got
        .stream(`https://www.bungie.net/${manifestUrl}`)
        .pipe(outStream)
        .on('finish', () => {
          resolve();
        });
    });
  }
}
