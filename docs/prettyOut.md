## Description

A function which overrides `toString` method for `Object` and `Array` constructors.
This is done to have an ability for faster writing string output with JSON values.

If object has more than 3 keys, and array has length more than 3 - spaces will be added,
and each `key-value` pair will be printed on the new line.

## Usage

```ts
const obj = { foo: 'bar', numb: 3 };
const arr = [2, 3, 4];
const bigObject = {
  value: 'some_string',
  numb: 2,
  color: 'green',
  quality: 'good',
};

console.log(
  `An object: ${obj}\nAn array: ${arr}\nAnd a bigObject: ${bigObject}`,
);
```

A default output will be as following:

```log
An object: [object Object]
An array: 2,3,4
And a bigObject: [object Object]
```

After `prettyOut()` is called:

```ts
// Overrides `toString` method.
nuti.prettyOut();

console.log(
  `An object: ${obj}\nAn array: ${arr}\nAnd a bigObject: ${bigObject}`,
);
```

New `pretty` output:

```log
An object: {"foo":"bar","numb":3}
An array: [2,3,4]
And a bigObject: {
  "value": "some_string",
  "numb": 2,
  "color": "green",
  "quality": "good"
}
```
