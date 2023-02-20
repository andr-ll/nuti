import { OmitMethods, SerializedKeys, SerializedTypes } from './types';

function stringifyReplacer(key: string, value: unknown) {
  const realValue = this[key];

  if (realValue instanceof Date) {
    return {
      [SerializedKeys.TYPE]: SerializedTypes.DATE,
      [SerializedKeys.VALUE]: value,
    };
  }

  if (realValue instanceof Map) {
    return {
      [SerializedKeys.TYPE]: SerializedTypes.MAP,
      [SerializedKeys.VALUE]: Array.from(realValue.entries()),
    };
  }

  if (realValue instanceof Set) {
    return {
      [SerializedKeys.TYPE]: SerializedTypes.SET,
      [SerializedKeys.VALUE]: Array.from(realValue),
    };
  }

  if (realValue === Infinity) {
    return {
      [SerializedKeys.TYPE]: SerializedTypes.INFINITY,
      [SerializedKeys.VALUE]: 'Infinity',
    };
  }

  if (realValue === -Infinity) {
    return {
      [SerializedKeys.TYPE]: SerializedTypes.INFINITY,
      [SerializedKeys.VALUE]: null,
    };
  }

  if (typeof realValue === 'number' && Number.isNaN(realValue)) {
    return {
      [SerializedKeys.TYPE]: SerializedTypes.NAN,
      [SerializedKeys.VALUE]: null,
    };
  }

  return value;
}

function parseReplacer(
  _: string,
  value: Record<SerializedKeys, unknown> | unknown,
) {
  if (typeof value === 'object' && value != null) {
    if (!(SerializedKeys.TYPE in value && SerializedKeys.VALUE in value)) {
      return value;
    }

    const serializedType = value[SerializedKeys.TYPE];
    const serializedValue = value[SerializedKeys.VALUE];

    switch (serializedType) {
      case SerializedTypes.DATE:
        return new Date(serializedValue as string);
      case SerializedTypes.MAP:
        return new Map(serializedValue as Iterable<[unknown, unknown]>);
      case SerializedTypes.SET:
        return new Set(serializedValue as Array<unknown>);
      case SerializedTypes.INFINITY:
        return serializedValue === 'Infinity' ? Infinity : -Infinity;
      case SerializedTypes.NAN:
        return NaN;
    }
  }

  return value;
}

export const clone = <T extends object | Array<unknown>>(
  entity: T,
): OmitMethods<T> => {
  const stringifiedValue = JSON.stringify(entity, stringifyReplacer);

  return JSON.parse(stringifiedValue, parseReplacer);
};
