/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('identifyString', () => {
  it('should not accept an array', () => {
    expect(() => converter.identifyString(['this', 'is', 'an', 'array'])).to.throw(TypeError);
  });

  // RGBA
  it('should identify an rgba() string input', () => {
    expect(converter.identifyString('Rgba(255, 255 ,255, 0.4)')).to.equal('rgba');
  });

  // RGB
  it('should identify an rgb() string input', () => {
    expect(converter.identifyString('rgb(255, 255 ,255)')).to.equal('rgb');
  });
  it('should identify an rgb() string input without the leading rgb, but with parentheses', () => {
    expect(converter.identifyString('(45, 45 ,42)')).to.equal('rgb');
  });
  it('should identify an rgb() string input without the leading rgb or parentheses', () => {
    expect(converter.identifyString('45,45,45')).to.equal('rgb');
  });

  // HSLA
  it('should identify an hsla() string input', () => {
    expect(converter.identifyString('Hsla(120, 100%, 50%, 0.4)')).to.equal('hsla');
  });

  // HSL
  it('should identify an hsl() string input', () => {
    expect(converter.identifyString('hsL(120, 100%, 50%);')).to.equal('hsl');
  });

  // HEX
  it('should identify a hex string input with leading hash', () => {
    expect(converter.identifyString('#FFffff')).to.equal('hex');
  });
  it('should identify a hex string without leading hash', () => {
    expect(converter.identifyString('ffffff')).to.equal('hex');
  });

  // HEXA
  it('should identify a 8-decimal hex string input with leading hash', () => {
    expect(converter.identifyString('#ffffffFF')).to.equal('hexa');
  });
  it('should identify a 8-decimal hex string without leading hash', () => {
    expect(converter.identifyString('ffffffff')).to.equal('hexa');
  });
});
