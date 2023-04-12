import { ValidationError } from './error';
import {
  ArrayType,
  BasicTypes,
  ObjectType,
  ValidationResult,
  ValidationSchema,
  ValidatorOptions,
} from './types';

const pickValidator =
  ({ schema, key, parentKeys }: Omit<ValidatorOptions, 'value'>) =>
  (value: unknown) => {
    return typeof schema === 'string'
      ? validateBasic({ item: value, schema, key, parentKeys })
      : Array.isArray(schema)
      ? validateArray({ arr: value, schema, parentKeys })
      : validateObject({ obj: value, schema, parentKeys });
  };

function validateObject({
  obj,
  schema,
  parentKeys = [],
}: Omit<ValidatorOptions<ObjectType | ArrayType>, 'key'>) {
  const received = typeof obj;

  if (received !== 'object' || obj === null) {
    throw new ValidationError({ expected: 'object', received, parentKeys });
  }

  const object = obj as Record<string, unknown>;

  for (const key in schema) {
    const schemaType = schema[key];
    const value = object[key];

    const expected =
      typeof schemaType === 'string'
        ? schemaType
        : Array.isArray(schemaType)
        ? 'array'
        : 'object';

    if (value == null && schemaType !== 'unknown') {
      throw new ValidationError({
        key,
        expected,
        received: 'missing',
        parentKeys,
      });
    }

    const validator = pickValidator({
      key,
      schema: schemaType,
      parentKeys: [...parentKeys, key],
    });

    object[key] = validator(value);
  }

  return object;
}

function validateArray({
  schema,
  arr,
  parentKeys,
}: Omit<ValidatorOptions<ArrayType>, 'key'>) {
  if (!Array.isArray(arr)) {
    throw new ValidationError({
      parentKeys,
      expected: 'array',
      received: typeof arr,
    });
  }

  const schemaType = schema[0];

  arr.forEach((item, id) => {
    const validator = pickValidator({ schema: schemaType, parentKeys });
    arr[id] = validator(item);
  });

  return arr;
}

function validateBasic({
  schema: schemaType,
  item,
  key,
  parentKeys,
}: ValidatorOptions<BasicTypes>) {
  const received = typeof item;
  parentKeys = parentKeys?.filter((i) => i !== key);

  if (schemaType === 'Date') {
    const seconds = Date.parse(String(item));

    if (Number.isNaN(seconds)) {
      throw new ValidationError({
        key,
        expected: 'Date',
        received,
        parentKeys,
        convertFailed: true,
      });
    }

    return new Date(seconds);
  }

  if (received !== schemaType && schemaType !== 'unknown') {
    throw new ValidationError({
      key,
      expected: schemaType,
      received,
      parentKeys,
    });
  }

  return item;
}

/**
 * Assert function, which verifies data payload against provided schema.
 * @param data any array or object
 * @param schema ValidationSchema object which the `data` will be check against with
 * @throws ValidationError if provided data payload is having mismatch with schema
 */
export function validate<S extends ValidationSchema>(
  data: unknown,
  schema: S,
): asserts data is ValidationResult<S> {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Only objects or arrays are allowed to be validated.');
  }

  const validator = pickValidator({ schema });

  validator(data);
}

/**
 * A function which creates valid `schema` for validation and `ResultType`.
 * `ResultType` is an empty object, should be used as `typeof ResultType` only!
 *
 * @param schema ValidationSchema object which the `data` will be check against with
 */
export function buildSchema<S extends ValidationSchema>(schema: S) {
  return { schema, ResultType: {} as ValidationResult<S> };
}
