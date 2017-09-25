import 'es6-promise';
import * as querystring from 'querystring';
import * as rp from 'request-promise-native';
import { IAPIResponse } from './interfaces';

/**
 * Wrapper class for the request package. Used to make HTTP calls.
 */
export default class HTTPService {
    private debug?: boolean;

    constructor(debug?: boolean) {
        this.debug = debug;
    }

    /**
     * Base function for GET requests
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    public get(options: rp.OptionsWithUri): Promise<object> {
        options.method = 'GET';
        options.json = true;
        if (this.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Debug url:' + options.uri);
        }
        return new Promise<object>((resolve, reject) => {
            rp(options)
                .then((response) => {
                    if (response.access_token) { // this is a oauth reponse
                        resolve(response);
                    } else if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Base function for POST requests
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    public post(options: rp.OptionsWithUri): Promise<object> {
        options.method = 'POST';
        if (this.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Debug url:' + options.uri);
        }
        return new Promise<object>((resolve, reject) => {
            rp(options)
                .then((response) => {
                    if (response.access_token) { // this is a oauth reponse
                        resolve(response);
                    } else if (response.ErrorCode !== 1) {
                        reject(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
