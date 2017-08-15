/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbaToHexa', () => {
    it('should convert basic rgba() colors to hex() with 0.5 alpha value', () => {
      var red   = converter.rgbaToHexa("rgba(255, 0, 0, .5)", { includeAlpha: true });
      var green = converter.rgbaToHexa("rgba(0, 255, 0, .5)", { includeAlpha: true });
      var blue  = converter.rgbaToHexa("rgba(0, 0, 255, 0.5)", { includeAlpha: true });

      expect(red).to.equal("#FF000080");
      expect(green).to.equal("#00FF0080");
      expect(blue).to.equal("#0000FF80");
    });
    it('should convert pure black with full opacity', () => {
        var black = converter.rgbaToHexa("rgba(0,0,0,1)", { includeAlpha: true });
        expect(black).to.equal("#000000FF");
    });
    it('should convert random rgba() colors to hex()', () => {
      var one   = converter.rgbaToHexa("rgba(40,42,54,0.76)", { includeAlpha: true });
      var red   = converter.rgbaToHexa("rgba(63,120,45,0.90)", { includeAlpha: true });
      var green = converter.rgbaToHexa("rgba(232,242,75,0.20)", { includeAlpha: true });
      var blue  = converter.rgbaToHexa("rgba(35,39,135,0.70)", { includeAlpha: true });

      expect(one).to.equal("#282A36C2");
      expect(red).to.equal("#3F782DE6");
      expect(green).to.equal("#E8F24B33");
      expect(blue).to.equal("#232787B3");
    });
});
