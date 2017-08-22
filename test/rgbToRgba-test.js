/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbToRgba', () => {
  it('converts an rgb() string to rgba() string', () => {
    expect(converter.rgbToRgba('rgb(255, 0, 0)')).to.equal('rgba(255, 0, 0, 1)');
  });
  it('converts an rgb() string to an rgba() array', () => {
    expect(converter.rgbToRgba('rgb(255, 0, 0)', { returnArray: true })).to.deep.equal([255, 0, 0, 1]);
  });
  it('converts an rgb() array to an rgba() string', () => {
    expect(converter.rgbToRgba([255, 0, 0])).to.equal('rgba(255, 0, 0, 1)');
  });
  it('converts an rgb() array to an rgba() array', () => {
    expect(converter.rgbToRgba([255, 0, 0], { returnArray: true })).to.deep.equal([255, 0, 0, 1]);
  });
});
