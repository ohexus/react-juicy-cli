import { contextJsTypesTemplate, contextTsTypesTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

function switchContextTypesTemplate(
  lang: ProgLangNames,
): typeof contextJsTypesTemplate | typeof contextTsTypesTemplate {
  if (lang === ProgLangNames.JS) {
    return contextJsTypesTemplate;
  } else if (lang === ProgLangNames.TS) {
    return contextTsTypesTemplate;
  } else {
    return contextJsTypesTemplate;
  }
}

export default switchContextTypesTemplate;
