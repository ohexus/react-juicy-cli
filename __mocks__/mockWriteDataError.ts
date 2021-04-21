export default function mockWriteDataError(): Promise<unknown> {
  return new Promise(() => {
    throw new Error('bar');
  });
}
