/**
 * @description The `rand` utility.
 * @see [docs](../docs/rand.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as crypto from 'crypto';

export class Rand {
  bool() {
    return Math.random() > 0.5;
  }

  numb(min = 0, max = 10) {
    return Math.round((max - min) * Math.random()) - min;
  }

  str(len = 8) {
    const buf = crypto.randomBytes(len);
    return buf.toString('hex');
  }
}

export const rand = new Rand();
