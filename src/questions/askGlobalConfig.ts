import config from '../config';

import askProgLang from './askProgLang';
import askQuotes from './askQuotes';
import askWhichEntity from './askWhichEntity';

import { Configs, GenerationEntities } from '../enums';
import { GlobalConfig } from '../interfaces';

async function askGlobalConfig(): Promise<void> {
  const globalConfig = config.get(Configs.Global) as GlobalConfig;

  if (!globalConfig.entity) {
    globalConfig.entity = await askWhichEntity();
  }

  if (!globalConfig.prog) {
    globalConfig.prog = await askProgLang();
  }

  if (globalConfig.entity === GenerationEntities.Component && !globalConfig.quotes) {
    globalConfig.quotes = await askQuotes();
  }

  config.set(Configs.Global, globalConfig);
}

export default askGlobalConfig;
