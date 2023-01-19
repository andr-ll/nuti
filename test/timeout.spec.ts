import nuti from '../src';

describe('error handling', () => {
  it('checks if timeout runs async function and handles error', async () => {
    expect.assertions(1);

    try {
      await nuti.timeout(300, async () => {
        throw new Error('some-error');
      });
    } catch (error) {
      expect(error.message).toStrictEqual('some-error');
    }
  });

  it('checks if timeout runs regular function and handles error', async () => {
    expect.assertions(1);

    try {
      await nuti.timeout(300, () => {
        throw new Error('some-error');
      });
    } catch (error) {
      expect(error.message).toStrictEqual('some-error');
    }
  });
});

describe('timeout module check', () => {
  it('checks if timeout waits for default time - 1 second', async () => {
    expect.assertions(1);

    const start = Date.now();
    await nuti.timeout();
    const end = Date.now();

    console.log(end - start);
    expect(end - start >= 998).toBeTruthy();
  });

  it('checks if timeout waits for assigned time', async () => {
    expect.assertions(1);

    const time = 2000;

    const start = performance.now();
    await nuti.timeout(time);
    const end = performance.now();

    expect(end - start >= time).toBeTruthy();
  });

  it('checks if timeout runs function after assigned time', async () => {
    expect.assertions(1);

    const time = 2000;
    let end = 0;

    const start = performance.now();
    await nuti.timeout(time, () => {
      end = performance.now();
    });

    expect(end - start >= time).toBeTruthy();
  });

  it('checks if timeout runs function and returns valid type', async () => {
    expect.assertions(3);

    const time = 300;
    let end = 0;

    const start = performance.now();
    const result = await nuti.timeout(time, () => {
      end = performance.now();
      return {
        foo: 'bar',
      };
    });

    const timeRange = end - start;

    expect(end - start >= time && timeRange < 500).toBeTruthy();
    expect(typeof result).toStrictEqual('object');
    expect(result.foo).toStrictEqual('bar');
  });

  it('checks if timeout runs async function and returns valid type', async () => {
    expect.assertions(2);

    const result = await nuti.timeout(300, async () => {
      return 10;
    });

    expect(typeof result).toStrictEqual('number');
    expect(result).toStrictEqual(10);
  });
});
