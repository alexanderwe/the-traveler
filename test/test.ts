import * as chai from 'chai';
import { assert, expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mocha from 'mocha';
import * as rpErrors from 'request-promise-native/errors';
import {
    BungieMembershipType,
    ComponentType,
    PlatformErrorCodes,
    TypeDefinition,
} from '../src/enums';
import OauthError from '../src/OAuthError';
import Traveler from '../src/traveler';


chai.use(chaiAsPromised);

const traveler = new Traveler({
    apikey: process.env.API_KEY as string,
    debug: true,
    oauthClientId: process.env.OAUTH_ID,
    oauthClientSecret: process.env.OAUTH_SECRET,
    userAgent: '',
});

describe('traveler#getManifest', () => {
    it('respond with current manifest formatted in JSON', async () => {
        const result = await traveler.getDestinyManifest();
        return expect(result.Response).to.be.an('object').that.has.all.keys(
            'mobileAssetContentPath',
            'mobileClanBannerDatabasePath',
            'mobileGearAssetDataBases',
            'mobileGearCDN',
            'mobileWorldContentPaths',
            'version');
    });
});

describe('traveler#getDestinyEntityDefinition', () => {
    it('respond with JSON data about the weapon called Blue Shift', async () => {
        const result = await traveler.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, '417474226');
        return expect(result.Response.hash).to.be.an('number').and.equals(417474226);
    });

    it('gets rejected due to wrong parameters', async () => {
        return expect(traveler.getDestinyEntityDefinition(TypeDefinition.DestinyInventoryItemDefinition, '')).to.be.rejectedWith(Error);
    });
});

describe('traveler#searchDestinyPlayer', () => {
    it('respond with matching player', async () => {
        const result = await traveler.searchDestinyPlayer(BungieMembershipType.All, 'playername');
        expect(result.Response[0].displayName.toLowerCase()).equals('playername');
    });
    it('gets rejected due to wrong parameters', async () => {
        expect(traveler.searchDestinyPlayer(BungieMembershipType.All, '')).to.be.rejectedWith(Error);
    });
});

describe('traveler#getProfile', () => {
    it('respond with the matching profile', async () => {
        const result = await traveler.getProfile(BungieMembershipType.PSN, '4611686018452033461', { components: [ComponentType.Profiles] });
        return expect(result.Response).to.be.an('object').and.to.include.keys('profile');
    });
    it('gets rejected due to requesting PSN profile data but providing XBOX member type and wrong id', async () => {
        expect(traveler.getProfile(BungieMembershipType.Xbox, '', { components: [ComponentType.Profiles] })).to.be.rejectedWith(Error);
    });
});

describe('traveler#getCharacter', () => {
    it('respond with matching character and only character components', async () => {
        const result = await traveler.getCharacter(BungieMembershipType.PSN, '4611686018452033461', '2305843009265042115', {
            components:
            [
                ComponentType.Characters,
                ComponentType.CharacterInventories,
                ComponentType.CharacterProgressions,
                ComponentType.CharacterRenderData,
                ComponentType.CharacterActivities,
                ComponentType.CharacterEquipment,
            ],
        });
        return expect(result.Response).to.be.an('object').and.to.include.keys('activities', 'character', 'equipment', 'inventory', 'renderData', 'itemComponents', 'progressions');
    });
    // TODO: make rejected test
});

// TODO: getClanWeeklyRewardState

describe('traveler#getItem', () => {
    it('respond with matching item', async () => {
        const result = await traveler.getItem(BungieMembershipType.PSN, '4611686018452033461', '6917529033189743362', { components: [ComponentType.ItemCommonData] });
        return expect(result.Response.item.data).to.be.an('object').and.have.all.keys(
            'itemHash',
            'itemInstanceId',
            'quantity',
            'bindStatus',
            'location',
            'bucketHash',
            'transferStatus',
            'lockable',
            'state',
        );
    });
});

// TODO: getVendors

// TODO: getVendor

// TODO: getPostGameCarnageReport

describe('traveler#getHistoricalStatsDefinition', () => {
    it('respond with matching historical stat definitions', async () => {
        const result = await traveler.getHistoricalStatsDefinition();
        return assert.equal(result.ErrorCode, PlatformErrorCodes.Success, 'Response was not successful');

    });
});

// TODO: getCLanLeaderboards

// TODO: getClanAggregratedStats

// TODO: getLeaderboards

// TODO: getLeaderboardsForCharacter

describe('traveler#searchDestinyEntities', () => {
    it('respond with matching search results for sunshot', async () => {
        const result = await traveler.searchDestinyEntities('sunshot', TypeDefinition.DestinyInventoryItemDefinition, { page: 0 });
        return expect(result.Response.suggestedWords).to.be.a('array').and.includes('sunshot');
    });
});

// TODO: getHistoricalStats

// TODO: getHistoricalStatsForAccount

// TODO: getActivityHistory

// TODO: getUniqueWeaponHistory

// TODO: getAggregateActivityStats

// TODO: getPublicMilestoneContent

// TODO:getPublicMilestones

describe('traveler#equipItem', () => {

    it('fails using  method without oauth', async () => {
        return expect(() => {
            traveler.equipItem(null);
        }).to.throw(OauthError);
    });
});

describe('traveler#refreshToken', () => {
    it('uses refresh token', async () => {
        const result = await traveler.refreshToken(process.env.OAUTH_REFRESH_TOKEN);
        return expect(result.refresh_token).to.be.a('string');
    });
    it('fails due to no refresh token provided', async () => {
        return expect(traveler.refreshToken('')).to.be.rejectedWith(rpErrors.StatusCodeError);
    });

});
