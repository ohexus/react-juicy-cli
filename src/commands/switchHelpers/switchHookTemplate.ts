import { hookJsTemplate, hookTsTemplate } from '../../templates';

import { ProgLangNames } from '../../enums';

type HookTemplate = typeof hookJsTemplate | typeof hookTsTemplate;

function switchHookTemplate(lang: ProgLangNames): HookTemplate {
  switch (lang) {
    case ProgLangNames.JS:
      return hookJsTemplate;

    case ProgLangNames.TS:
      return hookTsTemplate;

    default:
      return hookTsTemplate;
  }
}

export default switchHookTemplate;
