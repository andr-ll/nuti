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
