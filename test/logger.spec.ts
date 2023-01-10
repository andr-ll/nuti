import nuti from '../src';
import * as fs from 'fs';

const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
jest
  .spyOn(Date.prototype, 'toLocaleString')
  .mockReturnValue('Jan 10, 2023, 15:43:21');

describe('error handling', () => {
  it('throws an error if there is no output for logger', () => {
    expect.assertions(1);

    try {
      nuti.makeLogger({ stdoutEnable: false });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'At least one output has to be specified!',
      );
    }
  });
});

describe('logger module test', () => {
  it('creates logger and write valid logs', () => {
    expect.assertions(3);

    const logger = nuti.makeLogger();

    logger.info('some info');
    logger.warn('some warning');
    logger.error('some error');

    const result = Array.from(logSpy.mock.calls.flat());

    expect(result[0]).toBe(
      '15:43:21 Jan 10 2023 \x1B[0;32m[ info ]:\x1B[0m some info',
    );
    expect(result[1]).toBe(
      '15:43:21 Jan 10 2023 \x1B[0;33m[ warn ]:\x1B[0m some warning',
    );
    expect(result[2]).toBe(
      '15:43:21 Jan 10 2023 \x1B[0;31m[ error ]:\x1B[0m some error',
    );
  });

  it('creates file logger and write valid logs', async () => {
    expect.assertions(3);

    const filePath = './node_modules/nuti_test_output.log';

    const logger = nuti.makeLogger({ filePath, stdoutEnable: false });

    logger.info('some info');
    logger.warn('some warning', { reason: 'some reason' });

    // await for stream to be created.
    await nuti.timeout(1000);

    const [infoLog, warnLog, warningJSON] = fs
      .readFileSync(filePath, { encoding: 'utf-8' })
      .split('\n')
      .filter((item) => item !== '{');

    expect(infoLog).toStrictEqual('15:43:21 Jan 10 2023 [ info ]: some info');
    expect(warnLog).toStrictEqual(
      '15:43:21 Jan 10 2023 [ warn ]: some warning',
    );
    expect(warningJSON.trim()).toStrictEqual('"reason": "some reason"');
  });
});
