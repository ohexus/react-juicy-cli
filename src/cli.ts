import config from './config';
import parseArgs from './parseArgs';

import { generateComponent, generateContext, generateHook, generateTest } from './commands';
import { askComponentConfig, askContextConfig, askGlobalConfig, askHookConfig, askTestConfig } from './questions';
import { greenStr, redStr, yellowStr } from './utils';

import { Configs, GenerationEntities, Quotes } from './enums';
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
      config.set(`${Configs.Global}.quotes`, Quotes.Single);
      await parseArgs(args);
    }

    const globalConfig = config.get(Configs.Global) as GlobalConfig;

    if (globalConfig.entity) {
      const { entity, skipStyles, skipTests } = globalConfig;
      const { name } = config.get(Configs[entity]) as ComponentConfig | ContextConfig | HookConfig | TestConfig;

      console.log(); // for empty line

      if (skipStyles) {
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

    process.exit(0);
  } catch (error) {
    console.log(redStr(`\n${(error as Error).message}\n`));

    process.exit(1);
  }
}
