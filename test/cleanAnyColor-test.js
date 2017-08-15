/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanAnyColor', () => {
  it('should remove whitespace from hsla()', () => {
    expect(converter.cleanAnyColor('hsla( 0, 100%, 50%, .5 )')).to.equal('hsla(0, 100%, 50%, 0.5)');
  });
  it('should remove whitespace from rgba()', () => {
    expect(converter.cleanAnyColor('rgba( 122, 231, 12, .6 )')).to.equal('rgba(122, 231, 12, 0.6)');
  });
  it('should remove whitespace from rgb()', () => {
    expect(converter.cleanAnyColor('rgb( 122, 231, 12 )')).to.equal('rgb(122, 231, 12)');
  });
  it('should remove whitespace from hsl()', () => {
    expect(converter.cleanAnyColor('hsl( 122, 80%, 90% )')).to.equal('hsl(122, 80%, 90%)');
  });
  it('should validate a hex string', () => {
    expect(converter.cleanAnyColor('#00FF00')).to.equal('00FF00');
  });
});
