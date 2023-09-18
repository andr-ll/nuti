## Description

A function which creates desired JSON file from given input.

## Usage

### Create single json object:

```ts
import nuti from 'nuti';

await nuti.genJSON({
  path: './result.json',
  data: {
    name: () => nuti.rand.str(),
    age: () => nuti.rand.numb(0, 100),
    createdAt: () => nuti.rand.date(),
    isOnline: false,
    something: 'static string value',
  },
});
```

The `./result.json` should look as following:

```json
{
  "name": "shZGAPzT",
  "age": 38,
  "createdAt": "2023-09-15T20:42:15.997Z",
  "isOnline": false,
  "something": "static string value"
}
```

### Create array of json objects:

```ts
import nuti from 'nuti';

await nuti.genJSON({
  path: './result.json',
  data: [
    {
      name: () => nuti.rand.str(),
      age: () => nuti.rand.numb(0, 100),
      createdAt: () => nuti.rand.date(),
      isOnline: false,
      something: 'static string value',
    },
  ],
  amount: 5,
});
```

The `./result.json` should look as following:

<-- cspell:disable -->

```json
[
  {
    "name": "jfIoRdcl",
    "age": 5,
    "createdAt": "2023-09-04T20:44:09.779Z",
    "isOnline": false,
    "something": "static string value"
  },
  {
    "name": "xeZqPGhA",
    "age": 93,
    "createdAt": "2023-09-05T20:44:09.780Z",
    "isOnline": false,
    "something": "static string value"
  },
  {
    "name": "iMeIuLph",
    "age": 100,
    "createdAt": "2023-09-07T20:44:09.780Z",
    "isOnline": false,
    "something": "static string value"
  },
  {
    "name": "TtbnARmH",
    "age": 36,
    "createdAt": "2023-09-10T20:44:09.780Z",
    "isOnline": false,
    "something": "static string value"
  },
  {
    "name": "cBAXcTHL",
    "age": 11,
    "createdAt": "2023-09-18T20:44:09.780Z",
    "isOnline": false,
    "something": "static string value"
  }
]
```
