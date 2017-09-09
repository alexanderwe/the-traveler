import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Traveler from '../build/traveler';

chai.use(chaiAsPromised);
var expect = chai.expect;

var traveler = new Traveler({
    apikey: process.env.API_KEY
});

describe('#searchPlayer', function () {
    it('respond with matching player', async () => {
        const result = await traveler.searchPlayer('-1', 'grahan54');
        return expect(result).to.deep.include({ ErrorCode: 1 });
    });
});

describe('#searchPlayer', function () {
    it('get rejected', async () => {
        expect(traveler.searchPlayer('-1', '')).to.be.rejectedWith(Error);
    });
});
