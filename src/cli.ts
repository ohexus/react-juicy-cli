import config from './config';
import parseArgs from './parseArgs';

import { generateComponent, generateContext, generateHook, generateTest } from './commands';
import { askComponentConfig, askContextConfig, askGlobalConfig, askHookConfig, askTestConfig } from './questions';
import { chalkColored } from './utils';

import { Configs, GenerationEntities } from './enums';
import { ComponentConfig, ContextConfig, GlobalConfig, HookConfig, TestConfig } from './interfaces';

export default async function cli(argv: string[]): Promise<void> {
  try {
    const args = argv.slice(2);

    if (!args.length) {
      await askGlobalConfig();

      const { entity } = config.get(Configs.Global) as GlobalConfig;

      if (entity === GenerationEntities.Component) {
        await askComponentConfig();
        await askTestConfig();

        await generateComponent();
        await generateTest();
      } else if (entity === GenerationEntities.Context) {
        await askContextConfig();
        await generateContext();
      } else if (entity === GenerationEntities.Hook) {
        await askHookConfig();
        await generateHook();
      } else if (entity === GenerationEntities.Test) {
        await askTestConfig();
        await generateTest();
      }
    } else {
      await parseArgs(args);
    }

    const globalConfig = config.get(Configs.Global) as GlobalConfig;

    if (globalConfig.entity) {
      const { entity, skipStyles, skipTests } = globalConfig;
      const { name } = config.get(Configs[entity]) as ComponentConfig | ContextConfig | HookConfig | TestConfig;

      console.log(); // for empty line

      if (skipStyles) {
        console.log(chalkColored('Styles generation skipped.', 'Yellow'));
      }

      if (skipTests) {
        console.log(chalkColored('Tests generation skipped.', 'Yellow'));
      }

      if (!(entity === GenerationEntities.Test && skipTests)) {
        if (skipTests || skipStyles) {
          console.log(); // for empty line
        }

        console.log(chalkColored(`${entity} ${name} generated successfully!\n`, 'Green'));
      }
    }

    process.exit(0);
  } catch (error) {
    console.log(chalkColored(`\n${(error as Error).message}\n`, 'Red'));

    process.exit(1);
  }
}
