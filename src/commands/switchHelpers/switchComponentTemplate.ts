import { componentJsTemplate, componentTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

type ComponentTemplate = typeof componentJsTemplate | typeof componentTsTemplate;

function switchComponentTemplate(lang: ProgLangNames): ComponentTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return componentJsTemplate;

    case ProgLangNames.TS:
      return componentTsTemplate;

    default:
      return componentTsTemplate;
  }
}

export default switchComponentTemplate;
