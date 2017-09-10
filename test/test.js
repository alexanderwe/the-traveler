import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Traveler from '../build/traveler';

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

describe('traveler#searchDestinyPlayer', function () {
    it('respond with matching player', async () => {
        const result = await traveler.searchDestinyPlayer('-1', 'playername');
        return expect(result.Response[0]).to.deep.include({ displayName: 'Playername' });
    });
});

describe('traveler#searchDestinyPlayer', function () {
    it('get rejected', async () => {
        expect(traveler.searchDestinyPlayer('-1', '')).to.be.rejectedWith(Error);
    });
});

describe('traveler#getProfile', function () {
    it('respond with the matchin profile', async () => {
        const result = await traveler.getProfile('2', '4611686018452033461', { components: ['100'] });
        return expect(result.Response).to.be.an('object').and.to.include.key('profile');
    });
});

