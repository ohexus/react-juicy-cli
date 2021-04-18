import addUseWord from './addUseWord';

describe('addUseWord', () => {
  it('returns value with Context word', () => {
    const result = addUseWord('foo');

    expect(result).toEqual('useFoo');
  });
});
