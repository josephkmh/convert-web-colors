/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hslToRgb', () => {
  it('should convert a gray hsl to rgb: hsl(185,0%,32%)', () => {
    expect(converter.hslToRgb('hsl(185, 0%, 32%)', { returnArray: true })).to.deep.equal([82, 82, 82]);
  });
  it('should convert basic hsl color string to rgb: hsl(185,42%,36%)', () => {
    expect(converter.hslToRgb('hsl(185, 42%, 36%)', { returnArray: true })).to.deep.equal([53, 124, 130]);
  });
  it('should convert a basic hsl color array to rgb: [0, 100, 50]', () => {
    expect(converter.hslToRgb([0, 100, 50], { returnArray: true })).to.deep.equal([255, 0, 0]);
  });
});
