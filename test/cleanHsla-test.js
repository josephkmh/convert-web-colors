/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanHsla', () => {
  it('should remove whitespace from hsla()', () => {
    expect(converter.cleanHsla('hsla( 0, 100%, 50%, 1 )')).to.equal('hsla(0, 100%, 50%, 1)');
  });
  it('should remove whitespace from rgba() with decimal values', () => {
    expect(converter.cleanHsla('hsla( 120.7, 100%, 50%,1 )')).to.equal('hsla(120.7, 100%, 50%, 1)');
    expect(converter.cleanHsla('hsla( 120, 34.2%, 50%,1 )')).to.equal('hsla(120, 34.2%, 50%, 1)');
    expect(converter.cleanHsla('hsla( 120, 100%, 50%, .5 )')).to.equal('hsla(120, 100%, 50%, 0.5)');
  });
  it('should return an array from an hsla() string when specified', () => {
    expect(converter.cleanHsla('hsla( 0, 100%, 50%, 1 )', { returnArray: true })).to.deep.equal([0, 100, 50, 1]);
  });
  it('should remove leading white space, capital letters, semicolons and colons', () => {
    expect(converter.cleanHsla(' HSlA( 120, 23.4%, 12.3%, 0.3); ')).to.equal('hsla(120, 23.4%, 12.3%, 0.3)');
  });
});
