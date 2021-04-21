export const ERROR = new Error('bar');

export function mockWriteDataError(): Promise<unknown> {
  return new Promise(() => {
    throw ERROR;
  });
}
