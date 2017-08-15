/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbaToHsla', () => {
    it('should convert basic rgba color strings to hsla (pure red, blue and green)', () => {
      var red   = converter.rgbaToHsla("rgba(255,0,0,1)", { returnArray: true });
      var green = converter.rgbaToHsla("rgba(0,255,0,1)", { returnArray: true });
      var blue  = converter.rgbaToHsla("rgba(0,0,255,1)", { returnArray: true });

      expect(red).to.deep.equal([0, 100, 50, 1]);
      expect(green).to.deep.equal([120, 100, 50, 1]);
      expect(blue).to.deep.equal([240, 100, 50, 1]);
    });
    it('should convert a basic rgba color array to hsla (pure red, blue and green)', function(){
      var redArray   = converter.rgbaToHsla([255, 0, 0, 1], { returnArray: true });
      var greenArray = converter.rgbaToHsla([0, 255, 0, 1], { returnArray: true });
      var blueArray  = converter.rgbaToHsla([0, 0, 255, 1], { returnArray: true });

      expect(redArray).to.deep.equal([0, 100, 50, 1]);
      expect(greenArray).to.deep.equal([120, 100, 50, 1]);
      expect(blueArray).to.deep.equal([240, 100, 50, 1]);
    });
    it('should convert various shades of gray from rgba string to hsla (with transparency)', () => {
      var gray1 = converter.rgbaToHsla("rgba(23,23,23,.5)");
      expect(gray1).to.equal("hsla(0, 0%, 9%, 0.5)");

      var gray2 = converter.rgbaToHsla("rgba(152,152,152,.7)");
      expect(gray2).to.equal("hsla(0, 0%, 59.6%, 0.7)");

      var gray3 = converter.rgbaToHsla("rgba(221,221,221,.1)");
      expect(gray3).to.equal("hsla(0, 0%, 86.7%, 0.1)");
    });
});
