/* eslint-env mocha */

const expect = require('chai').expect;
const converter = require('./../index.js');

describe('cleanHexa', () => {
  it('should validate a hexa string and remove leading hash', () => {
    expect(converter.cleanHexa('#00FF0088')).to.equal('00FF0088');
  });
  it('should turn a 4 digit hexa string into a 8 digit one', () => {
    expect(converter.cleanHexa('#E4F3')).to.equal('EE44FF33');
  });
  it('should remove spaces from hexa strings', () => {
    expect(converter.cleanHexa(' #E4F3')).to.equal('EE44FF33');
    expect(converter.cleanHexa(' #AAAA ')).to.equal('AAAAAAAA');
  });
});
