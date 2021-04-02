import fs from 'fs';
import { config } from '../config';

import { switchComponentTemplate, switchExt, switchTestLib } from './switchHelpers';

import { indexTemplate, sassTemplate, cssTemplate } from '../templates';
import { askProgLang, askStyleLang, askTestLib, askEntityName } from '../questions';
import { capitalizeFirstLetter, writeData } from '../utils';

import {
  Configs,
  GenerationEntities,
  ProgLangNames,
  Quotes,
  StyleLangExts,
  StyleLangNames,
  TestLibNames,
} from '../enums';
import { ComponentConfig, PromiseReturnStatus } from '../interfaces';

function componentPromise(
  name: string,
  lang: ProgLangNames,
  sslang: StyleLangNames,
  quotes: Quotes,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchComponentTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}x`, template(name, (sslang as string) as StyleLangExts, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function indexPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/index.${ext}`, indexTemplate(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function styleSheetPromise(name: string, lang: StyleLangNames): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${lang}`, (lang === StyleLangNames.SASS ? sassTemplate : cssTemplate)(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function testLibPromise(
  name: string,
  lang: ProgLangNames,
  lib: TestLibNames,
  quotes: Quotes,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const [testExt, template] = switchTestLib(lib);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${testExt}.${ext}x`, template(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

async function getComponentConfig(): Promise<ComponentConfig> {
  const { name, prog, style, testLib, skipStyles, skipTests } = config.get(Configs.Component);

  let newProg = '';
  if (!prog) {
    newProg = await askProgLang();
  }

  let newStyle = '';
  if (!skipStyles && !style) {
    newStyle = await askStyleLang();
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
    name: name || newName,
    skipStyles: skipStyles || newStyle === StyleLangNames.Skip,
    skipTests: skipTests || newTestLib === TestLibNames.Skip,
  };

  config.set(Configs.Component, options);

  return options;
}

export async function generateComponent(): Promise<PromiseReturnStatus[]> {
  const { name, prog, style, testLib, skipStyles, skipTests } = await getComponentConfig();
  const { quotes } = config.get(Configs.Global);

  fs.mkdirSync(name);

  const promises = [componentPromise(name, prog, style, quotes), indexPromise(name, prog, quotes)];

  if (!skipStyles) {
    promises.push(styleSheetPromise(name, style));
  }

  if (!skipTests) {
    promises.push(testLibPromise(name, prog, testLib, quotes));
  }

  return Promise.all(promises);
}
