import config from '../../config';

import { yellowStr, greenStr } from '../chalkColored';

import { Configs, GenerationEntities } from '../../enums';
import { GlobalConfig, ComponentConfig, ContextConfig, HookConfig, TestConfig } from '../../interfaces';

export default function printAfterword(): void {
  const globalConfig = config.get(Configs.Global) as GlobalConfig;

  if (globalConfig.entity) {
    const { entity, skipStyles, skipTests } = globalConfig;
    const { name } = config.get(Configs[entity]) as ComponentConfig | ContextConfig | HookConfig | TestConfig;

    console.log(); // for empty line

    if (entity === GenerationEntities.Component && skipStyles) {
      console.log(yellowStr('Styles generation skipped.'));
    }

    if (skipTests) {
      console.log(yellowStr('Tests generation skipped.'));
    }

    if (!(entity === GenerationEntities.Test && skipTests)) {
      if (skipTests || skipStyles) {
        console.log(); // for empty line
      }

      console.log(greenStr(`${entity} ${name} generated successfully!\n`));
    }
  }
}
