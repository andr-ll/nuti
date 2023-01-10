# nuti

[![NPM version][npm-img]][npm-url]
[![Package Build][build-img]][build-url]
[![Coverage Status][coverage-img]][coverage-url]

A collection of commonly used utils for Node.js.

## Installation

```bash
npm install nuti
```

## Usage

```js
// ESM or TypeScript projects:
import nuti from 'nuti';

// CommonJS projects:
const { nuti } = require('nuti');
```

## Available utilities

1. [logger](./docs/logger.md)
2. [timeout](./docs/timeout.md)
3. [flag](./docs/flag.md)
4. [prettyOut](./docs/prettyOut.md)
5. [rand](./docs/rand.md)
6. [req](./docs/httpClient.md)

[npm-img]: https://img.shields.io/npm/v/nuti.svg
[npm-url]: https://www.npmjs.com/package/nuti
[build-img]: https://github.com/andr-ii/nuti/actions/workflows/build.yml/badge.svg
[build-url]: https://github.com/andr-ii/nuti/actions/workflows/build.yml
[coverage-img]: https://coveralls.io/repos/github/andr-ii/nuti/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/andr-ii/nuti?branch=master
