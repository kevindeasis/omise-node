var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);

describe('Omise', function() {
  describe('#tokens', function() {
    it('should be able to create token', function(done) {
      if (process.env.NOCK_OFF !== 'true') {// aka, remote test
        require('./mocks/tokens_create');
      }
      var cardDetails = {
        'card[name]': 'JOHN DOE',
        'card[city]': 'Bangkok',
        'card[postal_code]': 10320,
        'card[number]': '4242424242424242',
        'card[expiration_month]': 2,
        'card[expiration_year]': 2017
      };
      omise.tokens.create(cardDetails, function(err, resp) {
        should.exist(resp.id);
        var token_id = resp.id;
        expect(token_id).to.contains('tokn_test');
        should.exist(resp.card.id);
        var card_id  = resp.card.id;
        expect(card_id).to.contains('card_test');
        done();
      });
    })
  })
})
