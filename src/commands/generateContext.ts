import fs from 'fs';
import config from '../config';

import {
  switchExt,
  switchContextProviderTemplate,
  switchContextReducerTemplate,
  switchContextTemplate,
  switchContextTypesTemplate,
} from './switchHelpers';
import { writeData } from '../utils';

import { Configs, ProgLangNames, Quotes } from '../enums';
import { ContextConfig, GlobalConfig, PromiseReturnStatus } from '../interfaces';

function contextPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function contextTypesPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTypesTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Types.${ext}`, template(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function providerPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextProviderTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Provider.${ext}x`, template(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function reducerPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextReducerTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Reducer.${ext}`, template(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

const getContextConfig = (): ContextConfig & { prog: GlobalConfig['prog']; quotes: GlobalConfig['quotes'] } => {
  const { prog, quotes } = config.get(Configs.Global) as GlobalConfig;
  const { name } = config.get(Configs.Context) as ContextConfig;

  return { name, prog, quotes };
};

async function generateContext(): Promise<PromiseReturnStatus[]> {
  const { name, prog, quotes } = getContextConfig();

  fs.mkdirSync(name, { recursive: true });

  return Promise.all([
    contextPromise(name, prog, quotes),
    contextTypesPromise(name, prog, quotes),
    providerPromise(name, prog, quotes),
    reducerPromise(name, prog, quotes),
  ]);
}

export default generateContext;
