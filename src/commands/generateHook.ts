import fs from 'fs';
import config from '../config';

import { switchExt, switchHookTemplate } from './switchHelpers';

import { indexTemplate } from '../templates';
import { askProgLang, askEntityName } from '../questions';
import { replaceWithUse, writeData } from '../utils';

import { Configs, GenerationEntities, ProgLangNames, Quotes } from '../enums';
import { HookConfig, PromiseReturnStatus } from '../interfaces';

function hookPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchHookTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

function indexPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/index.${ext}`, indexTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}

async function getHookConfig(): Promise<HookConfig> {
  const { name, prog } = config.get(Configs.Hook);

  let newProg = '';
  if (!prog) {
    newProg = await askProgLang();
  }

  let newName = '';
  if (!name) {
    newName = replaceWithUse(await askEntityName(GenerationEntities.Hook));
  }

  const options = {
    prog: prog || newProg,
    name: name || newName,
  };

  config.set(Configs.Hook, options);

  return options;
}

async function generateHook(): Promise<[PromiseReturnStatus, PromiseReturnStatus]> {
  const { name, prog } = await getHookConfig();
  const { quotes } = config.get(Configs.Global);

  fs.mkdirSync(name);

  return Promise.all([hookPromise(name, prog, quotes), indexPromise(name, prog, quotes)]);
}

export default generateHook;
