import config from './config';
import parseArgs from './parseArgs';

import { generateComponent, generateContext, generateHook } from './commands';
import { askComponentConfig, askContextConfig, askHookConfig, askQuotes, askWhichEntity } from './questions';
import { chalkColored } from './utils';

import { Configs, GenerationEntities } from './enums';
import { GlobalConfig } from './interfaces';

export default async function cli(argv: string[]): Promise<void> {
  try {
    config.clear();

    const args = argv.slice(2);

    if (!args.length) {
      const quotes = await askQuotes();

      const entity = await askWhichEntity();

      config.set(Configs.Global, { entity, quotes });

      if (entity === GenerationEntities.Component) {
        const componentConfig = await askComponentConfig();

        config.set(Configs.Component, componentConfig);
        config.set(`${Configs.Global}.name`, { name: componentConfig.name });

        await generateComponent();
      } else if (entity === GenerationEntities.Context) {
        const contextConfig = await askContextConfig();

        config.set(Configs.Context, contextConfig);
        config.set(`${Configs.Global}.name`, { name: contextConfig.name });

        await generateContext();
      } else if (entity === GenerationEntities.Hook) {
        const hookConfig = await askHookConfig();

        config.set(Configs.Hook, hookConfig);
        config.set(`${Configs.Global}.name`, hookConfig.name);

        await generateHook();
      }
    } else {
      await parseArgs(args);
    }

    const globalConfig = config.get(Configs.Global) as GlobalConfig;

    if (globalConfig) {
      const { entity, name } = globalConfig;

      console.log(chalkColored(`\n${entity} ${name} generated successfully!\n`, 'Green'));
    }

    process.exit(0);
  } catch (error) {
    console.log(chalkColored(`\n${(error as Error).message}\n`, 'Red'));

    process.exit(1);
  }
}
