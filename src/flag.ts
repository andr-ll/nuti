import EventEmitter = require('events');

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
