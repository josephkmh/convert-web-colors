/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hexToRgb', () => {
  it('should convert basic hex colors to rgb() strings', () => {
    expect(converter.hexToRgb('ff0000')).to.deep.equal('rgb(255, 0, 0)');
    expect(converter.hexToRgb('00ff00')).to.deep.equal('rgb(0, 255, 0)');
    expect(converter.hexToRgb('0000ff')).to.deep.equal('rgb(0, 0, 255)');

    expect(converter.hexToRgb('#ff0000')).to.deep.equal('rgb(255, 0, 0)');
    expect(converter.hexToRgb('#00ff00')).to.deep.equal('rgb(0, 255, 0)');
    expect(converter.hexToRgb('#0000ff')).to.deep.equal('rgb(0, 0, 255)');
  });
  it('should convert basic hex colors to rgb() arrays', () => {
    expect(converter.hexToRgb('ff0000', { returnArray: true })).to.deep.equal([255, 0, 0]);
    expect(converter.hexToRgb('00ff00', { returnArray: true })).to.deep.equal([0, 255, 0]);
    expect(converter.hexToRgb('0000ff', { returnArray: true })).to.deep.equal([0, 0, 255]);

    expect(converter.hexToRgb('#ff0000', { returnArray: true })).to.deep.equal([255, 0, 0]);
    expect(converter.hexToRgb('#00ff00', { returnArray: true })).to.deep.equal([0, 255, 0]);
    expect(converter.hexToRgb('#0000ff', { returnArray: true })).to.deep.equal([0, 0, 255]);
  });
});
