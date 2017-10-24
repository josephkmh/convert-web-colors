/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('convert', () => {
  it('returns a populated object when given rgba() string: rgba(0,0,0,1)', () => {
    expect(converter.convert('rgba(0,0,0,1)')).to.deep.equal({
      rgba: 'rgba(0, 0, 0, 1)',
      rgb: 'rgb(0, 0, 0)',
      hsla: 'hsla(0, 0%, 0%, 1)',
      hsl: 'hsl(0, 0%, 0%)',
      hexa: '#000000FF',
      hex: '#000000',
    });
  });
  it('returns a populated object when given hsla: hsla(270,50%,40%,1)', () => {
    expect(converter.convert('hsla(270,50%,40%,1)')).to.deep.equal({
      rgba: 'rgba(102, 51, 153, 1)',
      rgb: 'rgb(102, 51, 153)',
      hsla: 'hsla(270, 50%, 40%, 1)',
      hsl: 'hsl(270, 50%, 40%)',
      hexa: '#663399FF',
      hex: '#663399',
    });
  });
  it('returns a populated object when given hsla: hsla(13,84.1%,12.5%,.35)', () => {
    expect(converter.convert('hsla(13,84.1%,12.5%,.35)')).to.deep.equal({
      rgba: 'rgba(59, 17, 5, 0.35)',
      rgb: 'rgb(186, 172, 168)',
      hsla: 'hsla(13, 84.1%, 12.5%, 0.35)',
      hsl: 'hsl(13, 11.5%, 69.4%)',
      hexa: '#3B110559',
      hex: '#BAACA8',
    });
  });
  it('returns a populated object when given a hex string with transparency #4c73b282', () => {
    expect(converter.convert('#4c73b282')).to.deep.equal({
      rgba: 'rgba(76, 115, 178, 0.51)',
      rgb: 'rgb(164, 184, 216)',
      hsla: 'hsla(217.1, 40.2%, 49.8%, 0.51)',
      hsl: 'hsl(217, 40%, 74.5%)',
      hexa: '#4C73B282',
      hex: '#A4B8D8',
    });
  });
  it('returns a populated object when given a hex string: #00FF00', () => {
    expect(converter.convert('#00FF00')).to.deep.equal({
      rgba: 'rgba(0, 255, 0, 1)',
      rgb: 'rgb(0, 255, 0)',
      hsla: 'hsla(120, 100%, 50%, 1)',
      hsl: 'hsl(120, 100%, 50%)',
      hexa: '#00FF00FF',
      hex: '#00FF00',
    });
  });
  it('returns a populated object when given rgb: 45,45,45', () => {
    expect(converter.convert('45,45,45')).to.deep.equal({
      rgba: 'rgba(45, 45, 45, 1)',
      rgb: 'rgb(45, 45, 45)',
      hsla: 'hsla(0, 0%, 17.6%, 1)',
      hsl: 'hsl(0, 0%, 17.6%)',
      hexa: '#2D2D2DFF',
      hex: '#2D2D2D',
    });
  });
  it('returns a populated object when given hsl: 84, 72%, 57%', () => {
    expect(converter.convert('84, 72%, 57%')).to.deep.equal({
      rgba: 'rgba(161, 224, 66, 1)',
      rgb: 'rgb(161, 224, 66)',
      hsla: 'hsla(84, 72%, 57%, 1)',
      hsl: 'hsl(84, 72%, 57%)',
      hexa: '#A1E042FF',
      hex: '#A1E042',
    });
  });
});
