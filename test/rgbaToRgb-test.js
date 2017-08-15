/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('rgbaToRgb', () => {
    it('should convert basic transparent rgba colors to rgb', () => {
      var red   = converter.rgbaToRgb([255, 0, 0, 0.5], {
          background: [255, 255, 255],
          returnArray: true
      });

      expect(red).to.deep.equal([255, 128, 128]);
    });
    it('should convert a random blue transparent hue from rgba to rgb', () => {
      var transparentBlue = converter.rgbaToRgb([56, 139, 224, 0.71],{
          background: [255, 255, 255],
          returnArray: true
      });

      expect(transparentBlue).to.deep.equal([114, 173, 233]);
    })
});
