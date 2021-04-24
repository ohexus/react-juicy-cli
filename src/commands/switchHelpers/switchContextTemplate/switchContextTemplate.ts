import { contextJsTemplate, contextTsTemplate } from '../../../templates';

import { ProgLangNames } from '../../../enums';

type ContextTemplate = typeof contextJsTemplate | typeof contextTsTemplate;

export default function switchContextTemplate(lang: ProgLangNames): ContextTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return contextJsTemplate;

    case ProgLangNames.TS:
      return contextTsTemplate;

    default:
      return contextTsTemplate;
  }
}
