import { askEntityName } from './askEntityName';
import { askProgLang } from './askProgLang';

import { replaceWithContext } from '../utils';

import { ContextConfig } from '../interfaces';
import { GenerationEntities } from '../enums';

export async function askContextConfig(): Promise<ContextConfig> {
  const prog = await askProgLang();
  const name = replaceWithContext(await askEntityName(GenerationEntities.Context));

  return {
    prog,
    name,
  };
}
