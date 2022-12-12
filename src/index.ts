import { log } from './log';
import { timeout } from './timeout';
import { makeLogger } from './logger';

export const nuti = {
  /**
   * Async-timeout function.
   * @see [docs](../docs/timeout.md)
   *
   * @param timer value in milliseconds to wait for.
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
   * A log function which formats output to be printed to console.
   * Uses `JSON.stringify()` for not primitive types.
   *
   * @param args objects, arrays, strings, numbers to be printed in console
   */
  log,
  /**
   * A function for creating a logger with ability to write file logs.
   * @see [docs](../docs/logger.md)
   *
   * @param options {@link Types.LoggerOptions LoggerOptions}
   */
  makeLogger,
};

export default nuti;
