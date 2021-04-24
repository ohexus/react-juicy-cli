import switchHookTemplate from './switchHookTemplate';

import { ProgLangNames } from '../../../enums';
import { hookJsTemplate, hookTsTemplate } from '../../../templates';

jest.mock('../../../templates', () => ({
  __esModule: true,
  hookJsTemplate: jest.fn(),
  hookTsTemplate: jest.fn(),
}));

describe('switchHookTemplate', () => {
  const NAME = 'foo';

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (hookJsTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (hookTsTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchHookTemplate(lang);

      expect(template(NAME)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchHookTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME)).toEqual(mockTsTemplate);
  });
});
