import { ValidationSchema, Values } from './types';
import {
  ArraySchema,
  LiteralSchema,
  ObjectSchema,
  PrimitivesSchema,
} from './schema';

class Validator<O extends true | undefined> {
  private static _optionalV: Omit<Validator<true>, 'optional'>;

  constructor(private _optional: O) {
    Validator._optionalV = new Validator(true);
  }

  get optional() {
    return Validator._optionalV;
  }

  get string() {
    const optional = this._optional;
    return new PrimitivesSchema('string', optional);
  }

  get number() {
    const optional = this._optional;
    return new PrimitivesSchema('number', optional);
  }

  get boolean() {
    const optional = this._optional;
    return new PrimitivesSchema('boolean', optional);
  }

  get null() {
    const optional = this._optional;
    return new PrimitivesSchema('null', optional);
  }

  get Date() {
    const optional = this._optional;
    return new PrimitivesSchema('Date', optional);
  }

  get unknown() {
    const optional = this._optional;
    return new PrimitivesSchema('unknown', optional);
  }

  object<S extends ValidationSchema>(schema: S) {
    const optional = this._optional;
    return new ObjectSchema(optional, schema);
  }

  array<V extends Values>(values: V) {
    const optional = this._optional;
    return new ArraySchema(optional, values);
  }

  literal<L extends string>(...values: L[]) {
    const optional = this._optional;
    return new LiteralSchema(optional, values);
  }
}

export const v = new Validator(undefined);
