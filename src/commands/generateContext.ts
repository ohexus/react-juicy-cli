import config from '../config';
import { makeDir } from '../utils';

import {
  contextPromise,
  contextTypesPromise,
  contextIndexPromise,
  providerPromise,
  reducerPromise,
} from './promises';

import { Configs } from '../enums';
import { ContextConfig, GlobalConfig, PromiseReturnStatus } from '../interfaces';

const getContextConfig = (): ContextConfig & {
  path: GlobalConfig['path'];
  prog: GlobalConfig['prog'];
} => {
  const { path, prog } = config.get(Configs.Global) as GlobalConfig;
  const contextConfig = config.get(Configs.Context) as ContextConfig;

  return {
    path,
    prog,
    ...contextConfig,
  };
};

async function generateContext(): Promise<PromiseReturnStatus[]> {
  const { name, path, prog } = getContextConfig();

  const dir = path ?? name;

  makeDir(dir);

  return Promise.all([
    contextPromise(dir, name, prog),
    contextTypesPromise(dir, name, prog),
    contextIndexPromise(dir, name, prog),
    providerPromise(dir, name, prog),
    reducerPromise(dir, name, prog),
  ]);
}

export default generateContext;
