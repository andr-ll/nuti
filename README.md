# @andr-ll/nuti

[![Pull Request CI](https://github.com/andr-ll/nuti/actions/workflows/continuous_integration.yml/badge.svg)](https://github.com/andr-ll/nuti/actions/workflows/continuous_integration.yml)
[![Node.js Package Release](https://github.com/andr-ll/nuti/actions/workflows/release.yml/badge.svg)](https://github.com/andr-ll/nuti/actions/workflows/release.yml)

A collection of commonly used utils for Node.js.

## Installation

Make sure you have added registry configuration to `~/.npmrc` file before installation.

```bash
echo '@andr-ll:registry=https://npm.pkg.github.com' >> ~/.npmrc
```

Then install the package:

```bash
npm i @andr-ll/nuti
```

## Usage

```js
// ESM or TypeScript projects:
import nuti from '@andr-ll/nuti';

// CommonJS projects:
const { nuti } = require('@andr-ll/nuti');
```

## Available utilities

1. [logger](https://github.com/andr-ll/nuti/blob/master/docs/logger.md)
2. [timeout](https://github.com/andr-ll/nuti/blob/master/docs/timeout.md)
3. [flag](https://github.com/andr-ll/nuti/blob/master/docs/flag.md)
4. [prettyOut](https://github.com/andr-ll/nuti/blob/master/docs/prettyOut.md)
5. [rand](https://github.com/andr-ll/nuti/blob/master/docs/rand.md)
