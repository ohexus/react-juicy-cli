import switchContextProviderTemplate from './switchContextProviderTemplate';

import { ProgLangNames } from '../../../enums';
import { providerJsTemplate, providerTsTemplate } from '../../../templates';

jest.mock('../../../templates', () => ({
  __esModule: true,
  providerJsTemplate: jest.fn(),
  providerTsTemplate: jest.fn(),
}));

describe('switchContextProviderTemplate', () => {
  const NAME = 'foo';

  const mockJsTemplate = 'foo';
  const mockTsTemplate = 'bar';

  beforeEach(() => {
    (providerJsTemplate as jest.Mock).mockImplementation(() => mockJsTemplate);
    (providerTsTemplate as jest.Mock).mockImplementation(() => mockTsTemplate);
  });

  it('switches template', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const TEMPLATES = [mockJsTemplate, mockTsTemplate];

    LANGS.forEach((lang, index) => {
      const template = switchContextProviderTemplate(lang);

      expect(template(NAME)).toEqual(TEMPLATES[index]);
    });
  });

  it('returns default template', () => {
    const template = switchContextProviderTemplate(('foo' as unknown) as ProgLangNames);

    expect(template(NAME)).toEqual(mockTsTemplate);
  });
});
