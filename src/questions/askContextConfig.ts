import config from '../config';
import { replaceWithContext } from '../utils';

import askEntityName from './askEntityName';

import { Configs, GenerationEntities } from '../enums';
import { ContextConfig } from '../interfaces';

async function askContextConfig(): Promise<void> {
  const contextConfig = config.get(Configs.Hook) as ContextConfig;

  if (!contextConfig.name) {
    contextConfig.name = replaceWithContext(await askEntityName(GenerationEntities.Context));
  }

  config.set(Configs.Context, contextConfig);
}

export default askContextConfig;
