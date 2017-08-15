/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanRgb', () => {
  it('should remove whitespace from rgb()', () => {
    expect(converter.cleanRgb('rgb( 255, 255, 255 )')).to.equal('rgb(255, 255, 255)');
  });
  it('should return an array from an rgb() string when specified', () => {
    expect(converter.cleanRgb('rgb( 255, 255, 255 )', { returnArray: true })).to.deep.equal([255, 255, 255]);
  });
});
