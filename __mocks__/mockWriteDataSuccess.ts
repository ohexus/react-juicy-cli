export default function mockWriteDataSuccess(): Promise<unknown> {
  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve('foo');
    });
  });
}
