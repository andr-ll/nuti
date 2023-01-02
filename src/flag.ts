/**
 * @description The `flag` utility.
 * @see [docs](../docs/flag.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { EventEmitter } from 'events';

export class Flag {
  private isDone = false;
  private emitter = new EventEmitter();

  private waitDonePromise = new Promise<void>((resolve) => {
    this.emitter.once('done', () => {
      resolve();
    });
  });

  get done() {
    return this.isDone;
  }

  waitDone() {
    return this.waitDonePromise;
  }

  setDone() {
    if (!this.isDone) {
      this.isDone = true;
      this.emitter.emit('done');
    }
  }
}

export const makeFlag = () => new Flag();
