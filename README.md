# The Traveler

The Traveler is a small npm package which wraps around the Destiny 2 API. It uses Promises for a modern workflow in your application

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

## Examples

_Search for a player_

```
traveler
    .searchPlayer('-1', 'playername')
    .then(player => {
        //do something with the player
    }.catch(err => {
        //do something with the error
    })
```


## Progress

| Endpoint                                                                                              | Implemented      |
| ----------------------------------------------------------------------------------------------------- | ---------------- |
| /Actions/Items/ActivateTalentNode/                                                                    | ![alt text][no]  |
| /Actions/Items/EquipItem/                                                                             | ![alt text][no]  |
| /Actions/Items/EquipItems/                                                                            | ![alt text][no]  |
| /{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/Activities/             | ![alt text][no]  |
| /{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/                              | ![alt text][yes] |
| /Stats/AggregateClanStats/{groupId}/                                                                  | ![alt text][no]  |
| /Stats/Leaderboards/Clans/{groupId}/                                                                  | ![alt text][no]  |
| /Clan/{groupId}/WeeklyRewardState/                                                                    | ![alt text][no]  |
| /{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/AggregateActivityStats/ | ![alt text][no]  |
| /Manifest/                                                                                            | ![alt text][no]  |
| /{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/                        | ![alt text][no]  |
| /Stats/Definition/                                                                                    | ![alt text][no]  |
| /{membershipType}/Account/{destinyMembershipId}/Stats/                                                | ![alt text][yes] |
| /{membershipType}/Profile/{destinyMembershipId}/Item/{itemInstanceId}/                                | ![alt text][no]  |
| /{membershipType}/Account/{destinyMembershipId}/Stats/Leaderboards/                                   | ![alt text][no]  |
| /Stats/Leaderboards/{membershipType}/{destinyMembershipId}/{characterId}/                             | ![alt text][no]  |
| /Stats/PostGameCarnageReport/{activityId}/                                                            | ![alt text][no]  |
| /{membershipType}/Profile/{destinyMembershipId}/                                                      | ![alt text][no]  |
| /Milestones/{milestoneHash}/Content/                                                                  | ![alt text][no]  |
| /Milestones/                                                                                          | ![alt text][no]  |
| /{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/UniqueWeapons/          | ![alt text][no]  |
| /{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/{vendorHash}/         | ![alt text][no]  |
| /{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/                      | ![alt text][no]  |
| /Actions/Items/InsertSocketPlug/                                                                      | ![alt text][no]  |
| /Armory/Search/{type}/{searchTerm}/                                                                   | ![alt text][no]  |
| /SearchDestinyPlayer/{membershipType}/{displayName}/                                                  | ![alt text][no]  |
| /Actions/Items/SetLockState/                                                                          | ![alt text][yes] |
| /Actions/Items/SetTrackedState/                                                                       | ![alt text][no]  |
| /Actions/Items/TransferItem/                                                                          | ![alt text][no]  |

## Built With

* [request-promise-native](https://github.com/request/request-promise-native) - Request package
* [Typescript](https://github.com/Microsoft/TypeScript) - Programming Language

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

**the-traveler package isn't endorsed by Bunge and doesn't reflect the views or opinions of Bungies or anyone officially involved in producing or managing Destiny 2. Destiny 2 and Bungie are trademarks or registered trademarks of Bungie, Inc. Destiny 2 © Bungie.**


[yes]:  https://img.shields.io/badge/integrated-yes-green.svg "Integrated:yes"
[no]:  https://img.shields.io/badge/integrated-no-red.svg "Integrated:no"