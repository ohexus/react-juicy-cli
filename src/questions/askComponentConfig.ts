import config from '../config';
import { capitalizeFirstLetter } from '../utils';

import askEntityName from './askEntityName';
import askStyleLang from './askStyleLang';

import { Configs, GenerationEntities } from '../enums';
import { ComponentConfig } from '../interfaces';

async function askComponentConfig(): Promise<void> {
  const componentConfig = config.get(Configs.Component) as ComponentConfig;

  if (!componentConfig.name) {
    componentConfig.name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Component));
  }

  if (!componentConfig.style) {
    componentConfig.style = await askStyleLang();
  }

  config.set(Configs.Component, componentConfig);
  config.set(`${Configs.Test}.name`, componentConfig.name);
}

export default askComponentConfig;
