import { jsTemplate, tsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

export function switchComponentTemplate(lang: ProgLangNames): typeof jsTemplate | typeof tsTemplate {
  if (lang === ProgLangNames.JS) {
    return jsTemplate;
  } else if (lang === ProgLangNames.TS) {
    return tsTemplate;
  } else {
    return jsTemplate;
  }
}
