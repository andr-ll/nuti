/**
 * @description The `rand` utility.
 * @see [docs](../docs/rand.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as crypto from 'crypto';

const encodings = ['abc', 'hex', 'base64url'] as const;
type StringEncoding = (typeof encodings)[number];

export class Rand {
  // cspell:disable
  private letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
  // cspell:enable
  private l_len = this.letters.length;

  private strAbc(buf: Buffer) {
    return Array.from(buf)
      .map((i) => {
        const id = i < this.l_len ? i : i % this.l_len;

        return this.letters[id];
      })
      .join('');
  }

  /**
   * Generates a random boolean.
   * @returns `true` or `false`
   */
  public bool() {
    return Math.random() > 0.5;
  }

  /**
   * Generates a random number in the range.
   * @param min the smallest possible number (default 0)
   * @param max the biggest possible number (default 10)
   * @returns random number
   */
  public numb(min = 0, max = 10) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Generates a random string with length of 8 and alphabetic characters.
   */
  public str(): string;
  /**
   * Generates a random string with given length. Also string encoding can be specified (default alphabetic).
   * @param len length of output string
   * @param enc encoding type (optional), 'abc' (alphabetic), 'hex' or 'base64url'
   */
  public str(len: number, enc?: StringEncoding): string;
  /**
   * Generates a random string with length of 8 and given type.
   * @param enc encoding type, 'abc' (alphabetic), 'hex' or 'base64url'
   */
  public str(enc: StringEncoding): string;
  /**
   * Implementation.
   */
  public str(
    ...args: [lenOrEnc?: number | StringEncoding, enc?: StringEncoding]
  ) {
    let [lenOrEnc = 8, enc = 'abc'] = args;

    if (typeof lenOrEnc === 'string') {
      enc = lenOrEnc;
      lenOrEnc = 8;
    }

    if (!encodings.includes(enc)) {
      throw new Error(`Unsupported encoding type: "${enc}".`);
    }

    const buf = crypto.randomBytes(lenOrEnc);

    if (enc === 'abc') {
      return this.strAbc(buf);
    }

    return buf.toString(enc).slice(0, lenOrEnc);
  }
}

export const rand = new Rand();
