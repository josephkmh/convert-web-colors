/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hslToHsla', () => {
    it('should convert a gray hsl to hsla: hsl(185,0%,32%)', () => {
      var gray = converter.hslToHsla("hsl(185, 0%, 32%)", {returnArray: true});
      expect(gray).to.deep.equal([185, 0, 32, 1]);
    });
    it('should convert basic hsl color string to hsla: hsl(185,42%,36%)', () => {
      var teal = converter.hslToHsla("hsl(185, 42%, 36%)", {returnArray: true});
      expect(teal).to.deep.equal([185, 42, 36, 1]);
    });
    it('should convert a basic hsl color array to hsla: [0, 100, 50]', () => {
      var green = converter.hslToHsla([0, 100, 50], {returnArray: true});
      expect(green).to.deep.equal([0, 100, 50, 1]);
    });

});
