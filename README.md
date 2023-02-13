# nuti

[![NPM version][npm-img]][npm-url]
[![Package Build][build-img]][build-url]
[![Coverage Status][coverage-img]][coverage-url]
[![GitHub][license-pic]][license-url]

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

[npm-img]: https://img.shields.io/npm/v/nuti.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/nuti
[build-img]: https://img.shields.io/github/actions/workflow/status/andr-ii/nuti/build.yml?logo=github
[build-url]: https://github.com/andr-ii/nuti/actions/workflows/build.yml
[coverage-img]: https://img.shields.io/coverallsCoverage/github/andr-ii/nuti?label=coverage&logo=jest
[coverage-url]: https://coveralls.io/github/andr-ii/nuti?branch=master
[license-pic]: https://img.shields.io/github/license/andr-ii/nuti?color=blue&label=%C2%A9%20license
[license-url]: https://github.com/andr-ii/nuti/blob/master/LICENSE
