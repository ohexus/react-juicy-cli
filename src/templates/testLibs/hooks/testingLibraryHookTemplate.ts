const testingLibraryHookTemplate = (
  name: string,
): string => `import { renderHook } from '@testing-library/react-hooks';

import ${name} from './${name}';

describe('${name}', () => {
  it('returns previous value', () => {
    const value = 'foo';

    const { result, rerender } = renderHook(() => ${name}(value));

    const firstResult = result.current;

    rerender('bar');

    const secondResult = result.current;

    expect(firstResult).toBeUndefined();
    expect(secondResult).toEqual(value);
  });
});
`;

export default testingLibraryHookTemplate;
