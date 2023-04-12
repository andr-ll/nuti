import { BasicTypes } from './literals';
import { ArrayType, ObjectType, ValidationSchema } from './schema';

type ArrayElement<A> = A extends (infer ElementType)[] ? ElementType : never;

type LiteralToTypes = {
  string: string;
  number: number;
  boolean: boolean;
  Date: Date;
  unknown: unknown;
};

type ArrayTypeValidation<
  T extends ArrayType,
  E = ArrayElement<T>,
> = E extends BasicTypes
  ? Array<LiteralToTypes[E]>
  : E extends ArrayType
  ? ArrayTypeValidation<E>
  : E extends ObjectType
  ? Array<ValidationResult<E>>
  : never;

export type ValidationResult<Schema extends ValidationSchema> = {
  [K in keyof Schema]: Schema[K] extends BasicTypes
    ? LiteralToTypes[Schema[K]]
    : Schema[K] extends ArrayType
    ? ArrayTypeValidation<Schema[K]>
    : Schema[K] extends ObjectType
    ? ValidationResult<Schema[K]>
    : never;
};

type ValueKey<T> = T extends BasicTypes
  ? 'item'
  : T extends ArrayType
  ? 'arr'
  : T extends ObjectType
  ? 'obj'
  : 'value';

export type ValidatorOptions<T = BasicTypes | ObjectType | ArrayType> = {
  [K in ValueKey<T>]?: unknown;
} & {
  schema: T;
  key?: T extends BasicTypes ? string : never;
  parentKeys?: string[];
};
