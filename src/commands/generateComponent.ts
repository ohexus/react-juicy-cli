import fs from 'fs';
import { config } from '../config';

import { switchComponentTemplate, switchExt, switchTestLib } from './switchHelpers';

import { indexTemplate, sassTemplate, cssTemplate } from '../templates';
import { askProgLang, askStyleLang, askTestLib, askEntityName } from '../questions';
import { capitalizeFirstLetter, writeData } from '../utils';

import { GenerationEntities, ProgLangNames, StyleLangExts, StyleLangNames, TestLibNames } from '../enums';
import { ComponentConfig, PromiseReturnStatus } from '../interfaces';

function componentPromise(name: string, lang: ProgLangNames, sslang: StyleLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchComponentTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}x`, template(name, (sslang as string) as StyleLangExts))
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

function styleSheetPromise(name: string, lang: StyleLangNames): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${lang}`, (lang === StyleLangNames.SASS ? sassTemplate : cssTemplate)(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function testLibPromise(name: string, lang: ProgLangNames, lib: TestLibNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const [testExt, template] = switchTestLib(lib);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${testExt}.${ext}x`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

async function getComponentConfig(): Promise<ComponentConfig> {
  const { name, prog, style, testLib, skipStyles, skipTests } = config.get(GenerationEntities.Component);

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

  const options = {
    prog: prog || newProg,
    style: style || newStyle,
    testLib: testLib || newTestLib,
    name: name || newName,
    skipStyles: skipStyles || newStyle === StyleLangNames.SKIP,
    skipTests: skipTests || newTestLib === TestLibNames.SKIP,
  };

  config.set(GenerationEntities.Component, options);

  return options;
}

export async function generateComponent(): Promise<PromiseReturnStatus[]> {
  const { name, prog, style, testLib, skipStyles, skipTests } = await getComponentConfig();

  fs.mkdirSync(name);

  const promises = [componentPromise(name, prog, style), indexPromise(name, prog)];

  if (!skipStyles) {
    promises.push(styleSheetPromise(name, style));
  }

  if (!skipTests) {
    promises.push(testLibPromise(name, prog, testLib));
  }

  return Promise.all(promises);
}
