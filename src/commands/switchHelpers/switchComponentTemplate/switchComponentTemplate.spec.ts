import { componentJsTemplate, componentTsTemplate } from '../../../templates';
import switchComponentTemplate from './switchComponentTemplate';

import { ProgLangNames, Quotes, StyleLangs } from '../../../enums';

jest.mock('../../../templates', () => ({
  __esModule: true,
  componentJsTemplate: jest.fn(),
  componentTsTemplate: jest.fn(),
}));

describe('switchComponentTemplate', () => {
  const NAME = 'foo';
  const STYLE = ('bar' as unknown) as StyleLangs;
  const QUOTES = ('baz' as unknown) as Quotes;

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (componentJsTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (componentTsTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchComponentTemplate(lang);

      expect(template(NAME, STYLE, QUOTES)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchComponentTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME, STYLE, QUOTES)).toEqual(mockTsTemplate);
  });
});
