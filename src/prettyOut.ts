/**
 * @description The `prettyOut` utility.
 * @see [docs](../docs/prettyOut.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

export const prettyOut = (...objects: Array<object | unknown[]>): void => {
  for (const obj of objects) {
    const length = Array.isArray(obj) ? obj.length : Object.keys(obj).length;

    obj.toString = function () {
      return JSON.stringify(obj, null, length > 3 ? 2 : undefined);
    };
  }
};
