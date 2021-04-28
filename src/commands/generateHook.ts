import config from '../config';
import { makeDir } from '../utils';

import { hookPromise, hookIndexPromise } from './promises';

import { Configs } from '../enums';
import { GlobalConfig, HookConfig, PromiseReturnStatus } from '../interfaces';

const getHookConfig = (): HookConfig & { prog: GlobalConfig['prog'] } => {
  const { prog } = config.get(Configs.Global) as GlobalConfig;
  const hookConfig = config.get(Configs.Hook) as HookConfig;

  return { prog, ...hookConfig };
};

async function generateHook(dirPath?: string): Promise<PromiseReturnStatus[]> {
  const { name, prog } = getHookConfig();

  const dir = dirPath ?? name;

  makeDir(dir);

  return Promise.all([hookPromise(dir, name, prog), hookIndexPromise(dir, name, prog)]);
}

export default generateHook;
