import addContextWord from './addContextWord';

describe('addContextWord', () => {
  it('returns value with Context word', () => {
    const result = addContextWord('foo');

    expect(result).toEqual('FooContext');
  });
});
