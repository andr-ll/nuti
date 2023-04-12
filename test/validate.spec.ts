import { buildSchema, validate } from '../src/validate';

describe('validate errors', () => {
  it('throws an error if not allowed type is passed as data payload', () => {
    expect.assertions(1);

    const data = 'some data';

    try {
      validate(data, { name: 'string' });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Only objects or arrays are allowed to be validated.',
      );
    }
  });

  it('throws an error if wrong type is passed but object is expected as data payload', () => {
    expect.assertions(1);

    const data = { some: 'some' };

    try {
      validate(data, { some: { name: 'string' } });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: array item has type 'string', but 'object' type is required (at 'some').",
      );
    }
  });

  it('throws an error if wrong type is passed but array is expected as data payload', () => {
    expect.assertions(1);

    const data = { some: 'some' };

    try {
      validate(data, { some: ['number'] });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: array item has type 'string', but 'array' type is required (at 'some').",
      );
    }
  });

  it('throws an error if key is missing in payload data', () => {
    expect.assertions(1);

    const data = {};

    try {
      validate(data, { name: 'string' });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: key 'name' is missing, but 'string' type is required.",
      );
    }
  });

  it('throws an error if key has wrong type in payload data', () => {
    expect.assertions(1);

    const data = { name: 22 };

    try {
      validate(data, { name: 'string' });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: key 'name' has type 'number', but 'string' type is required.",
      );
    }
  });

  it('throws an error if array has wrong type in payload data', () => {
    expect.assertions(1);

    const data = { name: 'name', cars: ['bmw', undefined] };

    try {
      validate(data, { name: 'string', cars: ['string'] });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: array item has type 'undefined', but 'string' type is required (at 'cars').",
      );
    }
  });

  it('throws an error if nested array has wrong type in payload data', () => {
    expect.assertions(1);

    const data = { name: 'name', cars: [{ model: 'bmw', year: '2000' }] };

    try {
      validate(data, {
        name: 'string',
        cars: [{ model: 'string', year: 'number' }],
      });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: key 'year' has type 'string', but 'number' type is required (at 'cars').",
      );
    }
  });

  it('throws an error if can not convert string/NaN to Date', () => {
    expect.assertions(1);

    // cspell:disable
    const data = { date: '2023-04-12Tsssss' };
    // cspell: enable

    try {
      validate(data, { date: 'Date' });
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Validation failed: could not convert key 'date' to 'Date'. Invalid value of type 'string' is used.",
      );
    }
  });
});

describe('data type check', () => {
  it('converts stringified Date to Date object', () => {
    expect.assertions(1);

    const data = { date: '2023-04-12T13:38:00.971Z' };

    validate(data, { date: 'Date' });

    expect(data.date).toBeInstanceOf(Date);
  });

  it('build valid schema and ResultType and now throw with unknown type', () => {
    expect.assertions(11);

    const { schema, ResultType } = buildSchema({
      name: 'string',
      age: 'number',
      photos: ['string'],
      isRequired: 'boolean',
      updatedAt: 'Date',
      cars: [
        {
          model: 'string',
          year: 'number',
        },
      ],
      some: 'unknown',
    });

    // ResultType ONLY REPRESENTS A TYPE!
    expect(Object.keys(ResultType)).toHaveLength(0);

    const data: typeof ResultType = {
      age: 20,
      cars: [
        { model: 'bmw', year: 2015 },
        { model: 'mercedes', year: 2017 },
      ],
      isRequired: false,
      name: 'user',
      photos: ['photo-1', 'photo-2'],
      some: {
        name: 'some name',
      },
      updatedAt: new Date(),
    };

    validate(data, schema);

    expect(typeof data.age).toStrictEqual('number');
    expect(Array.isArray(data.cars)).toBeTruthy();
    expect(data.cars).toHaveLength(2);
    expect(data.isRequired).toStrictEqual(false);
    expect(typeof data.isRequired).toStrictEqual('boolean');
    expect(typeof data.name).toStrictEqual('string');
    expect(Array.isArray(data.photos)).toBeTruthy();
    expect(data.some).not.toBeUndefined();
    expect(typeof (data.some as { name: string }).name).toStrictEqual('string');
    expect(data.updatedAt).toBeInstanceOf(Date);
  });
});
