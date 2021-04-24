import severalFlagsMessage from './severalFlagsMessage';

describe('severalFlagsMessage', () => {
  const AFTERWORD = 'flags can only be used separately!';

  const FIRST_FLAG = 'foo';
  const SECOND_FLAG = 'bar';
  const THIRD_FLAG = 'baz';
  const FOURTH_FLAG = 'qux';

  it('returns message with two flags', () => {
    const result = severalFlagsMessage([FIRST_FLAG, SECOND_FLAG]);

    expect(result).toEqual(`${FIRST_FLAG} and ${SECOND_FLAG} ${AFTERWORD}`);
  });

  it('returns message with three flags', () => {
    const result = severalFlagsMessage([FIRST_FLAG, SECOND_FLAG, THIRD_FLAG]);

    expect(result).toEqual(`${FIRST_FLAG}, ${SECOND_FLAG} and ${THIRD_FLAG} ${AFTERWORD}`);
  });

  it('returns message with four flags', () => {
    const result = severalFlagsMessage([FIRST_FLAG, SECOND_FLAG, THIRD_FLAG, FOURTH_FLAG]);

    expect(result).toEqual(`${FIRST_FLAG}, ${SECOND_FLAG}, ${THIRD_FLAG} and ${FOURTH_FLAG} ${AFTERWORD}`);
  });
});
