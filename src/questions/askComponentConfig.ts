import config from '../config';
import { capitalizeFirstLetter } from '../utils';

import askEntityName from './askEntityName';
import askProgLang from './askProgLang';
import askStyleLang from './askStyleLang';

import { Configs, GenerationEntities, StyleLangs } from '../enums';
import { ComponentConfig, GlobalConfig } from '../interfaces';

async function askComponentConfig(): Promise<void> {
  let { prog } = config.get(Configs.Global) as GlobalConfig;
  let { name, style } = config.get(Configs.Component) as ComponentConfig;

  if (!prog) {
    prog = await askProgLang();
  }

  if (!name) {
    name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Component));
  }

  if (!style) {
    style = await askStyleLang();
  }

  const componentConfig = {
    name,
    style,
    skipStyles: style === StyleLangs.Skip,
  };

  config.set(`${Configs.Global}.prog`, prog);
  config.set(Configs.Component, componentConfig);
}

export default askComponentConfig;
