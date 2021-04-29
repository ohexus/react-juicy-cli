import {
  enzymeComponentTemplate,
  testingLibraryComponentTemplate,
  enzymeHookJsTemplate,
  enzymeHookTsTemplate,
  testingLibraryHookTemplate,
} from '../../../templates';

import { GenerationEntities, ProgLangNames, TestLibs } from '../../../enums';

type ComponentTemplate = typeof enzymeComponentTemplate | typeof testingLibraryComponentTemplate;
type HookTemplate =
  | typeof enzymeHookJsTemplate
  | typeof enzymeHookTsTemplate
  | typeof testingLibraryHookTemplate;

export function switchTemplateForComponent(lib: TestLibs): ComponentTemplate {
  switch (lib) {
    case TestLibs.TestingLibrary:
      return testingLibraryComponentTemplate;

    case TestLibs.Enzyme:
      return enzymeComponentTemplate;

    default:
      return enzymeComponentTemplate;
  }
}

export function switchTemplateForHook(lib: TestLibs, lang: ProgLangNames): HookTemplate {
  switch (lib) {
    case TestLibs.TestingLibrary:
      return testingLibraryHookTemplate;

    case TestLibs.Enzyme:
      return lang === ProgLangNames.TS ? enzymeHookTsTemplate : enzymeHookJsTemplate;

    default:
      return enzymeHookTsTemplate;
  }
}

export default function switchTestLibTemplate(
  lib: TestLibs,
  entity: GenerationEntities,
  lang: ProgLangNames,
): ComponentTemplate | HookTemplate {
  switch (entity) {
    case GenerationEntities.Component:
      return switchTemplateForComponent(lib);

    case GenerationEntities.Hook:
      return switchTemplateForHook(lib, lang);

    default:
      return enzymeComponentTemplate;
  }
}
