export const log = (...args: unknown[]): void => {
  for (const arg of args) {
    if (typeof arg === 'function') {
      continue;
    }

    const isPrimitive = typeof arg !== 'object';
    const dataToLog = isPrimitive ? arg : JSON.stringify(arg, null, 2);

    console.log(dataToLog);
  }
};
