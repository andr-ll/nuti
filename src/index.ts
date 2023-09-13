/*!
 * @description The main file of `nuti` package.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Needed to add types in the comments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as types from './logger/types';
import { prettify } from './prettify';
import { timeout } from './timeout';
import { makeLogger } from './logger';
import { makeFlag } from './flag';
import { rand } from './rand';
import { http } from './httpClient';

import { clone } from './clone';
import { floats } from './floats';
import { buildSchema, validate } from './validate';
import { genJSON } from './genJSON';

export * from './types';

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
   * @returns Value which will be returned from a `callback` function or undefined.
   */
  timeout,
  /**
   * A function which overrides `toString` method for Objects and Arrays.
   * @see [docs](../docs/prettify.md)
   */
  prettify,
  /**
   * A function for creating a logger with ability to write file logs.
   * @see [docs](../docs/logger.md)
   *
   * @param options {@link types.LoggerOptions LoggerOptions}
   */
  makeLogger,
  /**
   * A function for creating flag instance.
   * @see [docs](../docs/flag.md)
   */
  makeFlag,
  /**
   * A helper for generating random `string`, `number`
   * and `boolean` values.
   * @see [docs](../docs/rand.md)
   */
  rand,
  /**
   * The http(s) client with ability to perform 'GET', 'POST',
   * 'PUT', 'DELETE' requests.
   * @see [docs](../docs/httpClient.md)
   */
  http,
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
   * Assert function, which verifies data payload against provided schema.
   * @see [docs](../docs/validate.md)
   */
  validate,
  /**
   * A function which creates valid `schema` for validation and `ResultType`.
   * `ResultType` is an empty object, should be used as `typeof ResultType` only!
   */
  buildSchema,
  /**
   * A function for creating json files with mocked data.
   */
  genJSON,
};

export default nuti;
