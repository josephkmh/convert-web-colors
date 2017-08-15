/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hslToRgb', () => {
    it('should convert a gray hsl to rgb: hsl(185,0%,32%)', () => {
      var gray = converter.hslToRgb("hsl(185, 0%, 32%)", {returnArray: true});
      expect(gray).to.deep.equal([82, 82, 82]);
    });
    it('should convert basic hsl color string to rgb: hsl(185,42%,36%)', () => {
      var teal = converter.hslToRgb("hsl(185, 42%, 36%)", {returnArray: true});
      expect(teal).to.deep.equal([53, 124, 130]);
    });
    it('should convert a basic hsl color array to rgb: [0, 100, 50]', () => {
      var green = converter.hslToRgb([0, 100, 50], {returnArray: true});
      expect(green).to.deep.equal([255, 0, 0]);
    });

});
