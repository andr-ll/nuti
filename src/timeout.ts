export const timeout = <T>(timer = 1000, callback?: () => T | Promise<T>) =>
  new Promise<T>((resolve, reject): void => {
    setTimeout((): void => {
      try {
        const data = callback == null ? undefined : callback();

        if (data instanceof Promise) {
          data.then(resolve);
          return;
        }

        resolve(data as T);
      } catch (error: unknown) {
        reject(error);
      }
    }, timer);
  });
