/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('identifyString', () => {
    it('should not accept an array', () => {
        var identifyString = function(){
            converter.identifyString(['this', 'is', 'an', 'array']);
        }
        expect(identifyString).to.throw(TypeError);
    });

    // RGBA
    it('should identify an rgba() string input', () => {
        var rgba = converter.identifyString('rgba(255, 255 ,255, 0.4)');
        expect(rgba).to.equal('rgba');
    });

    // RGB
    it('should identify an rgb() string input', () => {
        var rgba = converter.identifyString('rgb(255, 255 ,255)');
        expect(rgba).to.equal('rgb');
    });
    it('should identify an rgb() string input without the leading rgb, but with parentheses', () => {
        var rgba = converter.identifyString('(45, 45 ,42)');
        expect(rgba).to.equal('rgb');
    });
    it('should identify an rgb() string input without the leading rgb or parentheses', () => {
        var rgba = converter.identifyString('45,45,45');
        expect(rgba).to.equal('rgb');
    });

    // HSLA
    it('should identify an hsla() string input', () => {
        var rgba = converter.identifyString('hsla(120, 100%, 50%, 0.4)');
        expect(rgba).to.equal('hsla');
    });

    // HSL
    it('should identify an hsl() string input', () => {
        var rgba = converter.identifyString('hsl(120, 100%, 50%)');
        expect(rgba).to.equal('hsl');
    });

    // HEX
    it('should identify a hex string input with leading hash', () => {
        var rgba = converter.identifyString('#ffffff');
        expect(rgba).to.equal('hex');
    });
    it('should identify a hex string without leading hash', () => {
        var rgba = converter.identifyString('ffffff');
        expect(rgba).to.equal('hex');
    });

    // HEXA
    it('should identify a 8-decimal hex string input with leading hash', () => {
        var rgba = converter.identifyString('#ffffffff');
        expect(rgba).to.equal('hexa');
    });
    it('should identify a 8-decimal hex string without leading hash', () => {
        var rgba = converter.identifyString('ffffffff');
        expect(rgba).to.equal('hexa');
    });
});
