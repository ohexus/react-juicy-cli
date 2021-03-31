import clear from 'clear';

import { config } from './config';
import { parseArgs } from './parseArgs';

import { generateComponent, generateContext, generateHook } from './commands';
import { askComponentConfig, askContextConfig, askHookConfig, askQuotes, askWhichEntity } from './questions';
import { chalkColored } from './utils';

import { Configs, GenerationEntities } from './enums';

export default async function cli(argv: string[]): Promise<void> {
  try {
    config.clear();

    const args = argv.slice(2);

    if (!args.length) {
      const quotes = await askQuotes();

      config.set(Configs.Global, { quotes });

      const entity = await askWhichEntity();

      if (entity === GenerationEntities.Component) {
        config.set(Configs.Component, await askComponentConfig());
        await generateComponent();
      } else if (entity === GenerationEntities.Context) {
        config.set(Configs.Context, await askContextConfig());
        await generateContext();
      } else if (entity === GenerationEntities.Hook) {
        config.set(Configs.Hook, await askHookConfig());
        await generateHook();
      }

      clear();
    } else {
      parseArgs(args);
    }

    process.exit(0);
  } catch (error) {
    console.log(chalkColored(`\n${error.message}\n`, 'Red'));

    process.exit(1);
  }
}
