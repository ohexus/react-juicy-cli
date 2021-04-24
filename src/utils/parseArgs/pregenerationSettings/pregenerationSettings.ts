import config from '../../../config';

import capitalizeFirstLetter from '../../capitalizeFirstLetter';
import { askGlobalConfig } from '../../../questions';

import { Configs, GenerationEntities } from '../../../enums';
import { ComponentConfig, ContextConfig, HookConfig, TestConfig } from '../../../interfaces';

export default async function pregenerationSettings(
  entity: GenerationEntities,
  entityConfig: ComponentConfig | ContextConfig | HookConfig | TestConfig,
): Promise<void> {
  if (entity !== GenerationEntities.Hook) {
    entityConfig.name = capitalizeFirstLetter(entityConfig.name);
  }

  config.set(`${Configs.Global}.entity`, entity);
  config.set(Configs[entity], entityConfig);

  await askGlobalConfig();
}
