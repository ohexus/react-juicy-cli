import { contextIndexJsTemplate, contextIndexTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

type ContextIndexTemplates = typeof contextIndexJsTemplate | typeof contextIndexTsTemplate;

function switchContextIndexTemplate(lang: ProgLangNames): ContextIndexTemplates {
  if (lang === ProgLangNames.JS) {
    return contextIndexJsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return contextIndexTsTemplate;
  }
  return contextIndexJsTemplate;
}

export default switchContextIndexTemplate;
