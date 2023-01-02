/**
 * @description The `prettyOut` utility.
 * @see [docs](../docs/prettyOut.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @licence MIT
 */

import { makeFlag } from './flag';

const flag = makeFlag();

export const prettyOut = (): void => {
  if (flag.done) {
    return;
  }

  Object.prototype.toString = function () {
    return JSON.stringify(
      this,
      null,
      Object.keys(this).length > 3 ? 2 : undefined,
    );
  };

  Array.prototype.toString = function () {
    return JSON.stringify(this, null, this.length > 3 ? 2 : undefined);
  };

  flag.setDone();
};
