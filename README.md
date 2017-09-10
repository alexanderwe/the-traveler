Table of Contents
=================

   * [The Traveler](#the-traveler)
      * [Getting Started](#getting-started)
         * [Prerequisites](#prerequisites)
      * [Notices](#notices)
         * [Typical Response](#typical-response)
         * [Privacy](#privacy)
         * [Documentation](#documentation)
      * [Examples](#examples)
         * [Search for an Destiny Account on PSN](#search-for-an-destiny-account-on-psn)
         * [Get a character for an PSN Account](#get-a-character-for-an-psn-account)
      * [Progress](#progress)
      * [Built With](#built-with)
      * [Versioning](#versioning)
      * [Issues](#issues)
      * [License](#license)
      * [Acknowledgments](#acknowledgments)


# The Traveler

The Traveler is a small npm package which wraps around the Destiny 2 API. It uses Promises for a modern workflow in your application.

## Getting Started

To get started use `npm` or `yarn` to add this package to your project.

```
$ npm install the-traveler
$ #or
$ yarn add the-traveler
```



### Prerequisites

To use this package you will need to obtain an API access key from the Bungie.net developer webiste. Please visit [https://www.bungie.net/en/Application](https://www.bungie.net/en/Application) to obtain your access token.

After obtaining your access token you are ready for using the Destiny 2 API in your next awesome project.

```
import Traveler from 'the-traveler';

const traveler = new Traveler({
    apikey: 'pasteYourAPIkey',
    userAgent: 'yourUserAgent' //used to identify your request to the API
});
```

If you want to use this package inside a es5 you can import it like so:

```
var Traveler = require('the-traveler').default;
const traveler = new Traveler({
    apikey: 'yourAPIkey',
    userAgent: 'yourUserAgent' //used to identify your request to the API
});
```

_If you want to show the URLs the API wrapper is requesting, just add `debug: true` to the configuration array when instantiate a `Traveler` object_
```
const traveler = new Traveler({
    apikey: 'pasteYourAPIkey',
    userAgent: 'yourUserAgent', //used to identify your request to the API
    debug: true 
});
```


## Notices

There are some noteworthy information which could help to resolve some issues with the Destiny 2 API.

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

Some information in the Destiny API is privacy protected. If the user set the pricacy settings it is not possible to obtain specific information through the API. The different pricacy indicators are the following:

* None: 0
* Public: 1
* Private: 2

### Documentation

* The documentation for this package can be found at 
* A fully complete documentation about the different endpoints and methods can be found at the [official Destiny 2 API site](https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest)


## Examples

### Search for an Destiny Account on PSN

_Query:_
```
traveler
    .searchDestinyPlayer('-1', 'playername')
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

Here all character specific components are queried

_Query:_
```
traveler.getCharacter('2', '4611686018452033461', '2305843009265042115', { components: ['200', '201', '202', '203', '204', '205'] }).then(result => {
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


## Progress

Please visit the [official documentation for the API](https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest) to check if the endpoints are working or if they are still in preview

| Endpoint                                  | Implemented      | Unlocked in API       |
| ----------------------------------------- | ---------------- | --------------------- |
| Destiny2.GetDestinyManifest               | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.SearchDestinyPlayer              | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetProfile                       | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetCharacter                     | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetClanWeeklyRewardState         | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetItem                          | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetVendors                       | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetVendor                        | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.TransferItem                     | ![alt text][no]  | ![alt text][unlocked] |
| Destiny2.EquipItem                        | ![alt text][no]  | ![alt text][unlocked] |
| Destiny2.EquipItems                       | ![alt text][no]  | ![alt text][unlocked] |
| Destiny2.SetItemLockState                 | ![alt text][no]  | ![alt text][unlocked] |
| Destiny2.InsertSocketPlug                 | ![alt text][no]  | ![alt text][preview]  |
| Destiny2.ActivateTalentNode               | ![alt text][no]  | ![alt text][preview]  |
| Destiny2.GetPostGameCarnageReport         | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetHistoricalStatsDefinition     | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetClanLeaderboards              | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetClanAggregateStats            | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetLeaderboards                  | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetLeaderboardsForCharacter      | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.SearchDestinyEntities            | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetHistoricalStats               | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetHistoricalStatsForAccount     | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetActivityHistory               | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetUniqueWeaponHistory           | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetDestinyAggregateActivityStats | ![alt text][yes] | ![alt text][preview]  |
| Destiny2.GetPublicMilestoneContent        | ![alt text][yes] | ![alt text][unlocked] |
| Destiny2.GetPublicMilestones              | ![alt text][yes] | ![alt text][unlocked] |

## Built With

* [request-promise-native](https://github.com/request/request-promise-native) - Request package
* [Typescript](https://github.com/Microsoft/TypeScript) - Programming Language

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 


## Issues

Do you have any issues or recommendations for this package ? Feel free to open an issue in the [isse section](https://github.com/alexanderwe/the-traveler/issues) :) 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

**the-traveler package isn't endorsed by Bunge and doesn't reflect the views or opinions of Bungies or anyone officially involved in producing or managing Destiny 2. Destiny 2 and Bungie are trademarks or registered trademarks of Bungie, Inc. Destiny 2 © Bungie.**


[yes]:  https://img.shields.io/badge/implemented-yes-green.svg "Implemented:yes"
[no]:  https://img.shields.io/badge/implemented-no-red.svg "Implemented:no"
[preview]: https://img.shields.io/badge/-preview-blue.svg "Preview"
[unlocked]: https://img.shields.io/badge/-unlocked-green.svg "Unlocked"