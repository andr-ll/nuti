# nuti

[![NPM][npm-img]][npm-url]
[![Build][build-img]][build-url]
[![Coverage][coverage-img]][coverage-url]
[![License][license-pic]][license-url]
[![Downloads][npm-downloads]][npm-url]

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

## Docs for available utilities

1. [logger](./docs/logger.md)
2. [timeout](./docs/timeout.md)
3. [rand](./docs/rand.md)
4. [clone](./docs/clone.md)
5. [floats](./docs/floats.md)
6. [genJSON](./docs/genJSON.md)

[npm-img]: https://img.shields.io/npm/v/nuti.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/nuti
[npm-downloads]: https://img.shields.io/npm/dt/nuti?logo=Hack%20The%20Box&logoColor=green&label=downloads
[build-img]: https://img.shields.io/github/actions/workflow/status/andr-ii/nuti/build.yml?logo=github
[build-url]: https://github.com/andr-ii/nuti/actions/workflows/build.yml
[coverage-img]: https://img.shields.io/coverallsCoverage/github/andr-ii/nuti?label=coverage&logo=jest
[coverage-url]: https://coveralls.io/github/andr-ii/nuti?branch=master
[license-pic]: https://img.shields.io/github/license/andr-ii/nuti?color=blue&label=%C2%A9%20license
[license-url]: https://github.com/andr-ii/nuti/blob/master/LICENSE
