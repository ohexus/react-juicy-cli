import { config } from './config';
import { parseArgs } from './parseArgs';

import { generateComponent, generateHook } from './commands';
import { askComponentConfig, askHookConfig, askWhichEntity } from './questions';
import { chalkColored } from './utils';

import { GenerationEntities } from './enums';

export default async function cli(argv: string[]): Promise<void> {
  try {
    config.clear();

    const args = argv.slice(2);

    if (!args.length) {
      const entity = await askWhichEntity();

      if (entity === GenerationEntities.Component) {
        config.set(GenerationEntities.Component, await askComponentConfig());
      } else if (entity === GenerationEntities.Hook) {
        config.set(GenerationEntities.Hook, await askHookConfig());
      }
    } else {
      parseArgs(args);
    }

    if (config.has(GenerationEntities.Component)) {
      await generateComponent();
    } else if (config.has(GenerationEntities.Hook)) {
      await generateHook();
    }

    console.log(chalkColored('DONE', 'Green'));
  } catch (error) {
    console.log(chalkColored(`\n${error.message}\n`, 'Red'));

    process.exit(1);
  }
}
