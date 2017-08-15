/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbToHex', () => {
    it('should convert basic rgb() colors to hex (red, blue, green)', () => {
      var red   = converter.rgbToHex("rgb(255,0,0)");
      var green = converter.rgbToHex("rgb(0,255,0)");
      var blue  = converter.rgbToHex("rgb(0,0,255)");

      expect(red).to.equal("#FF0000");
      expect(green).to.equal("#00FF00");
      expect(blue).to.equal("#0000FF");
    });

    it('should convert a random rgb() color to hex', () => {
      var hex = converter.rgbToHex("rgb(202,41,178)");
      expect(hex).to.equal("#CA29B2");
    });
});
