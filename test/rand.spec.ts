import nuti from '../src';

describe('rand module test', () => {
  it('checks if rand creates valid number', () => {
    expect.assertions(4);

    const number = nuti.rand.numb();
    const numberInRange = nuti.rand.numb(11, 204);

    expect(number).toBeLessThan(11);
    expect(number).toBeGreaterThan(-1);
    expect(numberInRange).toBeLessThan(205);
    expect(numberInRange).toBeGreaterThan(10);
  });

  it('checks if rand creates valid string', () => {
    expect.assertions(4);

    const defaultStr = nuti.rand.str();
    const strWithLength = nuti.rand.str(15);

    expect(defaultStr).toHaveLength(8);
    expect(typeof defaultStr).toStrictEqual('string');
    expect(strWithLength).toHaveLength(15);
    expect(typeof strWithLength).toStrictEqual('string');
  });

  it('checks if rand creates valid boolean', () => {
    expect.assertions(2);

    const bool = nuti.rand.bool();

    expect(bool === true || bool === false).toBeTruthy();
    expect(typeof bool).toStrictEqual('boolean');
  });
});
