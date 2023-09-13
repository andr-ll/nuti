import * as fs from 'fs';

export async function genJSON<
  T extends Record<string, (() => unknown) | unknown>,
  D extends T | [T],
>(
  opts: D extends [T]
    ? { path: string; data: D; amount: number }
    : { path: string; data: D; amount?: never },
): Promise<void> {
  return new Promise((res, rej) => {
    const { data, path, amount } = opts;
    const stream = fs.createWriteStream(path);

    try {
      const isArray = Array.isArray(data) && data.length === 1;
      const objToGenerate = (isArray ? data[0] : data) as T;
      const isValidObject =
        typeof objToGenerate === 'object' && objToGenerate !== null;

      if (!isValidObject) {
        throw new Error('Invalid object provided for generation');
      }

      const entries = Object.entries(objToGenerate);

      if (isArray && amount) {
        stream.write('[\n');

        for (let count = 1; count <= amount; count++) {
          const obj = populateObject(entries);
          stream.write(
            `  ${JSON.stringify(obj)}${count < amount ? ',\n' : '\n]'}`,
          );
        }

        return;
      }

      stream.write(JSON.stringify(populateObject(entries), null, 2));
    } catch (error) {
      stream.once('close', () => {
        fs.rmSync(path);
        rej(error);
      });
    } finally {
      stream.close(() => res());
    }
  });
}

function populateObject(entries: [string, (() => unknown) | unknown][]) {
  const obj: Record<string, unknown> = {};

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    obj[key] = typeof value === 'function' ? value() : value;
  }

  return obj;
}
