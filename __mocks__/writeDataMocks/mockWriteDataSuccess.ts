export const SUCCESS = 'foo';

export function mockWriteDataSuccess(): Promise<unknown> {
  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve(SUCCESS);
    });
  });
}
