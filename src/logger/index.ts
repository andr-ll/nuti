/*!
 * @description The `logger` utility.
 * @see [docs](../../docs/logger.md)
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import * as fs from 'fs';
import { LogType, LogLabel } from './constants';
import { getTimeFormatted } from './helpers';
import { Context, LoggerOptions, Writer } from './types';

export class Logger {
  private writers: Writer[] = [];

  constructor(options: LoggerOptions = {}) {
    const { filePath, stdoutEnable = true } = options;

    if (stdoutEnable === false && filePath == null) {
      throw new Error('At least one output has to be specified!');
    }

    if (stdoutEnable != null && stdoutEnable) {
      this.createWriter(console.log);
    }

    if (typeof filePath === 'string') {
      const stream = fs.createWriteStream(filePath);
      this.createWriter(stream.write.bind(stream), true);
    }
  }

  public info(message: string, context?: Context) {
    this.writeMessages(LogType.Info, message, context);
  }

  public error(message: string, context?: Context) {
    this.writeMessages(LogType.Error, message, context);
  }

  public warn(message: string, context?: Context) {
    this.writeMessages(LogType.Warn, message, context);
  }

  private writeMessages(type: LogType, message: string, context?: Context) {
    const time = getTimeFormatted();
    const contextFormatted =
      context == null ? '' : `\n${JSON.stringify(context, null, 2)}`;

    for (const writer of this.writers) {
      writer({ time, type, message, contextFormatted });
    }
  }

  private createWriter(
    writerFn: (message: string) => void,
    isFileStream = false,
  ) {
    const writer: Writer = (args) => {
      const { time, type, message, contextFormatted } = args;

      const label = isFileStream ? `${type}:` : LogLabel[type];
      const outMessage = `${time} ${label} ${message}`;

      writerFn(`${outMessage}${contextFormatted}${isFileStream ? '\n' : ''}`);
    };

    this.writers.push(writer);
  }
}

/**
 * A function for creating a logger with ability to write file logs.
 * @see [docs](../docs/logger.md)
 *
 * @param options {@link LoggerOptions asc}
 */
export const makeLogger = (options?: LoggerOptions) => new Logger(options);
