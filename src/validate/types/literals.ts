type PrimitiveTypes = 'string' | 'number' | 'boolean';
type CustomTypes = 'unknown' | 'Date';

export type BasicTypes = PrimitiveTypes | CustomTypes;
export type NodeTypes =
  | PrimitiveTypes
  | 'bigint'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';
