import nuti from '../src';

const defaultObject = {
  name: 'some-name',
  numb: 123,
  date: new Date(),
  array: [1, new Date()],
  array_objects: [
    { name: 'object-from-array' },
    { name: 'object-from-array2' },
  ],
  infinity: Infinity,
  negative_infinity: -Infinity,
  nested: {
    name: 'new object',
  },
  map: new Map([['name', 'some name']]),
  set: new Set(['foo', 'bar', 'foo']),
  nan: NaN,
};

class ClassToClone {
  name = 'some-class';

  sayName() {
    return this.name;
  }
}

const classInstance = new ClassToClone();

describe('clone module test', () => {
  it('checks if clones object', () => {
    expect.assertions(15);

    const clonedObject = nuti.clone(defaultObject);

    expect(clonedObject === defaultObject).not.toBeTruthy();
    expect(clonedObject.name).toStrictEqual(defaultObject.name);
    expect(clonedObject.numb).toStrictEqual(defaultObject.numb);
    expect(clonedObject.infinity).toStrictEqual(defaultObject.infinity);
    expect(clonedObject.negative_infinity).toStrictEqual(
      defaultObject.negative_infinity,
    );
    expect(clonedObject.date === defaultObject.date).not.toBeTruthy();
    expect(clonedObject.date.toISOString()).toStrictEqual(
      defaultObject.date.toISOString(),
    );
    expect(clonedObject.nested.name).toStrictEqual(defaultObject.nested.name);
    expect(clonedObject.array[0]).toStrictEqual(defaultObject.array[0]);
    expect(clonedObject.array[1].toLocaleString()).toStrictEqual(
      defaultObject.array[1].toLocaleString(),
    );
    expect(clonedObject.array_objects[0].name).toStrictEqual(
      defaultObject.array_objects[0].name,
    );
    expect(clonedObject.map.get('name')).toStrictEqual(
      defaultObject.map.get('name'),
    );
    expect(clonedObject.set.size).toStrictEqual(2);
    expect(clonedObject.set.has('foo')).toBeTruthy();
    expect(clonedObject.nan).toBeNaN();
  });

  it('checks if clones class without methods', () => {
    expect.assertions(3);

    const clonedObject = nuti.clone(classInstance);

    expect(clonedObject === classInstance).not.toBeTruthy();
    expect(clonedObject.name).toStrictEqual(classInstance.name);

    // eslint-disable-next-line jest/valid-expect, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(clonedObject.sayName).toBeUndefined();
  });
});
