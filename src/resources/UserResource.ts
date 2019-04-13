import BungieResource from './BungieResoure';
import HTTPService from '../HttpService';
import { ServerResponse } from '../type-definitions/app';
import { UserMembershipData, BungieMembershipType } from '../type-definitions/user';
import { checkOauthToken } from '../util';

export default class UserResource extends BungieResource {
  protected resourcePath: string;

  constructor(httpService: HTTPService) {
    super(httpService);
    this.resourcePath = `${this.basePath}/User`;
  }

  /**
   * Returns a list of accounts associated with signed in user. This is useful for OAuth implementations that do not give you access to the token response.
   * ```js
   * traveler.user
   *  .getMembershipDataForCurrentUser('oauthAccessToken')
   *  .then(response => {
   *    console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   * @param {string} oauthAccesstoken
   * @returns {Promise<ServerResponse<UserMembershipData>>}
   * @memberof UserResource
   */
  public getMembershipDataForCurrentUser(oauthAccesstoken: string): Promise<ServerResponse<UserMembershipData>> {
    checkOauthToken(oauthAccesstoken);

    return new Promise<ServerResponse<UserMembershipData>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/GetMembershipsForCurrentUser/`, oauthAccesstoken)
        .then((response: ServerResponse<UserMembershipData>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Returns a list of accounts associated with the supplied membership ID and membership type.
   * This will include all linked accounts (even when hidden) if supplied credentials permit it.
   *
   * ```js
   * traveler.user
   *  .getMembershipDataById('membershipId', BungieMembershipType.TigerPsn, 'oauthAccessToken')
   *  .then(response => {
   *    console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   *
   * @param {string} destinyMembershipId
   * @param {BungieMembershipType} membershipType
   * @param {string} oauthAccesstoken
   * @returns {Promise<IAPIResponse<UserMembershipData>>}
   * @memberof UserResource
   */
  public getMembershipDataById(
    destinyMembershipId: string,
    membershipType: BungieMembershipType,
    oauthAccesstoken: string
  ): Promise<ServerResponse<UserMembershipData>> {
    checkOauthToken(oauthAccesstoken);

    return new Promise<ServerResponse<UserMembershipData>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/GetMembershipsById/${destinyMembershipId}/${membershipType}/`, oauthAccesstoken)
        .then((response: ServerResponse<UserMembershipData>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
