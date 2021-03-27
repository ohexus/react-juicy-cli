import { hookJsTemplate, hookTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

export function switchHookTemplate(lang: ProgLangNames): typeof hookJsTemplate | typeof hookTsTemplate {
  if (lang === ProgLangNames.JS) {
    return hookJsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return hookTsTemplate;
  } else {
    return hookJsTemplate;
  }
}
