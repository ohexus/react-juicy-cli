import { providerJsTemplate, providerTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

type ProviderTemplate = typeof providerJsTemplate | typeof providerTsTemplate;

function switchContextProviderTemplate(lang: ProgLangNames): ProviderTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return providerJsTemplate;

    case ProgLangNames.TS:
      return providerTsTemplate;

    default:
      return providerTsTemplate;
  }
}

export default switchContextProviderTemplate;
