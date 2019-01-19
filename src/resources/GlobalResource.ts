import BungieResource from './BungieResoure';
import HTTPService from '../HttpService';

import { IServerResponse } from '../type-definitions/common';
import { IGlobalAlert, IDictionaryResponse } from '../type-definitions/additions';

export default class GlobalResource extends BungieResource {
  protected resourcePath: string;

  constructor(httpService: HTTPService) {
    super(httpService);
    this.resourcePath = `${this.basePath}`;
  }

  /**
   * List of available localization cultures
   * @async
   * @return {Promise.ServerResponse<any>} When fulfilled returns a list of available localization cultures
   */
  public getAvailableLocales(): Promise<IServerResponse<IDictionaryResponse<string>>> {
    return new Promise<IServerResponse<IDictionaryResponse<string>>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/GetAvailableLocales/`)
        .then((response: IServerResponse<IDictionaryResponse<string>>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Get the common settings used by the Bungie.Net environment.
   * @async
   * @return {Promise.IServerResponse<any>} When fulfilled returns an object containing the common settings
   */
  public getCommonSettings(): Promise<IServerResponse<any>> {
    return new Promise<IServerResponse<any>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/Settings/`)
        .then((response: IServerResponse<any>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets any active global alert for display in the forum banners, help pages, etc. Usually used for DOC alerts.
   * @async
   * @return {Promise.IServerResponse<IDestinyManifest>} When fulfilled returns an object containing the current Global Alerts
   */
  public getGlobalAlerts(): Promise<IServerResponse<IGlobalAlert[]>> {
    return new Promise<IServerResponse<IGlobalAlert[]>>((resolve, reject) => {
      this.httpService
        .get(`${this.resourcePath}/GlobalAlerts/`)
        .then((response: IServerResponse<IGlobalAlert[]>) => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
