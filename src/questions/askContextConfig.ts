import config from '../config';
import { replaceWithContext } from '../utils';

import askEntityName from './askEntityName';
import askProgLang from './askProgLang';

import { Configs, GenerationEntities } from '../enums';
import { ContextConfig, GlobalConfig } from '../interfaces';

async function askContextConfig(): Promise<void> {
  let { prog } = config.get(Configs.Global) as GlobalConfig;
  let { name } = config.get(Configs.Hook) as ContextConfig;

  if (!prog) {
    prog = await askProgLang();
  }

  if (!name) {
    name = replaceWithContext(await askEntityName(GenerationEntities.Context));
  }

  const contextConfig = {
    name,
  };

  config.set(`${Configs.Global}.prog`, prog);
  config.set(Configs.Context, contextConfig);
}

export default askContextConfig;
