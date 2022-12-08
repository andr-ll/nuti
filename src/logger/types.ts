import { LogType } from './constants';

export interface Context {
  [key: string]: unknown | undefined;
}

export interface LoggerOptions {
  stdoutEnable?: boolean;
  filePath?: string;
}

interface WriterArgs {
  time: string;
  type: LogType;
  message: string;
  contextFormatted: string;
}

export type Writer = (args: WriterArgs) => void;
export type WriterFn = (message: string) => void;
