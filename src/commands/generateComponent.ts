import fs from 'fs';
import { config } from '../config';

import {
  jsTemplate,
  tsTemplate,
  indexTemplate,
  testEnzymeTemplate,
  testTestingLibraryTemplate,
  sassTemplate,
  cssTemplate,
} from '../templates';
import { askProgLang, askStyleLang, askTestLib, askComponentName } from '../questions';
import { writeData } from '../utils';

import { ProgLangExts, ProgLangNames, StyleLangExts, StyleLangNames, TestLibExts, TestLibNames } from '../enums';
import { ComponentConfig, PromiseReturnStatus } from '../interfaces';

function switchProg(lang: ProgLangNames): [ProgLangExts, typeof jsTemplate | typeof tsTemplate] {
  if (lang === ProgLangNames.JS) {
    return [ProgLangExts.JS, jsTemplate];
  } else if (lang === ProgLangNames.TS) {
    return [ProgLangExts.TS, tsTemplate];
  } else {
    return [ProgLangExts.JS, jsTemplate];
  }
}

function switchTestLib(
  lib: TestLibNames,
): [TestLibExts, typeof testEnzymeTemplate | typeof testTestingLibraryTemplate] {
  if (lib === TestLibNames.ENZYME) {
    return [TestLibExts.ENZYME, testEnzymeTemplate];
  } else if (lib === TestLibNames.TESTING_LIB) {
    return [TestLibExts.TESTING_LIB, testTestingLibraryTemplate];
  } else {
    return [TestLibExts.ENZYME, testEnzymeTemplate];
  }
}

function componentPromise(name: string, lang: ProgLangNames, sslang: StyleLangNames): Promise<PromiseReturnStatus> {
  const [ext, template] = switchProg(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name, (sslang as string) as StyleLangExts))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function indexPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const [ext] = switchProg(lang);

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
  const [ext] = switchProg(lang);
  const [testExt, template] = switchTestLib(lib);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${testExt}.${ext}`, template(name))
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
