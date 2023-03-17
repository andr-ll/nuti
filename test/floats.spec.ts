import nuti from '../src';

describe('floats module test', () => {
  it('checks that error is thrown if less than 2 numbers are passed to floats.add', () => {
    expect.assertions(1);

    const err = () => nuti.floats.add(1.2);

    expect(err).toThrowError(new Error('Provide 2 or more numbers'));
  });

  it('checks if adds floats and returns valid result', () => {
    expect.assertions(4);

    const invalidResult_1 = 0.1 + 0.2;
    const result_1 = nuti.floats.add(0.1, 0.2);

    const invalidResult_2 = -2 + 0.3 + 11 + -1.8 + 0.1;
    const result_2 = nuti.floats.add(-2, 0.3, 11, -1.8, 0.1);

    expect(result_1).toStrictEqual(0.3);
    expect(result_1).not.toEqual(invalidResult_1);

    expect(result_2).toStrictEqual(7.6);
    expect(result_2).not.toEqual(invalidResult_2);
  });

  it('checks if subtracts floats and returns valid result', () => {
    expect.assertions(4);

    const invalidResult_1 = 0.6 - 0.33;
    const result_1 = nuti.floats.subtract(0.6, 0.33);

    const invalidResult_2 = -0.9 - 0.1 - -0.9;
    const result_2 = nuti.floats.subtract(-0.9, 0.1, -0.9);

    expect(result_1).toStrictEqual(0.27);
    expect(result_1).not.toEqual(invalidResult_1);

    expect(result_2).toStrictEqual(-0.1);
    expect(result_2).not.toEqual(invalidResult_2);
  });

  it('checks if multiplies floats and returns valid result', () => {
    expect.assertions(4);

    const invalidResult_1 = 0.9 * 0.2;
    const result_1 = nuti.floats.multiply(0.9, 0.2);

    const invalidResult_2 = 0.1 * 3 * 4003 * 0.81;
    const result_2 = nuti.floats.multiply(0.1, 3, 4003, 0.81);

    expect(result_1).toStrictEqual(0.18);
    expect(result_1).not.toEqual(invalidResult_1);

    expect(result_2).toStrictEqual(972.729);
    expect(result_2).not.toEqual(invalidResult_2);
  });

  it('checks if divides floats and returns valid result', () => {
    expect.assertions(4);

    const invalidResult_1 = 22.4 / 10;
    const result_1 = nuti.floats.divide(22.4, 10);

    const invalidResult_2 = 33.3 / 0.1;
    const result_2 = nuti.floats.divide(33.3, 0.1);

    expect(result_1).toStrictEqual(2.24);
    expect(result_1).not.toEqual(invalidResult_1);

    expect(result_2).toStrictEqual(333);
    expect(result_2).not.toEqual(invalidResult_2);
  });

  it('checks that converts `-0` to `0`', () => {
    expect.assertions(2);

    const negativeZero = -0;
    const positiveZero = nuti.floats.multiply(-0, 0.1);

    expect(1 / positiveZero).toStrictEqual(Infinity);
    expect(1 / negativeZero).toStrictEqual(-Infinity);
  });
});
