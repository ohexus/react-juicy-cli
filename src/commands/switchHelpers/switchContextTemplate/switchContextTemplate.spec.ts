import switchContextTemplate from './switchContextTemplate';

import { ProgLangNames } from '../../../enums';
import { contextJsTemplate, contextTsTemplate } from '../../../templates';

jest.mock('../../../templates', () => ({
  __esModule: true,
  contextJsTemplate: jest.fn(),
  contextTsTemplate: jest.fn(),
}));

describe('switchContextTemplate', () => {
  const NAME = 'foo';

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (contextJsTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (contextTsTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchContextTemplate(lang);

      expect(template(NAME)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchContextTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME)).toEqual(mockTsTemplate);
  });
});
