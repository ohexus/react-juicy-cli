import { providerJsTemplate, providerTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

export function switchContextProviderTemplate(
  lang: ProgLangNames,
): typeof providerJsTemplate | typeof providerTsTemplate {
  if (lang === ProgLangNames.JS) {
    return providerJsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return providerTsTemplate;
  } else {
    return providerJsTemplate;
  }
}
