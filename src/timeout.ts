/**
 * @description The `timeout` utility.
 * @see [docs](../docs/timeout.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

export const timeout = <T>(timer?: number, callback?: () => T | Promise<T>) =>
  new Promise<T>((resolve, reject): void => {
    setTimeout((): void => {
      try {
        const data = callback == null ? undefined : callback();

        if (data instanceof Promise) {
          data.then(resolve).catch(reject);
          return;
        }

        resolve(data as T);
      } catch (error: unknown) {
        reject(error);
      }
    }, timer ?? 1000);
  });
