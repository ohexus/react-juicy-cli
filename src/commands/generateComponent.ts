import fs from 'fs';
import { config } from '../config';

import { askProgLang, askStyleLang, askTestLib, askEntityName, askTestType } from '../questions';
import { switchComponentTemplate, switchExt, switchTestExt, switchTestLib } from './switchHelpers';
import { indexTemplate, sassTemplate, cssTemplate } from '../templates';
import { capitalizeFirstLetter, writeData } from '../utils';

import { Configs, GenerationEntities, ProgLangNames, Quotes, StyleLangs, TestLibs, TestTypes } from '../enums';
import { ComponentConfig, PromiseReturnStatus } from '../interfaces';

function componentPromise(
  name: string,
  lang: ProgLangNames,
  sslang: StyleLangs,
  quotes: Quotes,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchComponentTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}x`, template(name, sslang, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function indexPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/index.${ext}`, indexTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function styleSheetPromise(name: string, lang: StyleLangs): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${lang}`, (lang === StyleLangs.SASS ? sassTemplate : cssTemplate)(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

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

async function getComponentConfig(): Promise<ComponentConfig> {
  const { name, prog, style, testLib, testType, skipStyles, skipTests } = config.get(Configs.Component);

  let newProg = '';
  if (!prog) {
    newProg = await askProgLang();
  }

  let newStyle = '';
  if (!skipStyles && !style) {
    newStyle = await askStyleLang();
  }

  let newTestType = '';
  if (!skipTests && !testType) {
    newTestType = await askTestType();
  }

  let newTestLib = '';
  if (!skipTests && !testLib) {
    newTestLib = await askTestLib();
  }

  let newName = '';
  if (!name) {
    newName = capitalizeFirstLetter(await askEntityName(GenerationEntities.Component));
  }

  const options: ComponentConfig = {
    prog: prog || newProg,
    style: style || newStyle,
    testLib: testLib || newTestLib,
    testType: testType || newTestType,
    name: name || newName,
    skipStyles: skipStyles || newStyle === StyleLangs.Skip,
    skipTests: skipTests || newTestLib === TestLibs.Skip,
  };

  config.set(Configs.Component, options);

  return options;
}

export async function generateComponent(): Promise<PromiseReturnStatus[]> {
  const { name, prog, style, testLib, testType, skipStyles, skipTests } = await getComponentConfig();
  const { quotes } = config.get(Configs.Global);

  fs.mkdirSync(name);

  const promises = [componentPromise(name, prog, style, quotes), indexPromise(name, prog)];

  if (!skipStyles) {
    promises.push(styleSheetPromise(name, style));
  }

  if (!skipTests) {
    promises.push(testPromise(name, prog, testLib, testType));
  }

  return Promise.all(promises);
}
