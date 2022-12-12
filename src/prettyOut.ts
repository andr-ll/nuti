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
