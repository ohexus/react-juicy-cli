import config from '../config';
import askEntityName from './askEntityName';
import askProgLang from './askProgLang';
import askTestLib from './askTestLib';
import askTestType from './askTestType';

import { capitalizeFirstLetter } from '../utils';

import { Configs, GenerationEntities } from '../enums';
import { GlobalConfig, TestConfig } from '../interfaces';

async function askTestConfig(): Promise<void> {
  let { name, lib, type } = config.get(Configs.Test) as TestConfig;

  const globalConfig = config.get(Configs.Global) as GlobalConfig;
  const { skipTests } = globalConfig;
  let { prog } = globalConfig;

  if (skipTests) {
    return;
  }

  if (!prog) {
    prog = await askProgLang();
  }

  if (!type) {
    type = await askTestType();
  }

  if (!lib) {
    lib = await askTestLib();
  }

  if (!name) {
    name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Test));
  }

  const testConfig = {
    type,
    lib,
    name,
  };

  config.set(`${Configs.Global}.prog`, prog);
  config.set(Configs.Test, testConfig);
}

export default askTestConfig;
