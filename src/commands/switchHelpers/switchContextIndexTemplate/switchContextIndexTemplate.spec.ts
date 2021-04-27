import { contextIndexJsTemplate, contextIndexTsTemplate } from '../../../templates';
import switchContextIndexTemplate from './switchContextIndexTemplate';

import { ProgLangNames } from '../../../enums';

jest.mock('../../../templates', () => ({
  __esModule: true,
  contextIndexJsTemplate: jest.fn(),
  contextIndexTsTemplate: jest.fn(),
}));

describe('switchContextIndexTemplate', () => {
  const NAME = 'foo';

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (contextIndexJsTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (contextIndexTsTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchContextIndexTemplate(lang);

      expect(template(NAME)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchContextIndexTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME)).toEqual(mockTsTemplate);
  });
});
