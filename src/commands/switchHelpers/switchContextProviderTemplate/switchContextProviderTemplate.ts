import { providerJsTemplate, providerTsTemplate } from '../../../templates';

import { ProgLangNames } from '../../../enums';

type ProviderTemplate = typeof providerJsTemplate | typeof providerTsTemplate;

export default function switchContextProviderTemplate(lang: ProgLangNames): ProviderTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return providerJsTemplate;

    case ProgLangNames.TS:
      return providerTsTemplate;

    default:
      return providerTsTemplate;
  }
}
