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
    expect.assertions(9);

    const result = {
      [nuti.rand.str()]: 8,
      [nuti.rand.str(15)]: 15,
      [nuti.rand.str(4, 'base64url')]: 4,
      [nuti.rand.str('hex')]: 8,
    };

    for (const key in result) {
      expect(key).toHaveLength(result[key]);
      expect(typeof key).toStrictEqual('string');
    }

    try {
      nuti.rand.str('foo' as 'abc' | 'hex' | 'base64url');
    } catch (error) {
      expect(error.message).toStrictEqual('Unsupported encoding type: "foo".');
    }
  });

  it('checks if rand creates valid boolean', () => {
    expect.assertions(2);

    const bool = nuti.rand.bool();

    expect(bool === true || bool === false).toBeTruthy();
    expect(typeof bool).toStrictEqual('boolean');
  });

  it('checks if rand creates valid date', () => {
    expect.assertions(2);
    const highestDateBarrier = Date.now();
    const lowestDateBarrier = highestDateBarrier - 14 * 24 * 60 * 60 * 1000;

    const date = nuti.rand.date();
    const timeInMS = Number(date);

    expect(
      lowestDateBarrier <= timeInMS && timeInMS >= lowestDateBarrier,
    ).toBeTruthy();
    expect(date).toBeInstanceOf(Date);
  });
});
