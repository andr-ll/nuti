/**
 * @description The types for `logger` utility.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

import { LogType } from './constants';

interface WriterArgs {
  time: string;
  type: LogType;
  message: string;
  contextFormatted: string;
}

export type Writer = (args: WriterArgs) => void;

export interface Context {
  [key: string]: unknown | undefined;
}

export interface LoggerOptions {
  stdoutEnable?: boolean;
  filePath?: string;
}
