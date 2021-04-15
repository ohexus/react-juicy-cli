import config from '../config';
import { replaceWithUse } from '../utils';

import askEntityName from './askEntityName';
import askProgLang from './askProgLang';

import { Configs, GenerationEntities } from '../enums';
import { GlobalConfig, HookConfig } from '../interfaces';

async function askHookConfig(): Promise<void> {
  let { prog } = config.get(Configs.Global) as GlobalConfig;
  let { name } = config.get(Configs.Hook) as HookConfig;

  if (!prog) {
    prog = await askProgLang();
  }

  if (!name) {
    name = replaceWithUse(await askEntityName(GenerationEntities.Hook));
  }

  const hookConfig = {
    name,
  };

  config.set(`${Configs.Global}.prog`, prog);
  config.set(Configs.Hook, hookConfig);
}

export default askHookConfig;
