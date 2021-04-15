import fs from 'fs';
import config from '../config';

import { switchExt, switchTestExt, switchTestLib } from './switchHelpers';
import { writeData } from '../utils';

import { Configs, ProgLangNames, TestLibs, TestTypes } from '../enums';
import { GlobalConfig, TestConfig, PromiseReturnStatus } from '../interfaces';

function testPromise(name: string, lang: ProgLangNames, lib: TestLibs, type: TestTypes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const testExt = switchTestExt(type);
  const template = switchTestLib(lib);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${testExt}.${ext}x`, template(name, type))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

const getTestConfig = (): TestConfig & {
  prog: GlobalConfig['prog'];
  skipTests: GlobalConfig['skipTests'];
} => {
  const { prog, skipTests } = config.get(Configs.Global) as GlobalConfig;
  const { name, lib, type } = config.get(Configs.Test) as TestConfig;

  return { name, lib, prog, skipTests, type };
};

async function generateTest(): Promise<PromiseReturnStatus[] | void> {
  const { name, prog, lib, skipTests, type } = getTestConfig();

  if (!skipTests) {
    fs.mkdirSync(name, { recursive: true });

    return Promise.all([testPromise(name, prog, lib, type)]);
  }
}

export default generateTest;
