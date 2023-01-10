import nuti from '../src';

describe('flag module test', () => {
  it('checks if flag changes the state', () => {
    expect.assertions(3);

    const flag = nuti.makeFlag();

    flag.waitDone().then(() => {
      expect(flag.done).toBeTruthy();
    });

    expect(flag.done).not.toBeTruthy();

    flag.setDone();

    expect(flag.done).toBeTruthy();
  });
});
