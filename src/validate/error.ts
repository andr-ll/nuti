import { ValidationErrorPayload } from './types';

export class ValidationError extends Error {
  constructor({
    key,
    received,
    expected,
    parentKeys,
    convertFailed,
  }: ValidationErrorPayload) {
    const item = key ? `key '${key}'` : 'array item';

    const receivedMessage =
      received === 'missing' ? 'is missing' : `has type '${received}'`;

    const keyTrace = `${
      parentKeys?.length ? ` (at '${parentKeys.join(' -> ')}')` : ''
    }.`;

    const validationMessageEnd = 'type is required' + keyTrace;
    const convertMessageEnd = 'is used' + keyTrace;

    const message = convertFailed
      ? `could not convert ${item} to '${expected}'. Invalid value of type '${received}' ${convertMessageEnd}`
      : `${item} ${receivedMessage}, but '${expected}' ${validationMessageEnd}`;

    super(`Validation failed: ${message}`);
  }
}
