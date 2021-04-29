import config from '../config';
import { makeDir } from '../utils';

import { hookPromise, hookIndexPromise } from './promises';

import { Configs } from '../enums';
import { GlobalConfig, HookConfig, PromiseReturnStatus } from '../interfaces';

const getHookConfig = (): HookConfig & { path: GlobalConfig['path']; prog: GlobalConfig['prog'] } => {
  const { path, prog } = config.get(Configs.Global) as GlobalConfig;
  const hookConfig = config.get(Configs.Hook) as HookConfig;

  return {
    path,
    prog,
    ...hookConfig,
  };
};

async function generateHook(): Promise<PromiseReturnStatus[]> {
  const { name, path, prog } = getHookConfig();

  const dir = path ?? name;

  makeDir(dir);

  return Promise.all([hookPromise(dir, name, prog), hookIndexPromise(dir, name, prog)]);
}

export default generateHook;
