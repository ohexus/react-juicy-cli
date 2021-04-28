import config from '../config';

import { makeDir } from '../utils';
import { testPromise } from './promises';

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

async function generateTest(dirPath?: string): Promise<PromiseReturnStatus[] | void> {
  const { entity, lib, name, prog, skipTests, type } = getTestConfig();

  if (!skipTests) {
    const dir = dirPath ?? name;

    makeDir(dir);

    return Promise.all([testPromise(dir, name, prog, lib, type, entity)]);
  }
}

export default generateTest;
