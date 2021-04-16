import config from '../config';

import { testPromise } from './generationPromises';
import { makeDir } from '../utils';

import { Configs } from '../enums';
import { GlobalConfig, TestConfig, PromiseReturnStatus } from '../interfaces';

const getTestConfig = (): TestConfig & {
  entity: GlobalConfig['entity'];
  prog: GlobalConfig['prog'];
  skipTests: GlobalConfig['skipTests'];
} => {
  const { entity, prog, skipTests } = config.get(Configs.Global) as GlobalConfig;
  const testConfig = config.get(Configs.Test) as TestConfig;

  return { entity, prog, skipTests, ...testConfig };
};

async function generateTest(): Promise<PromiseReturnStatus[] | void> {
  const { entity, lib, name, prog, skipTests, type } = getTestConfig();

  if (!skipTests) {
    makeDir(name);

    return Promise.all([testPromise(name, prog, lib, type, entity)]);
  }
}

export default generateTest;
