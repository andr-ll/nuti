import nuti from '../src';

describe('main module test', () => {
  it('checks all the exported utils', () => {
    expect.assertions(1);

    expect(Object.keys(nuti)).toStrictEqual([
      'timeout',
      'makeLogger',
      'rand',
      'clone',
      'floats',
      'genJSON',
    ]);
  });
});
