import { reducerJsTemplate, reducerTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

export function switchContextReducerTemplate(lang: ProgLangNames): typeof reducerJsTemplate | typeof reducerTsTemplate {
  if (lang === ProgLangNames.JS) {
    return reducerJsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return reducerTsTemplate;
  } else {
    return reducerJsTemplate;
  }
}
