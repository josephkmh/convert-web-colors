/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hslaToRgba', () => {
  it('should convert basic hsla color strings to rgba (pure red, blue and green)', () => {
    expect(converter.hslaToRgba('hsla(0,100%,50%,1)', { returnArray: true })).to.deep.equal([255, 0, 0, 1]);
    expect(converter.hslaToRgba('hsla(120,100%,50%,1)', { returnArray: true })).to.deep.equal([0, 255, 0, 1]);
    expect(converter.hslaToRgba('hsla(240,100%,50%,1)', { returnArray: true })).to.deep.equal([0, 0, 255, 1]);
  });
  it('should convert a basic hsla color array to rgba (pure red, blue and green)', () => {
    expect(converter.hslaToRgba([0, 100, 50, 1], { returnArray: true })).to.deep.equal([255, 0, 0, 1]);
    expect(converter.hslaToRgba([120, 100, 50, 1], { returnArray: true })).to.deep.equal([0, 255, 0, 1]);
    expect(converter.hslaToRgba([240, 100, 50, 1], { returnArray: true })).to.deep.equal([0, 0, 255, 1]);
  });
  it('should convert various shades of gray from hsla string to rgba (with transparency)', () => {
    expect(converter.hslaToRgba('hsla(0,0%,9%,0.5)')).to.equal('rgba(23, 23, 23, 0.5)');
    expect(converter.hslaToRgba('hsla(0,0%,60%,0.7)')).to.equal('rgba(153, 153, 153, 0.7)');
    expect(converter.hslaToRgba('hsla(0,0%,87%,0.1)')).to.equal('rgba(222, 222, 222, 0.1)');
  });
});
