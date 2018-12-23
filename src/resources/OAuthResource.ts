import BungieResource from './BungieResoure';
import HTTPService from '../HttpService';
import got = require('got');
import { IOAuthResponse, ITravelerConfig } from '../type-definitions/additions';
import { OAuthError } from '../type-definitions/errors';

export default class OAuthResource extends BungieResource {
  protected resourcePath: string;
  private userAgent: string;

  constructor(config: ITravelerConfig, httpService: HTTPService) {
    super(httpService);
    this.resourcePath = ``;
    this.userAgent = config.userAgent;
  }

  /**
   * Generates the OAuthURL where your users need to sign up to give your application access to
   * authorized endpoints.
   *
   * @param {string} oauthClientId
   * @returns {string}
   * @memberof Traveler
   */
  public generateOAuthURL(oauthClientId: string): string {
    if (oauthClientId !== undefined) {
      return `https://www.bungie.net/en/OAuth/Authorize?client_id=${oauthClientId}&response_type=code`;
    } else {
      throw new OAuthError('You did not specify a OAuth client Id');
    }
  }

  /**
   * Retreive the Oauth access token from the authorization code
   *
   * @param {string} code The authorization code from the oauth redirect url
   * @param {string} [oauthClientId] The oauth client id if present
   * @param {string} [oauthClientSecret] The oauth client secret key if present
   * @returns {Promise<IOAuthResponse>}
   * @memberof Traveler
   */
  public getAccessToken(code: string, oauthClientId?: string, oauthClientSecret?: string): Promise<IOAuthResponse> {
    let form = new FormData();
    form.append('client_id', oauthClientId);
    form.append('code', code);
    form.append('grant_type', 'authorization_code');

    let options: got.GotJSONOptions = {
      body: form,
      headers:
        oauthClientId && oauthClientSecret
          ? {
              authorization: `Basic ${new Buffer(`${oauthClientId}:${oauthClientSecret}`).toString('base64')}`,
              'content-type': 'application/x-www-form-urlencoded',
              'user-agent': this.userAgent
            }
          : {
              'content-type': 'application/x-www-form-urlencoded',
              'user-agent': this.userAgent
            },

      json: true
    };
    return new Promise<IOAuthResponse>((resolve, reject) => {
      this.httpService
        .post('https://www.bungie.net/platform/app/oauth/token/', options)
        .then((response: IOAuthResponse) => {
          resolve(response);
        })
        .catch(err => {
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

  /**
   * Use the refreshToken to retrieve a new valid access_token.
   * Please keep the expiration durations in mind.
   * <strong>This is only possible with a confidential app, as only this will get a refresh token to use</strong>
   *
   * @param {string} refreshToken
   * @param {string} oauthClientId The oauth client id
   * @param {string} oauthClientSecret The oauth client secret key
   * @returns {Promise<IOAuthResponse>}
   * @memberof Traveler
   */
  public refreshToken(refreshToken: string, oauthClientId: string, oauthClientSecret: string): Promise<IOAuthResponse> {
    let form = new FormData();
    form.append('refresh_token', refreshToken);
    form.append('grant_type', 'refresh_token');

    const options: got.GotJSONOptions = {
      body: form,
      headers: {
        authorization: `Basic ${new Buffer(`${oauthClientId}:${oauthClientSecret}`).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    return new Promise<IOAuthResponse>((resolve, reject) => {
      this.httpService
        .post('https://www.bungie.net/platform/app/oauth/token/', options)
        .then((response: IOAuthResponse) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
