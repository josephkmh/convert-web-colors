/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbToHex', () => {
  it('should convert basic rgb() colors to hex (red, blue, green)', () => {
    expect(converter.rgbToHex('rgb(255,0,0)')).to.equal('#FF0000');
    expect(converter.rgbToHex('rgb(0,255,0)')).to.equal('#00FF00');
    expect(converter.rgbToHex('rgb(0,0,255)')).to.equal('#0000FF');
  });
  it('should convert a random rgb() color to hex', () => {
    expect(converter.rgbToHex('rgb(202,41,178)')).to.equal('#CA29B2');
  });
});
