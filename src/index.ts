import { log } from './log';
import { timeout } from './timeout';
import { makeLogger } from './logger';

export const nuti = {
  /**
   * Async-timeout function.
   * @param timer value in milliseconds to wait for.
   *
   * @example await nuti.timeout(2000) // waits for 2 sec.
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
   *
   * @param options {@link Types.LoggerOptions LoggerOptions}
   */
  makeLogger,
};

export default nuti;
