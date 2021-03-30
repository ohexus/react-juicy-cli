import { askEntityName } from './askEntityName';
import { askProgLang } from './askProgLang';
import { askStyleLang } from './askStyleLang';
import { askTestLib } from './askTestLib';

import { capitalizeFirstLetter } from '../utils';

import { ComponentConfig } from '../interfaces';
import { GenerationEntities, StyleLangNames, TestLibNames } from '../enums';

export async function askComponentConfig(): Promise<ComponentConfig> {
  const prog = await askProgLang();
  const style = await askStyleLang();
  const testLib = await askTestLib();
  const name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Component));

  return {
    prog,
    style,
    testLib,
    name,
    skipStyles: style === StyleLangNames.SKIP,
    skipTests: testLib === TestLibNames.SKIP,
  };
}
