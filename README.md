# the-traveler 
[![npm](https://img.shields.io/npm/v/the-traveler.svg)](https://www.npmjs.com/package/the-traveler)
[![npm](https://img.shields.io/npm/dt/the-traveler.svg)](https://www.npmjs.com/package/the-traveler)
[![Build Status](https://travis-ci.org/alexanderwe/the-traveler.svg?branch=master)](https://travis-ci.org/alexanderwe/the-traveler)
[![codecov](https://codecov.io/gh/alexanderwe/the-traveler/branch/master/graph/badge.svg)](https://codecov.io/gh/alexanderwe/the-traveler)
[![dependencies Status](https://david-dm.org/alexanderwe/the-traveler/status.svg)](https://david-dm.org/alexanderwe/the-traveler)
[![Known Vulnerabilities](https://snyk.io/test/github/alexanderwe/the-traveler/badge.svg)](https://snyk.io/test/github/alexanderwe/the-traveler/badge.svg)

the-traveler is a small npm package which wraps around the Destiny 2 API. It uses Promises for a modern workflow in your application.

Table of Contents
=================

   * [the-traveler](#the-traveler)
   * [Table of Contents](#table-of-contents)
      * [Getting Started](#getting-started)
         * [Prerequisites](#prerequisites)
      * [OAuth](#oauth)
      * [Notices](#notices)
         * [Typescript Support](#typescript-support)
         * [Typical Response](#typical-response)
         * [Privacy](#privacy)
         * [Documentation](#documentation)
      * [Examples](#examples)
         * [Search for an Destiny Account on PSN](#search-for-an-destiny-account-on-psn)
         * [Get a character for an PSN Account](#get-a-character-for-an-psn-account)
         * [Transfer item from vault to character (needs OAuth)](#transfer-item-from-vault-to-character-needs-oauth)
         * [Async await approach (pseudo-code)](#async-await-approach-pseudo-code)
         * [Manifest](#manifest)
      * [Progress](#progress)
      * [Built With](#built-with)
      * [Versioning](#versioning)
      * [Issues](#issues)
      * [License](#license)
      * [Acknowledgments](#acknowledgments)




## Getting Started


```
npm install the-traveler
# or
yarn add the-traveler
```

### Prerequisites

To use this package you will need to obtain an API access key from the Bungie.net developer website. Please visit [https://www.bungie.net/en/Application](https://www.bungie.net/en/Application) to obtain your access token.

After obtaining your access token you are ready for using the Destiny 2 API in your next awesome project.

```
import Traveler from 'the-traveler';
import { ComponentType } from 'the-traveler/build/enums';

const traveler = new Traveler({
    apikey: 'pasteYourAPIkey',
    userAgent: 'yourUserAgent', //used to identify your request to the API
});
```

If you want to use this package inside a ES5 project you can import it like so:

```
var Traveler = require('the-traveler').default;
const Enums = require('the-traveler/build/enums')

const traveler = new Traveler({
    apikey: 'yourAPIkey',
    userAgent: 'yourUserAgent' //used to identify your request to the API
});

//Access the enums (example componentType profiles)
var profilesType = Enums.ComponentType.Profiles;

```

_If you want to show the URLs the API wrapper is requesting, just add `debug: true` to the configuration array when instantiate a `Traveler` object_
```
const traveler = new Traveler({
    apikey: 'pasteYourAPIkey',
    userAgent: 'yourUserAgent', //used to identify your request to the API
    debug: true 
});
```

## OAuth

If you want to use OAuth to get access to endpoints which require user approval provide the `Traveler` object with your OAuth `clientId` and if you are using a confidential client type additionally the `clientSecret`.

```
import Traveler from 'the-traveler';

const traveler = new Traveler({
    apikey: 'pasteYourAPIkey',
    userAgent: 'yourUserAgent', //used to identify your request to the API
    oauthClientId: 'yourClientId',
    oauthClientSecret: 'yourClientSecret',
});
```


Please ensure that you specified a `redirectURL` in your application settings on [https://www.bungie.net/en/Application](https://www.bungie.net/en/Application).
After you have done that, you can generate the authentication URL which has to be visited by your users to approve your application. The URL is constructed with the following schema: `https://www.bungie.net/en/OAuth/Authorize?client_id={yourClientID}&response_type=code`. 

```
const authUrl = traveler.generateOAuthURL(); // The URL your users have to visit to give your application access
```


If a user visit this site and approve your application he/she will be redirected to the `redirectURL` you specified. This URL is expaned with query parameter called `code`: `https://www.example.com/?code=hereComesTheCode`

This is the code you need to obtain the OAuth Access token with the  `getAccessToken()` method.

```
traveler.getAccessToken(hereComesTheCode).then(oauth => {
    // Provide your traveler object with the oauth object. This is later used for making authenticated calls
    traveler.oauth = oauth; 
}).catch(err => {
    console.log(err)
})
```

The OAuth response schema is depended on the client type you are using. With a `public` type the response does **not** contain a `refresh_token`. This means that a user has to authenticate everytime again after the OAuth access token has expired.


_Response_:
```
{ access_token: '',
  token_type: 'Bearer',
  expires_in: 3600,
  membership_id: ''}
```

If you are using a `confidential` client type the response will contain a `refresh_token` which can be used to get a new `access_token` without requiring the user to approve your app again. Use this `refresh_token` to prevent you from getting errors if the `access_token` has expired.  In the following you can see such a response with the method to renew the token.

_Response_:
```
{ access_token: '',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: ',
  refresh_expires_in: 7776000,
  membership_id: '' }

``` 
_Use refresh_:
```
traveler.refreshToken(traveler.oauth.refresh_token).then(oauth => { // take the refresh token from the oauth object you provided when initialize the oauth to the traveler
    // Provide your traveler object with the oauth object. This is later used for making authenticated calls
    traveler.oauth = oauth; 
}).catch(err => {
    console.log(err)
})
```
So the refresh procedure has to be initiated manually, there is no automatic refresh implemented.

To wrap this up, the flow is the following:

* Provide `clientId` and `clientSecret (only for confidential)`
* Generate `authUrl` and redirect users to it
* Grab the `code` parameter from your `redirectURL`
* Use `code` to get the `OAuth object` and apply it to the `Traveler object`
* **FOR Public** Reauthenticate your users after the access token has expired. They have to visit the `authorization url` again
* **FOR Confidential**  Use `traveler.oauth.refreshtoken` to renew the `accessToken`, without user interaction by `traveler.refreshToken()`
* After the oauth object is set on the traveler object you can query the endpoints which require authentiation
    * You can try to use this approach with `async` and `await` to overcome the `callback hell`, see [Async await approach (pseudo-code)](#async-await-approach-pseudo-code)
* Keep in mind that it would be very useful to store the tokens for your users _**securely**_!

## Notices


### Typescript Support


The npm package comes with `d.ts` files to allow autocompletion and type checking if you are using `the-traveler` within Typescript. 

![](https://raw.githubusercontent.com/alexanderwe/the-traveler/master/output.gif)


There are some other noteworthy information which could help to resolve some issues with the Destiny 2 API.

### Typical Response

The response object from the API is always constructed like the following snippet indicates. The `Response` will contain the actual request data, while `ErrorCode`, `ThrottleSeconds`, `ErrorStatus`, `Message` and `MessageData` will hold additional data about the sucess of our request. 

```
{ Response: Array or Object,
  ErrorCode: 1,
  ThrottleSeconds: 0,
  ErrorStatus: 'Success',
  Message: 'Ok',
  MessageData: {} }
```
### Privacy

Some information in the Destiny API is privacy protected. If the user set the pricacy settings, and you do not use oauth for those users, it is not possible to obtain specific information through the API. The different pricacy indicators are the following:

* None: 0
* Public: 1
* Private: 2

### Documentation

* The documentation for this package can be found at [The Traveler documentation](https://alexanderwe.github.io/the-traveler/)
* A fully complete documentation about the different endpoints and methods can be found at the [official Destiny 2 API site](https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest)


## Examples

### Search for an Destiny Account on PSN

_Query:_
```
traveler
    .searchDestinyPlayer('2', 'playername')
    .then(player => {
        console.log(player);
    }).catch(err => {
        //do something with the error
    })
```

_Response_
```
{ Response:
   [ { iconPath: '/img/theme/destiny/icons/icon_psn.png',
       membershipType: 2,
       membershipId: '4611686018433838874',
       displayName: 'Playername' } ],
  ErrorCode: 1,
  ThrottleSeconds: 0,
  ErrorStatus: 'Success',
  Message: 'Ok',
```

### Get a character for an PSN Account

Here all character specific components are queried. You can either use normal strings or use the integrated enums.

_Query:_
```
import Traveler from 'the-traveler';
import {ComponentType} from 'the-traveler/build/enums' 

const traveler = new Traveler({
    apikey: 'pasteYourAPIkey',
    userAgent: 'yourUserAgent' //used to identify your request to the API
});

traveler.getCharacter('2', '4611686018452033461', '2305843009265042115', { components: ['200', '201', '202', '203', '204', '205'] }).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

// OR

traveler.getCharacter('2', '4611686018452033461', '2305843009265042115', {
    components:
    [
        ComponentType.Characters,
        ComponentType.CharacterInventories,
        ComponentType.CharacterProgressions,
        ComponentType.CharacterRenderData,
        ComponentType.CharacterActivities,
        ComponentType.CharacterEquipment
    ]
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

```
_Response (First level):_
```
{ Response:
   { inventory: { privacy: 2 },
     character: { data: [Object], privacy: 1 },
     progressions: { privacy: 2 },
     renderData: { data: [Object], privacy: 1 },
     activities: { privacy: 2 },
     equipment: { data: [Object], privacy: 1 },
     itemComponents: {} },
  ErrorCode: 1,
  ThrottleSeconds: 0,
  ErrorStatus: 'Success',
  Message: 'Ok',
  MessageData: {} }
```


### Transfer item from vault to character (needs OAuth)

`traveler.oauth` has to be set before calling this method

```
traveler
    .transferItem({
        itemReferenceHash: '2907129556',
        stackSize: 1,
        transferToVault: false,
        itemId: '6917529033189743362',
        characterId: 'yourCharacterId',
        membershipType: BungieMembershipType.PSN // BungieMembershipType.PSN in ES5
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
```

### Async await approach (pseudo-code)

Just a thought about using `async` and `await`

```
async () => {
    const traveler = new Traveler({
        apikey: 'pasteYourAPIkey',
        userAgent: 'yourUserAgent', //used to identify your request to the API
        oauthClientId: 'yourClientId',
        oauthClientSecret: 'yourClientSecret',
    });

    traveler.oauth = await traveler.getAccessToken(accessCode);
    // OR 
    traveler.oauth = await traveler.refreshToken(refreshToken);

    // now do your calls
}
```

### Manifest

To use the manifest you first have to download it via 'traveler.downloadManifest(manifestUrl, filename)'. **Be aware that you have to install [node-sqlite3](https://github.com/mapbox/node-sqlite3) to use the manifest class**

The `manifestUrl` can be every URL contained in the response of `traveler.getManifest()`
 
This method will download the specified manifest, unzip it and save it as `filename`. Afterwards you are able to create a new instance of  the `Manifest` class. With this it is possible to query the saved file with valid sqlite queries. A good hint for querying is noted in the [Gist](https://gist.github.com/vpzed/efb7b29f5dfda49633d62801ac30566c) from [@vpzed](https://github.com/vpzed). The result is retrieved asynchronously which makes it possible to integrate it with the `async` `await` flow. 

_common way_
```
import Traveler from 'the-traveler';
import Manifest from 'the-traveler/build/Manifest' 


traveler.getDestinyManifest().then(result => {
    traveler.downloadManifest(result.Response.mobileWorldContentPaths.en, './manifest.content').then(filepath => {
        const manifest = new Manifest(filepath);
        manifest.queryManifest('SELECT name FROM sqlite_master WHERE type="table"').then(queryResult => {
            console.log(queryResult);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
})


```


_async way_
```
import Traveler from 'the-traveler';
import Manifest from 'the-traveler/build/Manifest' 

async ()=> {
    const result = await traveler.getDestinyManifest();
    const filepath = await traveler.downloadManifest(result.Response.mobileWorldContentPaths.en, './manifest.content');
    const manifest = new Manifest(filepath);
    const queryResult = await manifest.queryManifest('SELECT name FROM sqlite_master WHERE type="table"')
}
```


## Progress

Please visit the [official documentation for the API](https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest) to check if the endpoints are working or if they are still in preview. If you find endpoints in preview, please keep in mind that errors can occur quite often. If the endpoints get finalized also this package will adopt changes and test the functionalities.

| Endpoint                                            | Implemented | Unlocked in API      |
| --------------------------------------------------- | ----------- | -------------------- |
| Destiny2.GetDestinyManifest                         | ✅           | ✅                    |
| Destiny2.GetDestinyEntityDefinition                 | ✅           | ✅                    |
| Destiny2.SearchDestinyPlayer                        | ✅           | ✅                    |
| Destiny2.GetLinkedProfiles                          | ✅           | ✅                    |
| Destiny2.GetProfile                                 | ✅           | ✅                    |
| Destiny2.GetCharacter                               | ✅           | ✅                    |
| Destiny2.GetClanWeeklyRewardState                   | ✅           | ✅                    |
| Destiny2.GetItem                                    | ✅           | ✅                    |
| Destiny2.GetVendors                                 | ✅           | ✅                    |
| Destiny2.GetVendor                                  | ✅           | ✅                    |
| Destiny2.TransferItem                               | ✅           | ✅                    |
| Destiny2.PullFromPostmaster                         | ✅           | ✅                    |
| Destiny2.EquipItem                                  | ✅           | ✅                    |
| Destiny2.EquipItems                                 | ✅           | ✅                    |
| Destiny2.SetItemLockState                           | ✅           | ✅                    |
| Destiny2.InsertSocketPlug                           | ✅           | ![alt text][preview] |
| Destiny2.GetPostGameCarnageReport                   | ✅           | ✅                    |
| Destiny2.ReportOffensivePostGameCarnageReportPlayer | ✅           | ✅                    |
| Destiny2.GetHistoricalStatsDefinition               | ✅           | ✅                    |
| Destiny2.GetClanLeaderboards                        | ✅           | ![alt text][preview] |
| Destiny2.GetClanAggregateStats                      | ✅           | ![alt text][preview] |
| Destiny2.GetLeaderboards                            | ✅           | ![alt text][preview] |
| Destiny2.GetLeaderboardsForCharacter                | ✅           | ![alt text][preview] |
| Destiny2.SearchDestinyEntities                      | ✅           | ✅                    |
| Destiny2.GetHistoricalStats                         | ✅           | ✅                    |
| Destiny2.GetHistoricalStatsForAccount               | ✅           | ✅                    |
| Destiny2.GetActivityHistory                         | ✅           | ✅                    |
| Destiny2.GetUniqueWeaponHistory                     | ✅           | ✅                    |
| Destiny2.GetDestinyAggregateActivityStats           | ✅           | ✅                    |
| Destiny2.GetPublicMilestoneContent                  | ✅           | ✅                    |
| Destiny2.GetPublicMilestones                        | ✅           | ✅                    |

## Built With

* [request-promise-native](https://github.com/request/request-promise-native) - Request package
* [Typescript](https://github.com/Microsoft/TypeScript) - Programming Language
* [node-stream-zip](https://github.com/antelle/node-stream-zip) - Unzipping files in node (for Manifest interaction) _Note: Maybe this will end up in a peer depdendency in a future release since it adds overhead to the package if you do not want to use the Manifest flow_
* [node-sqlite3](https://github.com/mapbox/node-sqlite3) - Use sqlite 3 in node (for Manifest interaction as a peer dependency) 

## Versioning

the-traveler uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/alexanderwe/the-traveler/tags). 


## Issues

Do you have any issues or recommendations for this package ? Feel free to open an issue in the [issue section](https://github.com/alexanderwe/the-traveler/issues) :) 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

**the-traveler package isn't endorsed by Bunge and doesn't reflect the views or opinions of Bungies or anyone officially involved in producing or managing Destiny 2. Destiny 2 and Bungie are trademarks or registered trademarks of Bungie, Inc. Destiny 2 © Bungie.**


[yes]:  https://img.shields.io/badge/implemented-yes-green.svg "Implemented:yes"
[no]:  https://img.shields.io/badge/implemented-no-red.svg "Implemented:no"
[preview]: https://img.shields.io/badge/-preview-blue.svg "Preview"
[unlocked]: https://img.shields.io/badge/-unlocked-green.svg "Unlocked"