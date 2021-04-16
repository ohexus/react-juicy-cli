import { componentJsTemplate, componentTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

type ComponentTemplates = typeof componentJsTemplate | typeof componentTsTemplate;

function switchComponentTemplate(lang: ProgLangNames): ComponentTemplates {
  if (lang === ProgLangNames.JS) {
    return componentJsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return componentTsTemplate;
  }
  return componentJsTemplate;
}

export default switchComponentTemplate;
