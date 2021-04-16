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

import { Configs, ProgLangNames } from '../enums';
import { ContextConfig, GlobalConfig, PromiseReturnStatus } from '../interfaces';

function contextPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function contextTypesPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTypesTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Types.${ext}`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function providerPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextProviderTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Provider.${ext}x`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function reducerPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextReducerTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Reducer.${ext}`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

const getContextConfig = (): ContextConfig & { prog: GlobalConfig['prog'] } => {
  const { prog } = config.get(Configs.Global) as GlobalConfig;
  const { name } = config.get(Configs.Context) as ContextConfig;

  return { name, prog };
};

async function generateContext(): Promise<PromiseReturnStatus[]> {
  const { name, prog } = getContextConfig();

  fs.mkdirSync(name, { recursive: true });

  return Promise.all([
    contextPromise(name, prog),
    contextTypesPromise(name, prog),
    providerPromise(name, prog),
    reducerPromise(name, prog),
  ]);
}

export default generateContext;
