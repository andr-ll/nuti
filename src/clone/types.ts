export enum SerializedKeys {
  TYPE = '[ $serialized__type$ ]',
  VALUE = '[ $serialized__value$ ]',
}

export enum SerializedTypes {
  DATE = 'DATE',
  MAP = 'MAP',
  SET = 'SET',
  INFINITY = 'INFINITY',
  NAN = 'NAN',
}

type PropertiesOnly<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
};

export type OmitMethods<T> = Pick<T, PropertiesOnly<T>[keyof T]>;
