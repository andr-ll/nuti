## Description

A collection which contains `add`, `subtract`, `multiply` and `divide`
helpers for the `float` numbers. This is well known issue in JS that
`0.1 + 0.2` is not matching `0.3`.

Helpers are using `toFixed()` method and this allows to get valid result
for mathematical operations with floats. Returned value will contain 8 digits
after the decimal point.

> **Note**
>
> The `add`, `subtract` and `multiply` helpers are able to get as many numbers as needed.
>
> The `divide` helper supports **only 2 numbers** - dividend and divisor.

## Usage

### add:

```ts
const { floats } = nuti;

const invalid_1 = 0.1 + 0.2 + 0.3 + 0.1; // 0.7000000000000001
const valid_1 = floats.add(0.1, 0.2, 0.3, 0.1); // 0.7

const invalid_2 = 0.1 + 0.2 + 0.3 + -0.1; // 0.5000000000000001
const valid_2 = floats.add(0.1, 0.2, 0.3, -0.1); // 0.5
```

### subtract:

```ts
const { floats } = nuti;

const invalid_1 = -0.1 - 0.2 - -0.3; // -5.551115123125783e-17
const valid_1 = floats.subtract(-0.1, 0.2, -0.3); // 0

const invalid_2 = 0.1 - 0.2 - 0.2; // -0.30000000000000004
const valid_2 = floats.subtract(0.1, 0.2, 0.2); // -0.3
```

### multiply:

```ts
const { floats } = nuti;

const invalid = 0.1 * 0.2 * 3; // 0.06000000000000001
const valid = floats.multiply(0.1, 0.2, 3); // 0.06
```

### divide:

```ts
const { floats } = nuti;

const invalid = 2.1 / 3; // 0.7000000000000001
const valid = floats.divide(2.1, 3); // 0.7
```
