/// <reference types="request-promise-native" />
import 'es6-promise';
import * as rp from 'request-promise-native';
/**
 * Wrapper class for the request package. Used to make HTTP calls.
 */
export default class HTTPService {
    private debug?;
    constructor(debug?: boolean);
    /**
     * Base function for GET requests
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    get(options: rp.OptionsWithUri): Promise<object>;
    /**
     * Base function for POST requests
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    post(options: rp.OptionsWithUri): Promise<object>;
}
