import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { BungieMembershipType, ComponentType, DestinyStatsGroupType, PlatformErrorCodes, TypeDefinition } from '../src/enums';
import Manifest from '../src/Manifest';
import OauthError from '../src/OAuthError';
import Traveler from '../src/Traveler';

dotenv.config();

const traveler = new Traveler({
  apikey: process.env.API_KEY as string,
  debug: true,
  oauthClientId: process.env.OAUTH_ID,
  oauthClientSecret: process.env.OAUTH_SECRET,
  userAgent: ''
});

jest.setTimeout(15000); // 10 second timeout

afterAll(() => {
  fs.unlink(`./manifest.content`, err => {
    if (err) {
      console.log('Error deleting content file');
    }
    console.log('Everyting tidied up');
  });
});

describe('Traveler#getDestinyManifest', () => {
  test('Respond with current manifest formatted in JSON', async () => {
    const result = await traveler.getDestinyManifest();
    expect(typeof result.Response).toBe('object');
  });

  test('Object contains all required keys', async () => {
    const result = await traveler.getDestinyManifest();
    expect(Object.keys(result.Response)).toEqual(expect.arrayContaining(['mobileAssetContentPath', 'mobileClanBannerDatabasePath', 'mobileClanBannerDatabasePath', 'mobileGearAssetDataBases', 'mobileGearCDN', 'mobileWorldContentPaths', 'version']));
  });
});

describe('traveler#getDestinyEntityDefinition', () => {
  test('Respond with JSON data about the weapon called Blue Shift', async () => {
    const result = await traveler.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, '417474226');
    return expect(result.Response.hash).toEqual(417474226);
  });

  test('Get rejected due to wrong parameters', async () => {
    expect.assertions(1);
    try {
      await traveler.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, '');
    } catch (e) {
      expect(e.statusCode).toEqual(404);
    }
  });

  describe('traveler#searchDestinyPlayer', () => {
    test('Respond with matching player', async () => {
      const result = await traveler.searchDestinyPlayer(BungieMembershipType.All, 'playername');
      expect(result.Response[0].displayName.toLowerCase()).toEqual('playername');
    });

    test('Get rejected due to wrong parameters', async () => {
      expect.assertions(1);
      try {
        await traveler.searchDestinyPlayer(BungieMembershipType.All, '');
      } catch (e) {
        expect(e.statusCode).toEqual(404);
      }
    });
  });

  describe('traveler#getLinkedProfiles', () => {
    test('Respond with matching linked accounts', async () => {
      const result = await traveler.getLinkedProfiles(BungieMembershipType.PSN, '4611686018452033461');
      expect(typeof result.Response.profiles[0]).toEqual('object');
    });
  });

  describe('traveler#getProfile', () => {
    test('Respond with the matching profile', async () => {
      const result = await traveler.getProfile(BungieMembershipType.PSN, '4611686018452033461', { components: [ComponentType.Profiles] });

      expect(Object.keys(result.Response)).toEqual(expect.arrayContaining(['profile']));
    });

    test('Get rejected due to requesting PSN profile data but providing XBOX member type and wrong id', async () => {
      try {
        await traveler.getProfile(BungieMembershipType.Xbox, '', {
          components: [ComponentType.Profiles]
        });
      } catch (e) {
        expect(e.statusCode).toEqual(404);
      }
    });
  });

  describe('traveler#getCharacter', () => {
    test('Respond with matching character and only character components', async () => {
      const result = await traveler.getCharacter(BungieMembershipType.PSN, '4611686018452033461', '2305843009265042115', {
        components: [ComponentType.Characters, ComponentType.CharacterInventories, ComponentType.CharacterProgressions, ComponentType.CharacterRenderData, ComponentType.CharacterActivities, ComponentType.CharacterEquipment]
      });

      expect(Object.keys(result.Response)).toEqual(expect.arrayContaining(['inventory', 'character', 'progressions', 'renderData', 'activities', 'character', 'equipment']));
    });
  });
  // TODO: make rejected test
});

describe('traveler#getClanWeeklyRewardState', () => {
  test('Respond with information on the weekly clan reward', async () => {
    const result = await traveler.getClanWeeklyRewardState('1812014');
    return expect(result.ErrorCode).toEqual(PlatformErrorCodes.Success);
  });

  test('Fail to respond with information of the weekly clan reward', async () => {
    try {
      await traveler.getClanWeeklyRewardState('-1');
    } catch (e) {
      expect(e.ErrorCode).toEqual(622);
    }
  });
});

describe('traveler#getItem', () => {
  test('Respond with matching item', async () => {
    const result = await traveler.getItem(BungieMembershipType.PSN, '4611686018452033461', '6917529033189743362', { components: [ComponentType.ItemCommonData] });

    expect(Object.keys(result.Response.item.data)).toEqual(expect.arrayContaining(['itemHash', 'itemInstanceId', 'quantity', 'bindStatus', 'location', 'bucketHash', 'transferStatus', 'lockable', 'state']));
  });
});

// TODO: getVendors (not yet final)

// TODO: getVendor (not yet final)

// TODO: getPostGameCarnageReport

describe('traveler#getHistoricalStatsDefinition', () => {
  test('Respond with matching historical stat definitions', async () => {
    const result = await traveler.getHistoricalStatsDefinition();
    expect(result.ErrorCode).toEqual(PlatformErrorCodes.Success);
  });
});

// TODO: getCLanLeaderboards (not yet final)

// TODO: getClanAggregratedStats (not yet final)

// TODO: getLeaderboards (not yet final)

// TODO: getLeaderboardsForCharacter (not yet final)

describe('traveler#searchDestinyEntities', () => {
  test('Respond with matching search results for sunshot', async () => {
    const result = await traveler.searchDestinyEntities('sunshot', TypeDefinition.DestinyInventoryItemDefinition, { page: 0 });
    return expect(result.Response.suggestedWords).toContain('sunshot');
  });
});

describe('traveler#getHistoricalStats', () => {
  it('Respond with historical stats', async () => {
    const result = await traveler.getHistoricalStats(BungieMembershipType.PSN, '4611686018452033461', '2305843009265042115', {
      dayend: '2017-09-30',
      daystart: '2017-09-20',
      groups: [DestinyStatsGroupType.Activity]
    });
    return expect(result.ErrorCode).toEqual(PlatformErrorCodes.Success);
  });

  test('Fail to respond with historical stats due to invalid date parameter', async () => {
    expect.assertions(1);
    try {
      await traveler.getHistoricalStats(BungieMembershipType.PSN, '4611686018452033461', '2305843009265042115', {
        dayend: '2017-09-40',
        daystart: '2017-09-20',
        groups: [DestinyStatsGroupType.Activity]
      });
    } catch (e) {
      expect(e.ErrorCode).toEqual(7);
    }
  });
});

// TODO: getHistoricalStatsForAccount (not yet final)

// TODO: getActivityHistory (not yet final)

// TODO: getUniqueWeaponHistory (not yet final)

// TODO: getAggregateActivityStats (not yet final)

describe('traveler#getPublicMilestoneContent', () => {
  test('Respond with public milestone content for milestone hash 202035466', async () => {
    const result = await traveler.getPublicMilestoneContent('202035466');
    return expect(result.ErrorCode).toEqual(PlatformErrorCodes.Success);
  });
});

describe('traveler#getPublicMilestones', () => {
  test('Respond with public milestones', async () => {
    const result = await traveler.getPublicMilestones();
    return expect(result.ErrorCode).toEqual(PlatformErrorCodes.Success);
  });
});

// TODO: equipItem

describe('OAuthError#constructor', () => {
  it('creates a new OAuth error', async () => {
    return expect(new OauthError('New OauthError')).toBeInstanceOf(Error);
  });
});

describe('Traveler#downloadManifest and Manifest#constructor and Manifest#queryManifest', () => {
  test('Download the manifest, remove .zip and queries it with a simple query', async () => {
    const result = await traveler.getDestinyManifest();

    const filepath = await traveler.downloadManifest(result.Response.mobileWorldContentPaths.en, './manifest.content');
    const manifest = new Manifest(filepath);
    const queryResult = await manifest.queryManifest('SELECT name FROM sqlite_master WHERE type="table"');
    expect(typeof queryResult).toEqual('object');
  });
});

describe('Manifest', () => {
  test('Fails to create an instance', async () => {
    return expect(() => {
      const manifest = new Manifest('./test');
    }).toThrow;
  });

  it('Fails to query an invalid db', async () => {
    try {
      await new Manifest('./output.gif').queryManifest('SELECT name FROM sqlite_master WHERE type="table"');
    } catch (e) {
      expect(e.code).toEqual('SQLITE_NOTADB');
    }
  });
});
