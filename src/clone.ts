enum SerializedKeys {
  TYPE = '[ $serialized__type$ ]',
  VALUE = '[ $serialized__value$ ]',
}

enum SerializedTypes {
  DATE = 'DATE',
  MAP = 'MAP',
  SET = 'SET',
  INFINITY = 'INFINITY',
  NAN = 'NAN',
}

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
      default:
        return value;
    }
  }

  return value;
}

export const clone = <T extends Record<string, unknown>>(obj: T): T => {
  const stringifiedValue = JSON.stringify(obj, stringifyReplacer);

  return JSON.parse(stringifiedValue, parseReplacer);
};

const f = {
  d: new Date(),
  s: new Set(['foo', 'foo', 'bar']),
  b: {
    bb: new Date(),
    c: {
      a: new Date(),
      d: new Map([['one key', new Map().set('two key', 'fff')]]),
    },
  },
  c: {
    foo: 'bas',
  },
  arr: [new Date(), new Date(), new Date()],
  i: Infinity,
  ni: -Infinity,
};

const fff = clone(f);

console.log(fff.d instanceof Date);
console.log(fff.b.bb instanceof Date);
console.log(fff.b.c.a instanceof Date);
console.log(fff.arr.every((i) => i instanceof Date));
console.log(fff.b.c.d.get('one key'));
console.log(fff.s.size);
console.log(fff.s.has('foo'));
console.log(fff.i === Infinity);
console.log(fff.ni === -Infinity);
