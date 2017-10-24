/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbToHsl', () => {
  it('should convert basic rgb color strings to hsl (pure red, blue and green)', () => {
    expect(converter.rgbToHsl('rgb(255,0,0)', { returnArray: true })).to.deep.equal([0, 100, 50]);
    expect(converter.rgbToHsl('rgb(0,255,0)', { returnArray: true })).to.deep.equal([120, 100, 50]);
    expect(converter.rgbToHsl('rgb(0,0,255)', { returnArray: true })).to.deep.equal([240, 100, 50]);
  });
  it('should convert a teal rgb value to hsl: rgb(54,126,132)', () => {
    expect(converter.rgbToHsl('rgb(54,126,132)')).to.deep.equal('hsl(185, 41.9%, 36.5%)');
    expect(converter.rgbToHsl('rgb(54,126,132)', { returnArray: true })).to.deep.equal([185, 41.9, 36.5]);
  });
});
