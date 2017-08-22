/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('hexaToRgba', () => {
  it('should convert a random hex with transparency to an rgba() string', () => {
    expect(converter.hexaToRgba('#85E80F1E')).to.deep.equal('rgba(133, 232, 15, 0.12)');
  });
});
