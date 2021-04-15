import config from '../config';
import { capitalizeFirstLetter } from '../utils';

import askEntityName from './askEntityName';
import askTestLib from './askTestLib';
import askTestType from './askTestType';

import { Configs, GenerationEntities } from '../enums';
import { GlobalConfig, TestConfig } from '../interfaces';

async function askTestConfig(): Promise<void> {
  const { skipTests } = config.get(Configs.Global) as GlobalConfig;
  const testConfig = config.get(Configs.Test) as TestConfig;

  if (skipTests) {
    return;
  }

  if (!testConfig.type) {
    testConfig.type = await askTestType();
  }

  if (!testConfig.lib) {
    testConfig.lib = await askTestLib();
  }

  if (!testConfig.name) {
    testConfig.name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Test));
  }

  config.set(Configs.Test, testConfig);
}

export default askTestConfig;
