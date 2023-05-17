import { ValidationError } from './error';
import {
  ArraySchema,
  LiteralSchema,
  ObjectSchema,
  PrimitivesSchema,
} from './schema';
import {
  ValidationSchema,
  ValidationResult,
  Values,
  ArraySchemaType,
  ValidatorOptions,
} from './types';

const pickValidator =
  ({
    schema,
    parentKeys,
    key,
  }: Omit<ValidatorOptions<ValidationSchema | Values>, 'value'>) =>
  (value: unknown) => {
    return schema instanceof PrimitivesSchema
      ? validateBasic({ value, schema, key, parentKeys })
      : schema instanceof ArraySchema
      ? validateArray({ value, schema, parentKeys })
      : schema instanceof ObjectSchema
      ? validateObject({ value, schema, parentKeys })
      : schema instanceof LiteralSchema
      ? validateBasic({ value, schema, key, parentKeys })
      : validateObject({ value, schema, parentKeys });
  };

function validateObject({
  value: obj,
  schema,
  parentKeys = [],
}: Omit<ValidatorOptions<ValidationSchema | Values>, 'key'>): unknown {
  if (schema.optional && obj === undefined) {
    return;
  }

  if (schema instanceof ObjectSchema) {
    return validateObject({ schema: schema.schema, value: obj, parentKeys });
  }

  const received = typeof obj;

  if (received !== 'object' || obj === null) {
    throw new ValidationError({ expected: 'object', received, parentKeys });
  }

  const object = obj as Record<string, unknown>;
  const validationSchema = schema as ValidationSchema;

  for (const key in validationSchema) {
    const valueSchema = validationSchema[key];
    const value = object[key];
    const expected = valueSchema.type;

    if (valueSchema.optional && value === undefined) {
      continue;
    }

    if (value == null && expected !== 'unknown') {
      throw new ValidationError({
        key,
        expected,
        received: 'missing',
        parentKeys,
      });
    }

    const validator = pickValidator({
      key,
      schema: valueSchema,
      parentKeys: [...parentKeys, key],
    });

    object[key] = validator(value);
  }

  return object;
}

function validateArray({
  schema,
  value: arr,
  parentKeys,
}: Omit<ValidatorOptions<ArraySchemaType>, 'key'>) {
  if (schema.optional && arr === undefined) {
    return;
  }

  if (!Array.isArray(arr)) {
    throw new ValidationError({
      parentKeys,
      expected: 'array',
      received: typeof arr,
    });
  }

  const schemaType = schema.values;

  arr.forEach((item, id) => {
    const validator = pickValidator({ schema: schemaType, parentKeys });
    arr[id] = validator(item);
  });

  return arr;
}

function validateBasic({
  schema,
  value: item,
  key,
  parentKeys,
}: ValidatorOptions<Values>) {
  if (schema.optional && item === undefined) {
    return;
  }

  key = key ?? 'single value';
  parentKeys = parentKeys?.filter((i) => i !== key);
  const received = typeof item;

  if (schema.type === 'literal') {
    if (typeof item !== 'string') {
      throw new ValidationError({
        key,
        expected: 'string',
        received,
        parentKeys,
      });
    }

    if (!schema.literals.includes(item)) {
      throw new ValidationError({
        key,
        expected: schema.literals.join(' | '),
        received: item,
        parentKeys,
      });
    }

    return item;
  }

  if (schema.type === 'Date') {
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

  if (received !== schema.type && schema.type !== 'unknown') {
    throw new ValidationError({
      key,
      expected: schema.type,
      received,
      parentKeys,
    });
  }

  return item;
}

/**
 * A function which creates valid `schema` for validation and `ResultType`.
 * `ResultType` is an empty object, should be used as `typeof ResultType` only!
 *
 * @param schema ValidationSchema object which the `data` will be check against with
 */
export function buildSchema<S extends ValidationSchema | Values>(schema: S) {
  return { schema, ResultType: {} as ValidationResult<S> };
}

export function validate<S extends ValidationSchema | Values>(
  data: unknown,
  schema: S,
): asserts data is ValidationResult<S> {
  const validator = pickValidator({ schema });

  validator(data);
}
