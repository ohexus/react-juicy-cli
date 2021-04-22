import config from '../config';
import { addContextWord } from '../utils';

import askEntityName from './askEntityName';

import { Configs, GenerationEntities } from '../enums';
import { ContextConfig } from '../interfaces';

async function askContextConfig(): Promise<void> {
  const contextConfig = config.get(Configs.Context) as ContextConfig;

  if (!contextConfig.name) {
    contextConfig.name = addContextWord(await askEntityName(GenerationEntities.Context));
  }

  config.set(Configs.Context, contextConfig);
}

export default askContextConfig;
