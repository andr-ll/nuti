/*!
 * @description The main file of `nuti` package.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Needed to add types in the comments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from './logger/types';
import { timeout } from './timeout';
import { makeLogger } from './logger';
import { rand } from './rand';

import { clone } from './clone';
import { floats } from './floats';
import { genJSON } from './genJSON';

export type { LoggerOptions } from './logger/types';

export const nuti = {
  /**
   * Async-timeout function.
   * @see [docs](../docs/timeout.md)
   *
   * @param timer value in milliseconds to wait for (default 1 sec).
   * @param callback
   * a function which has to be executed after the timer. Can be regular function or async.
   *
   * @returns Value which will be returned from a `callback` function or undefined.
   */
  timeout,
  /**
   * A function for creating a logger with ability to write file logs.
   * @see [docs](../docs/logger.md)
   *
   * @param options {@link types.LoggerOptions LoggerOptions}
   */
  makeLogger,
  /**
   * A helper for generating random `string`, `number`
   * and `boolean` values.
   * @see [docs](../docs/rand.md)
   */
  rand,
  /**
   * A function for creating deep clones of Objects or Arrays.
   * @see [decs](../docs/clone.md)
   */
  clone,
  /**
   * A helper for performing valid mathematical operations with floats.
   * @see [docs](../docs/floats.md)
   */
  floats,
  /**
   * A function for creating json files with mocked data.
   */
  genJSON,
};

export default nuti;
