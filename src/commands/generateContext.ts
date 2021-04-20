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

const getContextConfig = (): ContextConfig & { prog: GlobalConfig['prog'] } => {
  const { prog } = config.get(Configs.Global) as GlobalConfig;
  const contextConfig = config.get(Configs.Context) as ContextConfig;

  return { prog, ...contextConfig };
};

async function generateContext(): Promise<PromiseReturnStatus[]> {
  const { name, prog } = getContextConfig();

  makeDir(name);

  return Promise.all([
    contextPromise(name, prog),
    contextTypesPromise(name, prog),
    contextIndexPromise(name, prog),
    providerPromise(name, prog),
    reducerPromise(name, prog),
  ]);
}

export default generateContext;
