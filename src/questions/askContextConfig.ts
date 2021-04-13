import askEntityName from './askEntityName';
import askProgLang from './askProgLang';

import { replaceWithContext } from '../utils';

import { GenerationEntities } from '../enums';
import { ContextConfig } from '../interfaces';

async function askContextConfig(): Promise<ContextConfig> {
  const prog = await askProgLang();
  const name = replaceWithContext(await askEntityName(GenerationEntities.Context));

  return {
    prog,
    name,
  };
}

export default askContextConfig;
