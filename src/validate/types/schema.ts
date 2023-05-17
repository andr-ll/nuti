export type PrimitiveTypes =
  | 'string'
  | 'number'
  | 'boolean'
  | 'unknown'
  | 'null'
  | 'Date';

export type ObjectType = 'object';
export type ArrayType = 'array';
export type LiteralType = 'literal';

type KeyType = string | number | symbol;

export type Optional = true | undefined;

export type PrimitivesSchemaType = {
  type: PrimitiveTypes;
  optional: Optional;
};

export type Literals = string[];

export type LiteralSchemaType = {
  type: LiteralType;
  optional: Optional;
  literals: Literals;
};

export type ObjectSchemaType = {
  type: ObjectType;
  optional: Optional;
  schema: ValidationSchema;
};

export type ArraySchemaType = {
  type: ArrayType;
  optional: Optional;
  values: Values;
};

export type Values =
  | PrimitivesSchemaType
  | ObjectSchemaType
  | ArraySchemaType
  | LiteralSchemaType;

export type ValidationSchema = {
  [key: KeyType]: Values;
};
