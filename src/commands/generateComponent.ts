import fs from 'fs';
import config from '../config';

import { switchComponentTemplate, switchExt } from './switchHelpers';
import { indexTemplate, sassTemplate, cssTemplate } from '../templates';
import { writeData } from '../utils';

import { Configs, ProgLangNames, Quotes, StyleLangs } from '../enums';
import { ComponentConfig, GlobalConfig, PromiseReturnStatus } from '../interfaces';

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

const getComponentConfig = (): ComponentConfig & {
  prog: GlobalConfig['prog'];
  quotes: GlobalConfig['quotes'];
  skipStyles: GlobalConfig['skipStyles'];
} => {
  const { prog, quotes, skipStyles } = config.get(Configs.Global) as GlobalConfig;
  const { name, style } = config.get(Configs.Component) as ComponentConfig;

  return {
    name,
    prog,
    quotes,
    style,
    skipStyles,
  };
};

async function generateComponent(): Promise<PromiseReturnStatus[]> {
  const { name, prog, style, skipStyles } = getComponentConfig();
  const { quotes } = config.get(Configs.Global) as GlobalConfig;

  fs.mkdirSync(name);

  const promises = [componentPromise(name, prog, style, quotes), indexPromise(name, prog)];

  if (!skipStyles) {
    promises.push(styleSheetPromise(name, style));
  }

  return Promise.all(promises);
}

export default generateComponent;
