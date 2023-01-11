/**
 * @description The `rand` utility.
 * @see [docs](../docs/rand.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as crypto from 'crypto';

export class Rand {
  private letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
  
  private l_len = this.letters.length;

  private strLtr(buf: Buffer) {
    return Array.from(buf).map((i) => {
      const id = i < this.l_len ? i : i % this.l_len;
    
      return this.letters[id];
    }).join('');
  }

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

  str(len = 8, type: 'ltr' | 'hex' = 'ltr') {
    const buf = crypto.randomBytes(len);
    
    if (type === 'ltr') {
      return this.strLtr(buf);
    }

    return buf.toString('hex').slice(0, len);
  }
}

export const rand = new Rand();
