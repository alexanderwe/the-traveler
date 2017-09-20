import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Traveler from '../build/traveler';
import { ComponentType, SearchType } from '../build/enums';

chai.use(chaiAsPromised);
var expect = chai.expect;

var traveler = new Traveler({
    apikey: process.env.API_KEY
});

describe('traveler#getManifest', function () {
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

describe('traveler#searchDestinyEntities', function () {
    it('respond with JSON data about the weapon called Blue Shift', async () => {
        const result = await traveler.getDestinyEntityDefinition(SearchType.DestinyInventoryItemDefinition, '417474226');
        return expect(result.Response.displayProperties.name).to.be.an('string').and.equals('Blue Shift')
    });
});



describe('traveler#searchDestinyPlayer', function () {
    it('respond with matching player', async () => {
        const result = await traveler.searchDestinyPlayer('-1', 'playername');
        expect(result.Response[0]).to.deep.include({ displayName: 'Playername' });
    });
    it('get rejected', async () => {
        expect(traveler.searchDestinyPlayer('-1', '')).to.be.rejectedWith(Error);
    });
});


describe('traveler#getProfile', function () {
    it('respond with the matching profile', async () => {
        const result = await traveler.getProfile('2', '4611686018452033461', { components: ['100'] });
        return expect(result.Response).to.be.an('object').and.to.include.key('profile');
    });
});

describe('traveler#getCharcter', function () {
    it('respond with matching character and only character components', async () => {
        const result = await traveler.getCharacter('2', '4611686018452033461', '2305843009265042115', {
            components:
            [
                ComponentType.Characters,
                ComponentType.CharacterInventories,
                ComponentType.CharacterProgressions,
                ComponentType.CharacterRenderData,
                ComponentType.CharacterActivities,
                ComponentType.CharacterEquipment
            ]
        });
        return expect(result.Response).to.be.an('object').and.to.include.key('activities', 'character', 'equipment', 'inventory', 'renderData', 'itemComponents', 'progressions');
    });
});



