import fs from 'fs';
import config from '../config';

import { askTestConfig } from '../questions';
import { writeData } from '../utils';
import { switchExt, switchTestExt, switchTestLib } from './switchHelpers';

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

async function getTestConfig(): Promise<TestConfig & { prog: GlobalConfig['prog'] }> {
  const { prog } = config.get(Configs.Global) as GlobalConfig;
  const { name, lib, type } = config.get(Configs.Test) as TestConfig;

  if (!prog || !name || !lib || !type) {
    await askTestConfig();
    return await getTestConfig();
  }

  return { prog, name, lib, type };
}

async function generateTest(): Promise<PromiseReturnStatus[]> {
  const { name, prog, lib, type } = await getTestConfig();

  fs.mkdirSync(name);

  return Promise.all([testPromise(name, prog, lib, type)]);
}

export default generateTest;
