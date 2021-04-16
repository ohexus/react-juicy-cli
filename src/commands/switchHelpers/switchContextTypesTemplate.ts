import { contextJsTypesTemplate, contextTsTypesTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

type ContextTypesTemplate = typeof contextJsTypesTemplate | typeof contextTsTypesTemplate;

function switchContextTypesTemplate(lang: ProgLangNames): ContextTypesTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return contextJsTypesTemplate;

    case ProgLangNames.TS:
      return contextTsTypesTemplate;

    default:
      return contextTsTypesTemplate;
  }
}

export default switchContextTypesTemplate;
