const testingLibraryHookTemplate = (name: string): string => `import { renderHook } from '@testing-library/react-hooks';

import ${name} from './${name}';

describe('${name}', () => {
  it('returns previous value', () => {
    const FIRST_VALUE = 'foo';

    const { result, rerender } = renderHook(() => ${name}(FIRST_VALUE));

    const firstResult = result.current;

    rerender('bar');

    const secondResult = result.current;

    expect(firstResult).toEqual(undefined);
    expect(secondResult).toEqual(FIRST_VALUE);
  });
});
`;

export default testingLibraryHookTemplate;
