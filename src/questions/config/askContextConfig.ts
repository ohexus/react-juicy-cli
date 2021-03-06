import config from '../../config';
import { capitalizeFirstLetter } from '../../utils';

import askEntityName from '../common/askEntityName';

import { Configs, GenerationEntities } from '../../enums';
import { ContextConfig } from '../../interfaces';

async function askContextConfig(): Promise<void> {
  const contextConfig = config.get(Configs.Context) as ContextConfig;

  if (!contextConfig.name) {
    contextConfig.name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Context));
  }

  config.set(Configs.Context, contextConfig);
}

export default askContextConfig;
