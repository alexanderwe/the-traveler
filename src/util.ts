import { IQueryStringParameters } from './type-definitions/additions';
import { OAuthError } from './type-definitions/errors';

/**
 * Generates the query string parameters out of the specified object which contains the parameters
 *
 * @export
 * @param {IQueryStringParameters} queryStringParameters Object which contains the query keys and values
 * @returns {string} The query string to add to the endpoint url
 */
export function resolveQueryStringParameters(
  queryStringParameters: IQueryStringParameters
): string {
  let queryString = '?';
  const end = Object.keys(queryStringParameters).length;
  let count = 0;

  for (const key in queryStringParameters) {
    if (queryStringParameters.hasOwnProperty(key)) {
      count++;
      const value = queryStringParameters[key];
      if (count !== end) {
        queryString = queryString.concat(key, '=', value, '&');
      } else {
        queryString = queryString.concat(key, '=', value);
      }
    }
  }
  return queryString;
}

/**
 * Checks for existing of an oauth access token.
 * Throws an OauthError if not present.
 *
 * @export
 * @param {string} [oauthAccesstoken]
 */
export function checkOauthToken(oauthAccesstoken?: string) {
  if (!oauthAccesstoken) {
    throw new OAuthError('You have to use OAuth to access this endpoint.');
  }
}
