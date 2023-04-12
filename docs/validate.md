## Description

Helper includes 2 main functions:

1. `validate` - assert function, which verifies data payload against provided schema.
2. `buildSchema` - a function which creates valid `schema` and `ResultType`.

Also converts valid date (as string or number) to `Date` type.

> **Warning**
>
> `ResultType` IS ONLY A TYPE REFERENCE, DO NOT USE IT BECAUSE IT IS AN EMPTY OBJECT/ARRAY!

## Usage

Use `validate` function with any data to check if object/array is representing provided schema.

### Valid result

```ts
const data = {
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

nuti.validate(data, {
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
```

Or use pre-build schema with `buildSchema`:

```ts
const { schema, ResultType } = nuti.buildSchema({
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

nuti.validate(data, schema);
```

## Errors

If provided data has wrong types, missing keys in objects, wrong array types - valid errors with all description will be thrown

```ts
const data = { name: 'name', cars: ['bmw', undefined] };

try {
  validate(data, { name: 'string', cars: ['string'] });
} catch (error) {
  console.log(error.message);
}
```

Expected output:

```log
Validation failed: array item has type 'undefined', but 'string' type is required (at 'cars').
```
