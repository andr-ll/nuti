/**
 * @description The `rand` utility.
 * @see [docs](../docs/rand.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as crypto from 'crypto';

export class Rand {
  /**
   * Generates a random boolean.
   * @returns `true` or `false`
   */
  bool() {
    return Math.random() > 0.5;
  }

  /**
   * Generates a random number in the range.
   * @param min the smallest possible number (default 0)
   * @param max the biggest possible number (default 10)
   * @returns random number
   */
  numb(min = 0, max = 10) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  str(len = 8) {
    const buf = crypto.randomBytes(len);
    return buf.toString('hex').slice(0, len);
  }
}

export const rand = new Rand();
