## Description

An async-timeout function. Can be used as a simple timeout or can execute a callback after some time.

## Usage

### Timeout:

Will wait for 2 seconds.

```ts
await nuti.timeout(2000);
```

### Execute after timeout:

Will return a value after 1 sec by default.

```ts
// `value` will have type `string`
const value = await nuti.timeout(() => {
  return 'some_value';
});

console.log(value); // prints 'some-value' after 1 sec.
```

Will return a value after 3 seconds.

```ts
// `value` will have type `string`
const value = await nuti.timeout(3000, () => {
  return 'some_value';
});

console.log(value); // prints 'some-value' after 3 sec.
```

Will run async function after 1 second and return undefined.

```ts
// `value` will have type `undefined`
const value = await nuti.timeout(1000, async () => {
  // `node-fetch` lib is pretended to be used for example
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const body = await fetch.json();

  console.log(body); //prints json value from the response
});

console.log(value); // undefined
```
