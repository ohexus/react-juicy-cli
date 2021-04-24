import capitalizeFirstLetter from './capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('returns capitalized foo', () => {
    const result = capitalizeFirstLetter('foo');

    expect(result).toEqual('Foo');
  });
});
