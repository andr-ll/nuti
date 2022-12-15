## Description

A collection of functions which are generating random values of `string`,
`number` and `boolean` types.

## Usage

### bool:

```ts
const { rand } = nuti;

// will print `true` or `false`
console.log(rand.bool());
```

### str:

```ts
const { rand } = nuti;

// returns a random string with length of 8
const str_1 = rand.str();

// returns a random string with length of 15
const str_2 = rand.str(15);
```

### numb:

```ts
const { rand } = nuti;

// returns a random number between 0 and 10
const numb_1 = rand.numb();

// returns a random number between 12 and 903
const numb_2 = rand.numb(12, 903);
```
