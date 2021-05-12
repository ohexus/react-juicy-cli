import config from '../../config';

import askPath from '../common/askPath';
import askProgLang from '../common/askProgLang';
import askQuotes from '../common/askQuotes';
import askWhichEntity from '../common/askWhichEntity';

import { Configs, GenerationEntities } from '../../enums';
import { GlobalConfig } from '../../interfaces';

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

  if (!globalConfig.path) {
    globalConfig.path = await askPath(globalConfig.entity);
  }

  config.set(Configs.Global, globalConfig);
}

export default askGlobalConfig;
