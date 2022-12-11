## Description

A simple js/ts logger with following features:

- `info`, `error` and `warn` type logs
- standard console output
- file output
- additional json context
- timestamp for each log

## Usage

### Standard:

Create a default logger which will be writing logs to console:

```ts
const logger = nuti.makeLogger();

// Print logs to console:
logger.info('some log');
logger.warn('some warning');
logger.error('some error');

// Add stringified objects as an additional context:
logger.info('An object', {
  value: 2,
  color: 'green',
});
```

Output:

> **Note**
>
> Labels will have colorful output in console:
>
> $\textsf{\color[RGB]{0,128,0} [\ info\ ]:}$ > $\textsf{\color[RGB]{225,225,0} [\ warn\ ]:}$ > $\textsf{\color[RGB]{225,0,0} [\ error\ ]:}$

```log
13:38:05 Dec 9 2022 [ info ]: some log
13:38:05 Dec 9 2022 [ warn ]: some warning
13:38:05 Dec 9 2022 [ error ]: some error
13:38:05 Dec 9 2022 [ info ]: An object
{
  "value": 2,
  "color": "green"
}
```

### Write logs to a file:

Create a logger which will be writing logs to a specified file:

```ts
const logger = nuti.makeLogger({
  filePath: './log.log',
  // stdoutEnable: false - to write logs to a file only.
});

logger.info('some log');
```
