import cssImportTemplate from './cssImportTemplate';

import { StyleLangs } from '../../enums';

describe('cssImportTemplate', () => {
  const name = 'foo';

  it('returns import string', () => {
    const ext = StyleLangs.CSS;

    const result = cssImportTemplate(name, StyleLangs.CSS);

    expect(result.includes(name) && result.includes(ext)).toBe(true);
  });

  it.each`
    lang               | expected
    ${StyleLangs.Skip} | ${''}
    ${undefined}       | ${''}
  `('returns empty string', ({ lang, expected }) => {
    expect(cssImportTemplate(name, lang)).toEqual(expected);
  });
});
