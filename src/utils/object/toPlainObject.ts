export const toPlainObject = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;
