/**
 * @description The main file of `nuti` package.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { prettyOut } from './prettyOut';
import { timeout } from './timeout';
import { makeLogger } from './logger';
import { makeFlag } from './flag';
import { rand } from './rand';
import { req } from './httpClient';

import type * as LogTypes from './logger/types';

export type Types = {
  LoggerOptions: LogTypes.LoggerOptions;
};

export const nuti = {
  /**
   * Async-timeout function.
   * @see [docs](../docs/timeout.md)
   *
   * @param timer value in milliseconds to wait for (default 1 sec).
   * @param callback
   * a function which has to be executed after the timer. Can be regular function or async.
   *
   * @example await nuti.timeout(2000) // waits for 2 sec.
   *
   * @example const value = await nuti.timeout(3000, () => 'some-value');
   * console.log(value); // prints 'some-value' after 3 sec.
   *
   * @returns Value which will be returned from a `callback` function or void.
   */
  timeout,
  /**
   * A function which overrides `toString` method for Objects and Arrays.
   * @see [docs](../docs/prettyOut.md)
   */
  prettyOut,
  /**
   * A function for creating a logger with ability to write file logs.
   * @see [docs](../docs/logger.md)
   *
   * @param options {@link LogTypes.LoggerOptions LoggerOptions}
   */
  makeLogger,
  /**
   * A function for creating flag instance.
   * @see [docs](../docs/flag.md)
   */
  makeFlag,
  /**
   * An object with methods to generate random `string`,
   * `number` and `boolean` types.
   * @see [docs](../docs/rand.md)
   */
  rand,
  /**
   * The http(s) client with ability to perform 'GET', 'POST',
   * 'PUT', 'DELETE' requests.
   * @see [docs](../docs/httpClient.md)
   */
  req,
};

export default nuti;
