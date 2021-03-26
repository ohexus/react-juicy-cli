import { askComponentName } from './askComponentName';
import { askProgLang } from './askProgLang';
import { askStyleLang } from './askStyleLang';
import { askTestLib } from './askTestLib';

import { ComponentConfig } from '../interfaces';

export async function askComponentConfig(): Promise<ComponentConfig> {
  const prog = await askProgLang();
  const style = await askStyleLang();
  const testLib = await askTestLib();
  const name = await askComponentName();

  return {
    prog,
    style,
    testLib,
    name,
  };
}
