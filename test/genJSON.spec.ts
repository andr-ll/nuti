import nuti from '../src';
import * as fs from 'fs';
import { validate, v } from 'vator';

describe('genJSON helper test', () => {
  it('checks if json file is going to be generated with valid data', async () => {
    expect.assertions(2);

    const pathArr = './test_arr.log';
    const pathObj = './test_obj.log';
    const amount = 10;

    await nuti.genJSON({
      path: pathArr,
      data: [
        {
          name: () => nuti.rand.str(),
          age: () => (nuti.rand.bool() ? nuti.rand.numb(0, 100) : undefined),
        },
      ],
      amount,
    });

    await nuti.genJSON({
      path: pathObj,
      data: {
        name: () => nuti.rand.str(),
        age: () => nuti.rand.numb(0, 100),
        createdAt: () => nuti.rand.date(),
        isOnline: false,
      },
    });

    const arr = JSON.parse(fs.readFileSync(pathArr, { encoding: 'utf-8' }));
    const validArr = () =>
      validate(
        arr,
        v.array(v.object({ name: v.string, age: v.optional.number })),
      );
    expect(validArr).not.toThrow();

    const obj = JSON.parse(fs.readFileSync(pathObj, { encoding: 'utf-8' }));
    const validObj = () =>
      validate(obj, {
        name: v.string,
        age: v.number,
        createdAt: v.Date,
        isOnline: v.boolean,
      });

    expect(validObj).not.toThrow();
  });

  it('throws an error if invalid object was passed', async () => {
    expect.assertions(1);

    const err = () =>
      nuti.genJSON({
        path: './some.log',
        data: null as unknown as Record<string, unknown>,
      });

    await expect(err).rejects.toThrow();
  });
});
