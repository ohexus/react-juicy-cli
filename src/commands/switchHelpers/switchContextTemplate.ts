import { contextJsTemplate, contextTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

function switchContextTemplate(lang: ProgLangNames): typeof contextJsTemplate | typeof contextTsTemplate {
  if (lang === ProgLangNames.JS) {
    return contextJsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return contextTsTemplate;
  } else {
    return contextJsTemplate;
  }
}

export default switchContextTemplate;
