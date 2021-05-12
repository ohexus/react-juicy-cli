import config from '../config';

import askEntityName from './askEntityName';
import askTestEntity from './askTestEntity';
import askTestLib from './askTestLib';
import askTestType from './askTestType';

import { Configs, GenerationEntities, TestLibs } from '../enums';
import { GlobalConfig, TestConfig } from '../interfaces';

async function askTestConfig(): Promise<void> {
  const { entity, skipTests } = config.get(Configs.Global) as GlobalConfig;
  const testConfig = config.get(Configs.Test) as TestConfig;

  if (skipTests) {
    return;
  }

  if (!testConfig.testEntity) {
    if (entity === GenerationEntities.Component || entity === GenerationEntities.Hook) {
      testConfig.testEntity = entity;
    } else {
      testConfig.testEntity = await askTestEntity();
    }
  }

  if (!testConfig.lib) {
    const lib = await askTestLib();

    if (lib === TestLibs.Skip) {
      config.set(`${Configs.Global}.skipTests`, true);
      return;
    }

    testConfig.lib = lib;
  }

  if (!testConfig.type) {
    testConfig.type = await askTestType();
  }

  if (!testConfig.name) {
    testConfig.name = await askEntityName(GenerationEntities.Test);
  }

  config.set(Configs.Test, testConfig);
}

export default askTestConfig;
