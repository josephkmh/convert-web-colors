/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanRgba', () => {
  it('should remove whitespace from rgba()', () => {
    expect(converter.cleanRgba('rgba( 255, 255, 255, 1 )')).to.equal('rgba(255, 255, 255, 1)');
  });
  it('should remove whitespace from rgba() with a decimal alpha value', () => {
    expect(converter.cleanRgba('rgba( 255, 255, 255, .5 )')).to.equal('rgba(255, 255, 255, 0.5)');
  });
  it('should return an array from an rgba() string when specified', () => {
    expect(converter.cleanRgba('rgba( 255, 255, 255, 1 )', { returnArray: true })).to.deep.equal([255, 255, 255, 1]);
  });
  it('should return alpha channel as a decimal when given a percentage', () => {
    expect(converter.cleanRgba('rgba( 123, 123, 123, 81.6% )', { returnArray: true })).to.deep.equal([123, 123, 123, 0.816]);
  });
  it('should remove leading white space, capital letters, semicolons and colons', () => {
    expect(converter.cleanRgba('  RgBA( 123, 231, 112,.34 ) ')).to.equal('rgba(123, 231, 112, 0.34)');
  });
});
