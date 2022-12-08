export enum LogType {
  Info = '[ info ]',
  Error = '[ error ]',
  Warn = '[ warn ]',
}

export const LogLabel = {
  [LogType.Info]: `\x1B[0;32m${LogType.Info}:\x1B[0m`,
  [LogType.Error]: `\x1B[0;31m${LogType.Error}:\x1B[0m`,
  [LogType.Warn]: `\x1B[0;33m${LogType.Warn}:\x1B[0m`,
};
