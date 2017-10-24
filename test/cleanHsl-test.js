/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanHsl', () => {
  it('should remove whitespace from hsl()', () => {
    expect(converter.cleanHsl('hsl( 0, 100%, 50% )')).to.equal('hsl(0, 100%, 50%)');
  });
  it('should remove whitespace from hsla() with decimal values', () => {
    expect(converter.cleanHsl('hsla( 120, 98.8%, 50.3% )')).to.equal('hsl(120, 98.8%, 50.3%)');
  });
  it('should return an array from an hsla() string when specified', () => {
    expect(converter.cleanHsl('hsl( 120, 23.4%, 12.3%)', { returnArray: true })).to.deep.equal([120, 23.4, 12.3]);
  });
  it('should remove leading white space, capital letters, semicolons and colons', () => {
    expect(converter.cleanHsl(' HSl( 120, 23.4%, 12.3%); ')).to.equal('hsl(120, 23.4%, 12.3%)');
  });
});
