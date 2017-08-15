/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbToRgba', () => {
    it('converts an rgb() string to rgba() string', () => {
      const red = converter.rgbToRgba('rgb(255, 0, 0)');
      expect(red).to.equal('rgba(255, 0, 0, 1)');
    });
    it('converts an rgb() string to an rgba() array', () => {
      const red = converter.rgbToRgba('rgb(255, 0, 0)', { returnArray: true });
      expect(red).to.deep.equal([255, 0, 0, 1]);
    });
    it('converts an rgb() array to an rgba() string', () => {
      const red = converter.rgbToRgba([255, 0, 0]);
      expect(red).to.equal('rgba(255, 0, 0, 1)');
    });
    it('converts an rgb() array to an rgba() array', () => {
      const red = converter.rgbToRgba([255, 0, 0], { returnArray: true });
      expect(red).to.deep.equal([255, 0, 0, 1]);
    });
});
