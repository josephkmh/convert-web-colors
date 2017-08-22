/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbaToHsla', () => {
  it('should convert basic rgba color strings to hsla (pure red, blue and green)', () => {
    expect(converter.rgbaToHsla('rgba(255,0,0,1)', { returnArray: true })).to.deep.equal([0, 100, 50, 1]);
    expect(converter.rgbaToHsla('rgba(0,255,0,1)', { returnArray: true })).to.deep.equal([120, 100, 50, 1]);
    expect(converter.rgbaToHsla('rgba(0,0,255,1)', { returnArray: true })).to.deep.equal([240, 100, 50, 1]);
  });
  it('should convert a basic rgba color array to hsla (pure red, blue and green)', () => {
    expect(converter.rgbaToHsla([255, 0, 0, 1], { returnArray: true })).to.deep.equal([0, 100, 50, 1]);
    expect(converter.rgbaToHsla([0, 255, 0, 1], { returnArray: true })).to.deep.equal([120, 100, 50, 1]);
    expect(converter.rgbaToHsla([0, 0, 255, 1], { returnArray: true })).to.deep.equal([240, 100, 50, 1]);
  });
  it('should convert various shades of gray from rgba string to hsla (with transparency)', () => {
    expect(converter.rgbaToHsla('rgba(23,23,23,.5)')).to.equal('hsla(0, 0%, 9%, 0.5)');
    expect(converter.rgbaToHsla('rgba(152,152,152,.7)')).to.equal('hsla(0, 0%, 59.6%, 0.7)');
    expect(converter.rgbaToHsla('rgba(221,221,221,.1)')).to.equal('hsla(0, 0%, 86.7%, 0.1)');
  });
});
