import HTTPService from './HttpService';
import GlobalResource from './resources/GlobalResource';
import Destiny2Resource from './resources/Destiny2Resource';
import UserResource from './resources/UserResource';
import { ITravelerConfig } from './type-definitions/additions';
import OAuthResource from './resources/OAuthResource';

/**
 * Entry class for accessing the Destiny 2 API
 */
export default class Traveler {
  private apikey: string;
  private userAgent: string;
  private httpService: HTTPService;

  public oauth: OAuthResource;
  public global: GlobalResource;
  public user: UserResource;
  public destiny2: Destiny2Resource;

  constructor(config: ITravelerConfig) {
    this.apikey = config.apikey;
    this.userAgent = config.userAgent;
    this.httpService = new HTTPService(
      {
        headers: {
          'User-Agent': this.userAgent,
          'X-API-Key': this.apikey
        },
        json: true
      },
      config.debug
    );
    this.oauth = new OAuthResource(config, this.httpService);
    this.global = new GlobalResource(this.httpService);
    this.destiny2 = new Destiny2Resource(this.httpService);
    this.user = new UserResource(this.httpService);
  }
}

//   /**
//    * Equip an item from the inventory. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.
//    * @async
//    * @param itemActionRequest An object containing following keys: <br />
//    * <ul>
//    * <li>itemId {string} - The itemInstanceId (**not hash**) of the item you want to equipt</li>
//    * <li>charcterId {string} The character ID of the character who gets the item</li>
//    * <li>membershipType {number} The BungieMemberschipType</li>
//    * </ul>
//    */
//   public equipItem(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<number>> {
//     if (this.oauth !== undefined) {
//       this.oauthOptions.body = itemActionRequest;
//       this.oauthOptions.uri = `${this.apibaseDestiny2}/Actions/Items/EquipItem/`;
//       this.oauthOptions.json = true;
//       return new Promise<IAPIResponse<number>>((resolve, reject) => {
//         this.httpService
//           .post(this.oauthOptions)
//           .then((response: IAPIResponse<number>) => {
//             resolve(response);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//     } else {
//       throw new OAuthError(
//         'You have to use OAuth to access this endpoint. Your oauth object is this: ' +
//           JSON.stringify(this.oauth) +
//           ' Please use traveler.oauth = yourOauthObject to set it.'
//       );
//     }
//   }

//   /**
//    * Equip multiple items from the inventory. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.
//    * @async
//    * @param itemActionRequest An object containing following keys: <br />
//    * <ul>
//    * <li>itemIds {string[]} - Multiple itemInstanceIds (**not hasesh**) of the items you want to equipt</li>
//    * <li>charcterId {string} The character ID of the character who gets the item</li>
//    * <li>membershipType {number} The BungieMemberschipType</li>
//    * </ul>
//    */
//   public equipItems(itemActionRequest: IDestinyItemSetActionRequest): Promise<IAPIResponse<IDestinyEquipItemResults>> {
//     if (this.oauth !== undefined) {
//       this.oauthOptions.body = itemActionRequest;
//       this.oauthOptions.uri = `${this.apibaseDestiny2}/Actions/Items/EquipItems/`;
//       this.oauthOptions.json = true;
//       return new Promise<IAPIResponse<IDestinyEquipItemResults>>((resolve, reject) => {
//         this.httpService
//           .post(this.oauthOptions)
//           .then((response: IAPIResponse<IDestinyEquipItemResults>) => {
//             resolve(response);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//     } else {
//       throw new OAuthError(
//         'You have to use OAuth to access this endpoint. Your oauth object is this: ' +
//           JSON.stringify(this.oauth) +
//           ' Please use traveler.oauth = yourOauthObject to set it.'
//       );
//     }
//   }

//   /**
//    * Set the Lock State for an instanced item in your inventory. You must have a valid Destiny Account.
//    * @async
//    * @param stateRequest An object containing following keys: <br />
//    * <ul>
//    * <li>state {boolean}: Set lock state = true, remove lock state = false</li>
//    * <li>itemId {string}: Multiple itemInstanceId (**not hash**) of the item which you want to change the lock state on</li>
//    * <li>charcterId {string}: The character ID of the character who owns the item</li>
//    * <li>membershipType {number}: The BungieMemberschipType</li>
//    * </ul>
//    */
//   public setItemLockState(stateRequest: IDestinyItemStateRequest): Promise<IAPIResponse<number>> {
//     if (this.oauth !== undefined) {
//       this.oauthOptions.body = stateRequest;
//       this.oauthOptions.uri = `${this.apibaseDestiny2}/Actions/Items/SetLockState/`;
//       this.oauthOptions.json = true;
//       return new Promise<IAPIResponse<number>>((resolve, reject) => {
//         this.httpService
//           .post(this.oauthOptions)
//           .then((response: IAPIResponse<number>) => {
//             resolve(response);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//     } else {
//       throw new OAuthError(
//         'You have to use OAuth to access this endpoint. Your oauth object is this: ' +
//           JSON.stringify(this.oauth) +
//           ' Please use traveler.oauth = yourOauthObject to set it.'
//       );
//     }
//   }

//   /**
//    * Extract an item from the Postmaster, with whatever implications that may entail. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item.
//    * @async
//    * @param postMasterTransferRequest
//    */
//   public pullFromPostmaster(
//     postMasterTransferRequest: IDestinyPostMasterTransferRequest
//   ): Promise<IAPIResponse<number>> {
//     if (this.oauth !== undefined) {
//       this.oauthOptions.body = postMasterTransferRequest;
//       this.oauthOptions.uri = `${this.apibaseDestiny2}/Actions/Items/PullFromPostmaster/`;
//       this.oauthOptions.json = true;
//       return new Promise<IAPIResponse<number>>((resolve, reject) => {
//         this.httpService
//           .post(this.oauthOptions)
//           .then((response: IAPIResponse<number>) => {
//             resolve(response);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//     } else {
//       throw new OAuthError(
//         'You have to use OAuth to access this endpoint. Your oauth object is this: ' +
//           JSON.stringify(this.oauth) +
//           ' Please use traveler.oauth = yourOauthObject to set it.'
//       );
//     }
//   }

//   /**
//    * Transfer an item to/from your vault. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item (in your inventory).
//    * @async
//    * @param transferRequest An object containing following keys: <br />
//    * <ul>
//    * <li>itemReferenceHash {string}: hash of the item</li>
//    * <li>stackSize{number}: How many of the item</li>
//    * <li>transferToVault {boolean} Transfer to vault - true, from vault - false</li>
//    * <li>itemId {string}: itemInstanceId (**not hash**) of the item which you want to transfer/li>
//    * <li>charcterId {string}: The character ID of the character who owns the item</li>
//    * <li>membershipType {umber}: The BungieMemberschipType</li>
//    * </ul>
//    */
//   public transferItem(transferRequest: IDestinyItemTransferRequest): Promise<IAPIResponse<number>> {
//     if (this.oauth !== undefined) {
//       this.oauthOptions.body = transferRequest;
//       this.oauthOptions.uri = `${this.apibaseDestiny2}/Actions/Items/TransferItem/`;
//       this.oauthOptions.json = true;
//       return new Promise<IAPIResponse<number>>((resolve, reject) => {
//         this.httpService
//           .post(this.oauthOptions)
//           .then((response: IAPIResponse<number>) => {
//             resolve(response);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//     } else {
//       throw new OAuthError(
//         'You have to use OAuth to access this endpoint. Your oauth object is this: ' +
//           JSON.stringify(this.oauth) +
//           ' Please use traveler.oauth = yourOauthObject to set it.'
//       );
//     }
//   }

//   /**
//    * Insert a plug into a socketed item. <strong>NOT RELEASED</strong>
//    * @async
//    * @not-released
//    * @param itemActionRequest An object containing following keys: <br />
//    * <ul>
//    * <li>itemId {string} - The itemInstanceId (**not hash**) of the item you want to equipt</li>
//    * <li>charcterId {string} The character ID of the character who gets the item</li>
//    * <li>membershipType {number} The BungieMemberschipType</li>
//    * </ul>
//    */
//   public insertSocketPlug(itemActionRequest: IDestinyItemActionRequest): Promise<IAPIResponse<SocketResponseCodes>> {
//     if (this.oauth !== undefined) {
//       this.oauthOptions.body = itemActionRequest;
//       this.oauthOptions.uri = `${this.apibaseDestiny2}/Actions/Items/InsertSocketPlug/`;
//       this.oauthOptions.json = true;
//       return new Promise<IAPIResponse<SocketResponseCodes>>((resolve, reject) => {
//         this.httpService
//           .post(this.oauthOptions)
//           .then((response: IAPIResponse<SocketResponseCodes>) => {
//             resolve(response);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//     } else {
//       throw new OAuthError(
//         'You have to use OAuth to access this endpoint. Your oauth object is this: ' +
//           JSON.stringify(this.oauth) +
//           ' Please use traveler.oauth = yourOauthObject to set it.'
//       );
//     }
//   }

//   /**
//    * Generates the OAuthURL where your users need to sign up to give your application access to
//    * authorized endpoints.
//    */
//   public generateOAuthURL(): string {
//     if (this.oauthConfig.clientId !== undefined) {
//       return `https://www.bungie.net/en/OAuth/Authorize?client_id=${this.oauthConfig.clientId}&response_type=code`;
//     } else {
//       throw new OAuthError(
//         'You did not specify a OAuth client ID. Your OAuth config is this: ' + JSON.stringify(this.oauthConfig)
//       );
//     }
//   }

//   /**
//    * Retreive the Oauth access token from the authorization code
//    * @async
//    * @param code The authorization code from the oauth redirect url
//    */
//   public getAccessToken(code: string): Promise<IOAuthResponse> {
//     let options: rp.OptionsWithUri;
//     if (this.oauthConfig.clientSecret) {
//       // you use a confidential client
//       options = {
//         body: querystring.stringify({
//           client_id: this.oauthConfig.clientId,
//           code: `${code}`,
//           grant_type: 'authorization_code'
//         }),
//         headers: {
//           authorization: `Basic ${new Buffer(`${this.oauthConfig.clientId}:${this.oauthConfig.clientSecret}`).toString(
//             'base64'
//           )}`,
//           'content-type': 'application/x-www-form-urlencoded',
//           'user-agent': this.userAgent
//         },
//         json: true,
//         uri: 'https://www.bungie.net/platform/app/oauth/token/'
//       };
//     } else {
//       options = {
//         body: querystring.stringify({
//           client_id: this.oauthConfig.clientId,
//           code: `${code}`,
//           grant_type: 'authorization_code'
//         }),
//         headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           'user-agent': this.userAgent
//         },
//         json: true,
//         uri: 'https://www.bungie.net/platform/app/oauth/token/'
//       };
//     }
//     return new Promise<IOAuthResponse>((resolve, reject) => {
//       this.httpService
//         .post(options)
//         .then((response: IOAuthResponse) => {
//           resolve(response);
//         })
//         .catch(err => {
//           reject(err);
//         });
//     });
//   }

//   /**
//    * Use the refreshToken to retrieve a new valid access_token.
//    * Please keep the expiration durations in mind.
//    * <strong>This is only possible with a confidential app, as only this will get a refresh token to use</strong>
//    * @async
//    * @param refreshToken
//    */
//   public refreshToken(refreshToken: string): Promise<IOAuthResponse> {
//     const options = {
//       body: querystring.stringify({
//         grant_type: 'refresh_token',
//         refresh_token: `${refreshToken}`
//       }),
//       headers: {
//         authorization: `Basic ${new Buffer(`${this.oauthConfig.clientId}:${this.oauthConfig.clientSecret}`).toString(
//           'base64'
//         )}`,
//         'content-type': 'application/x-www-form-urlencoded'
//       },
//       json: true,
//       method: 'POST',
//       uri: 'https://www.bungie.net/platform/app/oauth/token/'
//     };

//     return new Promise<IOAuthResponse>((resolve, reject) => {
//       this.httpService
//         .post(options)
//         .then((response: IOAuthResponse) => {
//           resolve(response);
//         })
//         .catch(err => {
//           reject(err);
//         });
//     });
//   }
//   /**
//    * Generates the query string parameters out of the specified object which contains the parameters
//    * @async
//    * @param queryStringParameters: Object which contains the query keys and values
//    * @return The query string to add to the endpoint url
//    */
//   private resolveQueryStringParameters(queryStringParameters: IQueryStringParameters): string {
//     let queryString = '?';
//     const end = Object.keys(queryStringParameters).length;
//     let count = 0;

//     for (const key in queryStringParameters) {
//       if (queryStringParameters.hasOwnProperty(key)) {
//         count++;
//         const value = queryStringParameters[key];
//         if (count !== end) {
//           queryString = queryString.concat(key, '=', value, '&');
//         } else {
//           queryString = queryString.concat(key, '=', value);
//         }
//       }
//     }
//     return queryString;
//   }

//   /**
//    * Initialize a request to perform an advanced write action.
//    * @async
//    * @notuseable
//    * @param awaPermissionRequest An object containing following keys: <br />
//    * <ul>
//    * <li>type {DestinyAdvancedAwaType} - Type of advanced write action.</li>
//    * <li>charcterId {number} - Item instance ID the action shall be applied to. This is optional for all but a new AwaType values. Rule of thumb is to provide the item instance ID if one is available.</li>
//    * <li>membershipType {number} - The BungieMemberschipType</li>
//    * <li>affectedItemId {number} Id of the item being affected.</li>
//    * </ul>
//    *
//    */
//   /*private awaInitializeRequest(awaPermissionRequest: IDestinyAdvancedAwaPermissionRequested): Promise<IAPIResponse<IDestinyAdvancedAwaInitializeResponse>> {
//           if (this.oauth !== undefined) {
//               this.oauthOptions.body = awaPermissionRequest;
//               this.oauthOptions.uri = `${this.apibase}/Awa/Initialize/`;
//               this.oauthOptions.json = true;
//               return new Promise<IAPIResponse<IDestinyAdvancedAwaInitializeResponse>>((resolve, reject) => {
//                   this.httpService.post(this.oauthOptions)
//                       .then((response: IAPIResponse<IDestinyAdvancedAwaInitializeResponse>) => {
//                           resolve(response);
//                       })
//                       .catch((err) => {
//                           reject(err);
//                       });
//               });
//           } else {
//               throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
//           }
//       }*/

//   /**
//    * Provide the result of the user interaction. Called by the Bungie Destiny App to approve or reject a request.
//    * @async
//    * @notusable
//    * @param awaUserResponse An object containing following keys: <br />
//    * <ul>
//    * <li>selection {DestinyAdvancedAwaUserSelection} - Indication of the selection the user has made (Approving or rejecting the action).</li>
//    * <li>correlationId {number} - Correlation ID of the request.</li>
//    * <li>nonce {any} - Secret nonce received via the PUSH notification</li>
//    * </ul>
//    * @return {Promise.number} When fulfilled returns a number
//    */
//   /*private awaProvideAuthorizationResult(awaUserResponse: IDestinyAdvancedAwaUserResponse): Promise<IAPIResponse<number>> {
//           if (this.oauth !== undefined) {
//               this.oauthOptions.body = awaUserResponse;
//               this.oauthOptions.uri = `${this.apibase}/Awa/AwaProvideAuthorizationResult/`;
//               this.oauthOptions.json = true;
//               return new Promise<IAPIResponse<number>>((resolve, reject) => {
//                   this.httpService.post(this.oauthOptions)
//                       .then((response: IAPIResponse<number>) => {
//                           resolve(response);
//                       })
//                       .catch((err) => {
//                           reject(err);
//                       });
//               });
//           } else {
//               throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
//           }
//       }*/

//   /**
//    * Returns the action token if user approves the request.
//    * @async
//    * @notusable
//    * @param correlationId The identifier for the advanced write action request.
//    * @return {Promise.IDestinyAdvancedAwaAuthorizationResult} When fulfilled returns a IDestinyAdvancedAwaAuthorizationResult
//    */
//   /*private awaGetActionToken(correlationId: string): Promise<IAPIResponse<IDestinyAdvancedAwaAuthorizationResult>> {
//           if (this.oauth !== undefined) {
//               this.oauthOptions.body = correlationId;
//               this.oauthOptions.uri = `${this.apibase}/Awa/GetActionToken/${correlationId}`;
//               this.oauthOptions.json = true;
//               return new Promise<IAPIResponse<IDestinyAdvancedAwaAuthorizationResult>>((resolve, reject) => {
//                   this.httpService.post(this.oauthOptions)
//                       .then((response: IAPIResponse<IDestinyAdvancedAwaAuthorizationResult>) => {
//                           resolve(response);
//                       })
//                       .catch((err) => {
//                           reject(err);
//                       });
//               });
//           } else {
//               throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
//           }
//       }*/

//   /**
//    * Report a player that you met in an activity that was engaging in ToSviolating activities. Both you and the offending player must have played in the activityId passed in.
//    * Please use this judiciously and only when you have strong suspicions of violation, pretty please.
//    * @async
//    * @notuseable
//    * @param activityId The ID of the activity where you ran into the brigand that you're reporting.
//    * @return {Promise.IAPIResponse<IDestinyPostGameCarnageReportData>} When fulfilled returns an object containing the carnage report for the specified activity
//    */
//   /*private reportOffensivePostGameCarnageReportPlayer(activityId: string, destinyReportOffensePgcrRequest: IDestinyReportOffensePgcrRequest): Promise<IAPIResponse<number>> {
//           if (this.oauth !== undefined) {
//               this.oauthOptions.body = destinyReportOffensePgcrRequest;
//               this.options.uri = `${this.apibase}/Stats/PostGameCarnageReport/${activityId}/Report/`;
//               this.oauthOptions.json = true;
//               return new Promise<IAPIResponse<number>>((resolve, reject) => {
//                   this.httpService.post(this.oauthOptions)
//                       .then((response: IAPIResponse<number>) => {
//                           resolve(response);
//                       })
//                       .catch((err) => {
//                           reject(err);
//                       });
//               });
//           } else {
//               throw new OAuthError('You have to use OAuth to access this endpoint. Your oauth object is this: ' + JSON.stringify(this.oauth) + ' Please use traveler.oauth = yourOauthObject to set it.');
//           }
//       }*/

//   get oauth(): IOAuthResponse {
//     return this._oauth;
//   }

//   set oauth(oauth: IOAuthResponse) {
//     this._oauth = oauth;
//     this.oauthOptions = {
//       headers: {
//         Authorization: `Bearer ${this.oauth.access_token}`,
//         'X-API-Key': this.apikey,
//         'user-agent': this.userAgent
//       },
//       json: true,
//       simple: true,
//       uri: ''
//     };
//   }
