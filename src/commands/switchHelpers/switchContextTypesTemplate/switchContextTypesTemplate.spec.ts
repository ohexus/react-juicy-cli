import { contextJsTypesTemplate, contextTsTypesTemplate } from '../../../templates';
import switchContextTypesTemplate from './switchContextTypesTemplate';

import { ProgLangNames } from '../../../enums';

jest.mock('../../../templates', () => ({
  __esModule: true,
  contextJsTypesTemplate: jest.fn(),
  contextTsTypesTemplate: jest.fn(),
}));

describe('switchContextTypesTemplate', () => {
  const NAME = 'foo';

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (contextJsTypesTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (contextTsTypesTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchContextTypesTemplate(lang);

      expect(template(NAME)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchContextTypesTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME)).toEqual(mockTsTemplate);
  });
});
