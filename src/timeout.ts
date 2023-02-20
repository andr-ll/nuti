/*!
 * @description The `timeout` utility.
 * @see [docs](../docs/timeout.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

type Args<T> = [
  timerOrCallback?: number | (() => T | Promise<T | undefined> | undefined),
  callback?: () => T | Promise<T | undefined> | undefined,
];

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
export function timeout(): Promise<undefined>;

export function timeout(
  callback: () => void | Promise<void>,
): Promise<undefined>;

export function timeout<T>(callback: () => T | Promise<T>): Promise<T>;

export function timeout(
  timer: number,
  callback?: () => void | Promise<void>,
): Promise<undefined>;

export function timeout<T>(
  timer: number,
  callback?: () => T | Promise<T>,
): Promise<T>;

export function timeout<T>(...args: Args<T>) {
  const [timerOrCallback, possibleCallback] = args;

  const timer = typeof timerOrCallback === 'number' ? timerOrCallback : 1000;
  const callback =
    typeof timerOrCallback === 'function' && args[1] == null
      ? timerOrCallback
      : possibleCallback;

  return new Promise<T | undefined>((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = callback == null ? undefined : callback();

        if (data instanceof Promise) {
          data.then(resolve).catch(reject);
          return;
        }

        resolve(data);
      } catch (error: unknown) {
        reject(error);
      }
    }, timer);
  });
}
