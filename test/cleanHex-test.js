/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanHex', () => {
  it('should validate a hex string and remove leading hash', () => {
    expect(converter.cleanHex('#00FF00')).to.equal('00FF00');
  });
  it('should turn a 3 digit hex string into a 6 digit one', () => {
    expect(converter.cleanHex('#E4F')).to.equal('EE44FF');
  });
});
