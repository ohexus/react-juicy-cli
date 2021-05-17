const testingLibraryHookTemplate = (
  name: string,
): string => `import { renderHook } from '@testing-library/react-hooks';

import ${name} from './${name}';

describe('${name}', () => {
  const FIRST_VALUE = 'foo';
  const SECOND_VALUE = 'bar';

  it('returns previous value', () => {
    const { result, rerender } = renderHook(() => ${name}(FIRST_VALUE));

    const firstResult = result.current;

    rerender(SECOND_VALUE);

    const secondResult = result.current;

    expect(firstResult).toBeUndefined();
    expect(secondResult).toEqual(FIRST_VALUE);
  });
});
`;

export default testingLibraryHookTemplate;
