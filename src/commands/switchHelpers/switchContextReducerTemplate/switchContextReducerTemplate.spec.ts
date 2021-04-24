import switchContextReducerTemplate from './switchContextReducerTemplate';

import { ProgLangNames } from '../../../enums';
import { reducerJsTemplate, reducerTsTemplate } from '../../../templates';

jest.mock('../../../templates', () => ({
  __esModule: true,
  reducerJsTemplate: jest.fn(),
  reducerTsTemplate: jest.fn(),
}));

describe('switchContextReducerTemplate', () => {
  const NAME = 'foo';

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (reducerJsTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (reducerTsTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchContextReducerTemplate(lang);

      expect(template(NAME)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchContextReducerTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME)).toEqual(mockTsTemplate);
  });
});
