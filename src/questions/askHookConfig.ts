import config from '../config';

import askEntityName from './askEntityName';

import { Configs, GenerationEntities } from '../enums';
import { HookConfig } from '../interfaces';

async function askHookConfig(): Promise<void> {
  const hookConfig = config.get(Configs.Hook) as HookConfig;

  if (!hookConfig.name) {
    hookConfig.name = await askEntityName(GenerationEntities.Hook);
  }

  config.set(Configs.Hook, hookConfig);
}

export default askHookConfig;
