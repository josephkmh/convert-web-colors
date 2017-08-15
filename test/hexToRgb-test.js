/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hexToRgb', () => {
    it('should convert basic hex colors to rgb() strings', () => {
      var red   = converter.hexToRgb('ff0000');
      var green = converter.hexToRgb('00ff00');
      var blue  = converter.hexToRgb('0000ff');

      expect(red).to.deep.equal('rgb(255, 0, 0)');
      expect(green).to.deep.equal('rgb(0, 255, 0)');
      expect(blue).to.deep.equal('rgb(0, 0, 255)');

      var redWithHash   = converter.hexToRgb('#ff0000');
      var greenWithHash = converter.hexToRgb('#00ff00');
      var blueWithHash  = converter.hexToRgb('#0000ff');

      expect(redWithHash).to.deep.equal('rgb(255, 0, 0)');
      expect(greenWithHash).to.deep.equal('rgb(0, 255, 0)');
      expect(blueWithHash).to.deep.equal('rgb(0, 0, 255)');
    });
    it('should convert basic hex colors to rgb() arrays', () => {
      var red   = converter.hexToRgb('ff0000', { returnArray: true });
      var green = converter.hexToRgb('00ff00', { returnArray: true });
      var blue  = converter.hexToRgb('0000ff', { returnArray: true });

      expect(red).to.deep.equal([255, 0, 0]);
      expect(green).to.deep.equal([0, 255, 0]);
      expect(blue).to.deep.equal([0, 0, 255]);

      var redWithHash   = converter.hexToRgb('#ff0000', { returnArray: true });
      var greenWithHash = converter.hexToRgb('#00ff00', { returnArray: true });
      var blueWithHash  = converter.hexToRgb('#0000ff', { returnArray: true });

      expect(redWithHash).to.deep.equal([255, 0, 0]);
      expect(greenWithHash).to.deep.equal([0, 255, 0]);
      expect(blueWithHash).to.deep.equal([0, 0, 255]);
    });
});
