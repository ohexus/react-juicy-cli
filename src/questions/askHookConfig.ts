import { askHookName } from './askHookName';
import { askProgLang } from './askProgLang';

import { HookConfig } from '../interfaces';

export async function askHookConfig(): Promise<HookConfig> {
  const prog = await askProgLang();
  const name = await askHookName();

  return {
    prog,
    name,
  };
}
