import * as fs from 'fs';
import * as Types from './types';
import { LogType, LogLabel } from './constants';
import { getTimeFormatted } from './helpers';

export const makeLogger = (options: Types.LoggerOptions = {}) => {
  const writers: Types.Writer[] = [];
  const { filePath, stdoutEnable = true } = options;

  if (stdoutEnable === false && filePath == null) {
    throw new Error('At least one output has to be specified!');
  }

  if (stdoutEnable != null && stdoutEnable) {
    createWriter(console.log);
  }

  if (typeof filePath === 'string') {
    const stream = fs.createWriteStream(filePath);
    createWriter(stream.write.bind(stream), true);
  }

  const info = (message: string, context?: Types.Context) => {
    writeMessages(LogType.Info, message, context);
  };

  const error = (message: string, context?: Types.Context) => {
    writeMessages(LogType.Error, message, context);
  };

  const warn = (message: string, context?: Types.Context) => {
    writeMessages(LogType.Warn, message, context);
  };

  function writeMessages(
    type: LogType,
    message: string,
    context?: Types.Context,
  ) {
    const time = getTimeFormatted();
    const contextFormatted =
      context == null ? '' : `${JSON.stringify(context, null, 2)}\n`;

    for (const writer of writers) {
      writer({ time, type, message, contextFormatted });
    }
  }

  function createWriter(writerFn: Types.WriterFn, isFileStream = false) {
    const writer: Types.Writer = (args) => {
      const { time, type, message, contextFormatted } = args;

      const label = isFileStream ? `${type}:` : LogLabel[type];
      const outMessage = `${time} ${label} ${message}${
        isFileStream ? '\n' : ''
      }`;

      writerFn(`${outMessage}${contextFormatted}`);
    };

    writers.push(writer);
  }

  return {
    info,
    warn,
    error,
  };
};
