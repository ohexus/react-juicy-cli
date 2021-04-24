import config from './config';

import { askAndGenerate, parseArgs, greenStr, redStr, yellowStr } from './utils';

import { Configs, GenerationEntities, Quotes } from './enums';
import { ComponentConfig, ContextConfig, GlobalConfig, HookConfig, TestConfig } from './interfaces';

export default async function cli(argv: string[]): Promise<void> {
  try {
    const args = argv.slice(2);

    if (!args.length) {
      await askAndGenerate();
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
