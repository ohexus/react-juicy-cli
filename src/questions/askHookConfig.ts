import { askEntityName } from './askEntityName';
import { askProgLang } from './askProgLang';

import { replaceWithUse } from '../utils';

import { HookConfig } from '../interfaces';
import { GenerationEntities } from '../enums';

export async function askHookConfig(): Promise<HookConfig> {
  const prog = await askProgLang();
  const name = replaceWithUse(await askEntityName(GenerationEntities.Hook));

  return {
    prog,
    name,
  };
}
