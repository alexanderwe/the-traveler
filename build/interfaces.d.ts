import { ComponentType, DestinyActivityModeType, DestinyStatsGroupType, PeriodType } from './enums';
/**
 * Interface for defining an object for the Traveler class
 * @interface
 */
export interface IConfig {
    apikey: string;
    userAgent: string;
    debug?: boolean;
}
/**
 * Interface for defining an object for the endpoint query strings
 * @interface
 */
export interface IQueryStringParameters {
    components?: ComponentType[];
    modes?: DestinyActivityModeType[];
    maxtop?: number;
    statid?: string;
    page?: number;
    dayend?: string;
    daystart?: string;
    groups?: DestinyStatsGroupType[];
    periodType?: PeriodType;
    count?: number;
}
