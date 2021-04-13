import askEntityName from './askEntityName';
import askProgLang from './askProgLang';

import { replaceWithUse } from '../utils';

import { GenerationEntities } from '../enums';
import { HookConfig } from '../interfaces';

async function askHookConfig(): Promise<HookConfig> {
  const prog = await askProgLang();
  const name = replaceWithUse(await askEntityName(GenerationEntities.Hook));

  return {
    prog,
    name,
  };
}

export default askHookConfig;
