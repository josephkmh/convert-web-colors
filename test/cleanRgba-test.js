/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanRgba', () => {
    it('should remove whitespace from rgba()', () => {
        var test = converter.cleanRgba('rgba( 255, 255, 255, 1 )');
        var expected = 'rgba(255, 255, 255, 1)';
        expect(test).to.equal(expected);
    });
    it('should remove whitespace from rgba() with a decimal alpha value', () => {
        var test = converter.cleanRgba('rgba( 255, 255, 255, .5 )');
        var expected = 'rgba(255, 255, 255, 0.5)';
        expect(test).to.equal(expected);
    });
    it('should return an array from an rgba() string when specified', () => {
        var test = converter.cleanRgba('rgba( 255, 255, 255, 1 )', {returnArray: true});
        var expected = [255, 255, 255, 1];
        expect(test).to.deep.equal(expected);
    });
    it('should return alpha channel as a decimal when given a percentage', () => {
        var test = converter.cleanRgba('rgba( 123, 123, 123, 81.6% )', {returnArray: true});
        var expected = [123,123,123,0.816];
        expect(test).to.deep.equal(expected);
    });
});
