import { askEntityName } from './askEntityName';
import { askProgLang } from './askProgLang';
import { askStyleLang } from './askStyleLang';
import { askTestLib } from './askTestLib';
import { askTestType } from './askTestType';

import { capitalizeFirstLetter } from '../utils';

import { ComponentConfig } from '../interfaces';
import { GenerationEntities, StyleLangs, TestLibs } from '../enums';

export async function askComponentConfig(): Promise<ComponentConfig> {
  const prog = await askProgLang();
  const style = await askStyleLang();
  const testType = await askTestType();
  const testLib = await askTestLib();
  const name = capitalizeFirstLetter(await askEntityName(GenerationEntities.Component));

  return {
    prog,
    style,
    testLib,
    testType,
    name,
    skipStyles: style === StyleLangs.Skip,
    skipTests: testLib === TestLibs.Skip,
  };
}
