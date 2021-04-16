import {
  enzymeComponentTemplate,
  testingLibraryComponentTemplate,
  enzymeHookTemplateJS,
  enzymeHookTemplateTS,
  testingLibraryHookTemplate,
} from '../../templates';

import { GenerationEntities, ProgLangNames, TestLibs } from '../../enums';

type ComponentTemplateTypes = typeof enzymeComponentTemplate | typeof testingLibraryComponentTemplate;
type HookTemplateTypes = typeof enzymeHookTemplateJS | typeof enzymeHookTemplateTS | typeof testingLibraryHookTemplate;

function switchTemplateForComponent(lib: TestLibs): ComponentTemplateTypes {
  if (lib === TestLibs.Enzyme) {
    return enzymeComponentTemplate;
  } else if (lib === TestLibs.TestingLibrary) {
    return testingLibraryComponentTemplate;
  }
  return enzymeComponentTemplate;
}

function switchTemplateForHook(lib: TestLibs, lang: ProgLangNames): HookTemplateTypes {
  if (lib === TestLibs.Enzyme) {
    return lang === ProgLangNames.TS ? enzymeHookTemplateTS : enzymeHookTemplateJS;
  } else if (lib === TestLibs.TestingLibrary) {
    return testingLibraryHookTemplate;
  }
  return enzymeHookTemplateTS;
}

function switchTestLib(
  lib: TestLibs,
  entity: GenerationEntities,
  lang: ProgLangNames,
): ComponentTemplateTypes | HookTemplateTypes {
  if (entity === GenerationEntities.Component) {
    return switchTemplateForComponent(lib);
  } else if (entity === GenerationEntities.Hook) {
    return switchTemplateForHook(lib, lang);
  }
  return enzymeComponentTemplate;
}

export default switchTestLib;
