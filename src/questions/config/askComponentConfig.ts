import config from '../../config';
import { capitalizeFirstLetter } from '../../utils';

import askEntityName from '../common/askEntityName';
import askStyleLang from '../common/askStyleLang';

import { Configs, GenerationEntities, StyleLangs } from '../../enums';
import { ComponentConfig } from '../../interfaces';

async function askComponentConfig(): Promise<void> {
  const componentConfig = config.get(Configs.Component) as ComponentConfig;

  if (!componentConfig.name) {
    componentConfig.name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Component));
  }

  if (!componentConfig.style) {
    const styleLang = await askStyleLang();

    if (styleLang === StyleLangs.Skip) {
      config.set(`${Configs.Global}.skipStyles`, true);
    }

    componentConfig.style = styleLang;
  }

  config.set(Configs.Component, componentConfig);
  config.set(`${Configs.Test}.name`, componentConfig.name);
}

export default askComponentConfig;
