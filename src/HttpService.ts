import * as got from 'got';
import Logger from './Logger';

/**
 * Wrapper class for the request package. Used to make HTTP calls.
 */
export default class HTTPService {
  private debug?: boolean;
  private options: got.GotJSONOptions;

  constructor(options: got.GotJSONOptions, debug?: boolean) {
    this.debug = debug;
    this.options = options;
  }

  /**
   * Base method for GET requests
   *
   * @param {string} url Url to GET from
   * @param {string} [authenticationToken] optional authentication token
   * @returns {Promise<object>}
   * @memberof HTTPService
   */
  public get(url: string, authenticationToken?: string): Promise<object> {
    if (this.debug) {
      Logger.debug(`GET - ${url}${authenticationToken ? ' - OAUTH request' : ''}`);
    }
    //Deep copy
    const authOptions = JSON.parse(JSON.stringify(this.options));
    authOptions.headers['Authorization'] = `Bearer ${authenticationToken}`;

    return new Promise<object>((resolve, reject) => {
      got(url, authenticationToken ? authOptions : this.options)
        .then(response => {
          resolve(response.body);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public post(url: string, data: got.GotFormOptions<string>): Promise<object> {
    if (this.debug) {
      Logger.debug(`POST - ${url}`);
    }

    return new Promise<object>((resolve, reject) => {
      got
        .post(url, data)
        .then(response => {
          resolve(JSON.parse(response.body));
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
