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

<!-- cspell: disable -->

```ts
const { rand } = nuti;

// returns a random string with default length containing only alphabetic chars.
const str_1 = rand.str(); // RDcLDbtM

// returns a random string with length of 15 containing only alphabetic chars.
const str_2 = rand.str(15); // kfBFewEhLdpeknd

// returns a random string with length of 7 and 'hex' encoding.
const str_3 = rand.str(7, 'hex'); // a92f60;

// returns a random string with default length and 'base64url' encoding.
const str_3 = rand.str('base64url'); // 8iPFjIJR;
```

<!-- cspell: enable -->

### numb:

```ts
const { rand } = nuti;

// returns a random number between 0 and 10
const numb_1 = rand.numb();

// returns a random number between 12 and 903
const numb_2 = rand.numb(12, 903);
```
