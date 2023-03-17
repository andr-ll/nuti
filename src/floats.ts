/*!
 * @description The `floats` utility.
 * @see [docs](../docs/floats.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

export class Floats {
  /**
   * Adds floats.
   * @param numbers ints or floats (as many as needed)
   * @returns valid float
   */
  add(...numbers: number[]) {
    this.validateLength(numbers);
    const invalidResult = numbers.reduce((res, numb) => (res += numb), 0);

    return this.toValidFloat(invalidResult);
  }

  /**
   * Subtracts floats.
   * @param numbers ints or floats (as many as needed)
   * @returns valid float
   */
  subtract(...numbers: number[]) {
    this.validateLength(numbers);

    const firstNumb = numbers.shift() as number;
    const invalidResult = numbers.reduce(
      (res, numb) => (res -= numb),
      firstNumb,
    );

    return this.toValidFloat(invalidResult);
  }

  /**
   * Multiplies floats.
   * @param numbers ints or floats (as many as needed)
   * @returns valid float
   */
  multiply(...numbers: number[]) {
    this.validateLength(numbers);
    const invalidResult = numbers.reduce((res, numb) => (res *= numb), 1);

    return this.toValidFloat(invalidResult);
  }

  /**
   * Divides floats.
   * @param dividend int or float which will be divided
   * @param divisor int or float which the dividend will be divided with
   * @returns valid float
   */
  divide(dividend: number, divisor: number) {
    return this.toValidFloat(dividend / divisor);
  }

  /**
   * The function for converting JS float to valid mathematical float.
   * @param float JS float
   * @returns valid float
   */
  private toValidFloat(float: number) {
    const result = parseFloat(float.toFixed(8));

    // To handle `-0` result and return regular `0`
    // eslint-disable-next-line no-compare-neg-zero
    return result === -0 ? 0 : result;
  }

  /**
   * Validator of array length.
   * @param numbers array of numbers
   * @throws if length is less then 2
   */
  private validateLength(numbers: number[]) {
    if (numbers.length < 2) {
      throw new Error('Provide 2 or more numbers');
    }
  }
}

export const floats = new Floats();
