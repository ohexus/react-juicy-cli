import fs from 'fs';
import { config } from '../config';

import { switchExt } from './switchHelpers';

import { contextTsTemplate, contextTsTypesTemplate, providerTsTemplate, reducerTsTemplate } from '../templates';
import { askProgLang, askEntityName } from '../questions';
import { writeData } from '../utils';

import { GenerationEntities, ProgLangNames } from '../enums';
import { ContextConfig, PromiseReturnStatus } from '../interfaces';

function contextPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, contextTsTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function contextTypesPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, contextTsTypesTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function providerPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}x`, providerTsTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function reducerPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, reducerTsTemplate(name))
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
    newName = await askEntityName(GenerationEntities.Context);
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
