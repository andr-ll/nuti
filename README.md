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

<!-- TODO: Add documentation about utils. -->

1. [logger](./docs/logger.md)
2. timeout
3. log
