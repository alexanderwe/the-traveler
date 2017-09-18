import { BungieMembershipType, ComponentType, DestinyActivityModeType, DestinyStatsGroupType, PeriodType } from './enums';

/**
 * Interface for defining an object for the Traveler class
 * @interface
 */
export interface IConfig {
    apikey: string;
    userAgent: string;
    oauthClientId?: string;
    oauthClientSecret?: string;
    debug?: boolean;
}

/**
 * Interface for defining an object in case of an item action request to the API
 * @interface
 */
export interface IDestinyItemActionRequest {
    itemId?: string;
    itemIds?: string[];
    characterId: string;
    membershipType: BungieMembershipType;
}

/**
 * Interface for defining an object for the endpoint query strings
 * @interface 
 */
export interface IQueryStringParameters {
    components?: ComponentType[];
    modes?: DestinyActivityModeType[];
    mode?: DestinyActivityModeType;
    maxtop?: number;
    statid?: string;
    page?: number;
    dayend?: string;
    daystart?: string;
    groups?: DestinyStatsGroupType[];
    periodType?: PeriodType;
    count?: number;
    [key: string]: any;
}

/**
 * Interface for defining an object for the OAuth process
 * @interface 
 */
export interface IOAuthConfig {
    clientId?: string;
    clientSecret?: string;
}

/**
 * Interface for defining an object for the OAuth response
 * @interface 
 */
export interface IOAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    refresh_expires_in?: number;
    membership_id: string;
}
