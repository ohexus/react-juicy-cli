import fs from 'fs';
import config from '../config';

import { switchExt, switchTestExt, switchTestLib } from './switchHelpers';
import { writeData } from '../utils';

import { Configs, GenerationEntities, ProgLangNames, TestLibs, TestTypes } from '../enums';
import { GlobalConfig, TestConfig, PromiseReturnStatus } from '../interfaces';

function testPromise(
  name: string,
  lang: ProgLangNames,
  lib: TestLibs,
  type: TestTypes,
  entity: GenerationEntities,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const testExt = switchTestExt(type);
  const template = switchTestLib(lib, entity, lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${testExt}.${ext}x`, template(name, type))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

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
    fs.mkdirSync(name, { recursive: true });

    return Promise.all([testPromise(name, prog, lib, type, entity)]);
  }
}

export default generateTest;
