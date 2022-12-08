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

<p style="background-color: #151515; padding: 10px; font-family: monospace;">
  13:38:05 Dec 9 2022 <span style="color:green;">[ info ]:</span> some log </br>
  13:38:05 Dec 9 2022 <span style="color:yellow;">[ warn ]:</span> some warning </br>
  13:38:05 Dec 9 2022 <span style="color:red;">[ error ]:</span> some error </br>
  13:38:05 Dec 9 2022 <span style="color:green;">[ info ]:</span> An object </br>
  { </br>
  &nbsp  "value": 2, </br>
  &nbsp  "color": "green" </br>
  } </br>
</p>

### Write logs to a file:

Create a logger which will be writing logs to a specified file:

```ts
const logger = nuti.makeLogger({
  filePath: './log.log',
  // stdoutEnable: false - to write logs to a file only.
});

logger.info('some log');
```
