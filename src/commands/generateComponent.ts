import fs from 'fs';
import { config } from '../config';

import { switchComponentTemplate, switchExt, switchTestLib } from './switchHelpers';

import { indexTemplate, sassTemplate, cssTemplate } from '../templates';
import { askProgLang, askStyleLang, askTestLib, askComponentName } from '../questions';
import { writeData } from '../utils';

import { ProgLangNames, StyleLangExts, StyleLangNames, TestLibNames } from '../enums';
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
  const { name, prog, style, testLib } = config.get('component');

  let newProg = '';
  if (!prog) {
    newProg = await askProgLang();
  }

  let newStyle = '';
  if (!style) {
    newStyle = await askStyleLang();
  }

  let newTestLib = '';
  if (!testLib) {
    newTestLib = await askTestLib();
  }

  let newName = '';
  if (!name) {
    newName = await askComponentName();
  }

  const options = {
    prog: prog || newProg,
    style: style || newStyle,
    testLib: testLib || newTestLib,
    name: name || newName,
  };

  config.set('component', options);

  return options;
}

export async function generateComponent(): Promise<
  [PromiseReturnStatus, PromiseReturnStatus, PromiseReturnStatus, PromiseReturnStatus]
> {
  const { name, prog, style, testLib } = await getComponentConfig();

  fs.mkdirSync(name);

  return Promise.all([
    componentPromise(name, prog, style),
    indexPromise(name, prog),
    styleSheetPromise(name, style),
    testLibPromise(name, prog, testLib),
  ]);
}
