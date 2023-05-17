import {
  ArraySchemaType,
  LiteralSchemaType,
  ObjectSchemaType,
  PrimitivesSchemaType,
  ValidationSchema,
  Values,
} from './schema';

type isOptional<T, O extends true | undefined> = O extends true
  ? T | undefined
  : T;

type LiteralToTypes = {
  string: string;
  number: number;
  boolean: boolean;
  Date: Date;
  unknown: unknown;
  null: null;
};

type ArrayTypeValidation<V extends Values> = V extends PrimitivesSchemaType
  ? Array<isOptional<LiteralToTypes[V['type']], V['optional']>>
  : V extends ObjectSchemaType
  ? Array<isOptional<ValidationResult<V['schema']>, V['optional']>>
  : V extends ArraySchemaType
  ? Array<isOptional<ArrayTypeValidation<V['values']>, V['optional']>>
  : never;

type Validate<V extends Values> = V extends PrimitivesSchemaType
  ? isOptional<LiteralToTypes[V['type']], V['optional']>
  : V extends ObjectSchemaType
  ? isOptional<ValidationResult<V['schema']>, V['optional']>
  : V extends ArraySchemaType
  ? isOptional<ArrayTypeValidation<V['values']>, V['optional']>
  : V extends LiteralSchemaType
  ? isOptional<V['literals'][number], V['optional']>
  : never;

export type ValidationResult<Schema extends ValidationSchema | Values> =
  Schema extends ValidationSchema
    ? {
        [K in keyof Schema]: Validate<Schema[K]>;
      }
    : Schema extends Values
    ? Validate<Schema>
    : never;

export type ValidatorOptions<S extends ValidationSchema | Values> = {
  schema: S;
  key?: string;
  parentKeys?: string[];
  value: unknown;
};
