import { reducerJsTemplate, reducerTsTemplate } from '../../../templates';

import { ProgLangNames } from '../../../enums';

type ReducerTemplate = typeof reducerJsTemplate | typeof reducerTsTemplate;

export default function switchContextReducerTemplate(lang: ProgLangNames): ReducerTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return reducerJsTemplate;

    case ProgLangNames.TS:
      return reducerTsTemplate;

    default:
      return reducerTsTemplate;
  }
}
