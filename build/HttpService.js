"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise");
var rp = require("request-promise-native");
/**
 * Wrapper class for the request package. Used to make HTTP calls.
 */
var HTTPService = /** @class */ (function () {
    function HTTPService(debug) {
        this.debug = debug;
    }
    /**
     * Base function for GET requests
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    HTTPService.prototype.get = function (options) {
        options.method = 'GET';
        options.json = true;
        if (this.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Debug url:' + options.uri);
        }
        return new Promise(function (resolve, reject) {
            rp(options)
                .then(function (response) {
                if (response.access_token) {
                    resolve(response);
                }
                else if (response.ErrorCode !== 1) {
                    reject(response);
                }
                else {
                    resolve(JSON.parse(JSON.stringify(response)));
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Base function for POST requests
     * @async
     * @param options Options for the request package to use
     * @return {Promise.any} When fulfilled returns an object containing the response from the request
     */
    HTTPService.prototype.post = function (options) {
        options.method = 'POST';
        if (this.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Debug url:' + options.uri);
        }
        return new Promise(function (resolve, reject) {
            rp(options)
                .then(function (response) {
                if (response.access_token) {
                    resolve(response);
                }
                else if (response.ErrorCode !== 1) {
                    reject(response);
                }
                resolve(response);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return HTTPService;
}());
exports.default = HTTPService;
