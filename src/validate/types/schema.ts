import { BasicTypes } from './literals';

type KeyType = string | number | symbol;
type Types = BasicTypes | ArrayType | ObjectType;

export type ArrayType = [type: BasicTypes | ArrayType | ObjectType];
export type ObjectType = { [key: KeyType]: Types };
export type ValidationSchema = ObjectType | ArrayType;
