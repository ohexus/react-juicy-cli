import fs from 'fs';
import { config } from '../config';

import {
  switchExt,
  switchContextProviderTemplate,
  switchContextReducerTemplate,
  switchContextTemplate,
  switchContextTypesTemplate,
} from './switchHelpers';

import { askProgLang, askEntityName } from '../questions';
import { replaceWithContext, writeData } from '../utils';

import { GenerationEntities, ProgLangNames } from '../enums';
import { ContextConfig, PromiseReturnStatus } from '../interfaces';

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

async function getContextConfig(): Promise<ContextConfig> {
  const { name, prog } = config.get(GenerationEntities.Context);

  let newProg = '';
  if (!prog) {
    newProg = await askProgLang();
  }

  let newName = '';
  if (!name) {
    newName = replaceWithContext(await askEntityName(GenerationEntities.Context));
  }

  const options = {
    prog: prog || newProg,
    name: name || newName,
  };

  config.set(GenerationEntities.Context, options);

  return options;
}

export async function generateContext(): Promise<
  [PromiseReturnStatus, PromiseReturnStatus, PromiseReturnStatus, PromiseReturnStatus]
> {
  const { name, prog } = await getContextConfig();

  fs.mkdirSync(name);

  return Promise.all([
    contextPromise(name, prog),
    contextTypesPromise(name, prog),
    providerPromise(name, prog),
    reducerPromise(name, prog),
  ]);
}
