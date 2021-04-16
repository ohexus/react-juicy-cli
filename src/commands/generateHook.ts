import config from '../config';
import { makeDir } from '../utils';

import { hookPromise, hookIndexPromise } from './generationPromises';

import { Configs } from '../enums';
import { GlobalConfig, HookConfig, PromiseReturnStatus } from '../interfaces';

const getHookConfig = (): HookConfig & { prog: GlobalConfig['prog'] } => {
  const { prog } = config.get(Configs.Global) as GlobalConfig;
  const hookConfig = config.get(Configs.Hook) as HookConfig;

  return { prog, ...hookConfig };
};

async function generateHook(): Promise<PromiseReturnStatus[]> {
  const { name, prog } = getHookConfig();

  makeDir(name);

  return Promise.all([hookPromise(name, prog), hookIndexPromise(name, prog)]);
}

export default generateHook;
