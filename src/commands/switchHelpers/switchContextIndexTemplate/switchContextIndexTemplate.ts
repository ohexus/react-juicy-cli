import { contextIndexJsTemplate, contextIndexTsTemplate } from '../../../templates';

import { ProgLangNames } from '../../../enums';

type ContextIndexTemplate = typeof contextIndexJsTemplate | typeof contextIndexTsTemplate;

function switchContextIndexTemplate(lang: ProgLangNames): ContextIndexTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return contextIndexJsTemplate;

    case ProgLangNames.TS:
      return contextIndexTsTemplate;

    default:
      return contextIndexTsTemplate;
  }
}

export default switchContextIndexTemplate;
