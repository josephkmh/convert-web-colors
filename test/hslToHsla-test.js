/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hslToHsla', () => {
  it('should convert a gray hsl to hsla: hsl(185,0%,32%)', () => {
    expect(converter.hslToHsla('hsl(185, 0%, 32%)', { returnArray: true })).to.deep.equal([185, 0, 32, 1]);
  });
  it('should convert basic hsl color string to hsla: hsl(185,42%,36%)', () => {
    expect(converter.hslToHsla('hsl(185, 42%, 36%)', { returnArray: true })).to.deep.equal([185, 42, 36, 1]);
  });
  it('should convert a basic hsl color array to hsla: [0, 100, 50]', () => {
    expect(converter.hslToHsla([0, 100, 50], { returnArray: true })).to.deep.equal([0, 100, 50, 1]);
  });
});
