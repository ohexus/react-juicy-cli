import fs from 'fs';
import { config } from '../config';

import { switchExt, switchHookTemplate } from './switchHelpers';

import { indexTemplate } from '../templates';
import { askProgLang, askHookName } from '../questions';
import { writeData } from '../utils';

import { ProgLangNames } from '../enums';
import { HookConfig, PromiseReturnStatus } from '../interfaces';

function hookPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchHookTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name))
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

async function getHookConfig(): Promise<HookConfig> {
  const { name, prog } = config.get('hook');

  let newProg = '';
  if (!prog) {
    newProg = await askProgLang();
  }

  let newName = '';
  if (!name) {
    newName = await askHookName();
  }

  const options = {
    prog: prog || newProg,
    name: name || newName,
  };

  config.set('hook', options);

  return options;
}

export async function generateHook(): Promise<[PromiseReturnStatus, PromiseReturnStatus]> {
  const { name, prog } = await getHookConfig();

  fs.mkdirSync(name);

  return Promise.all([hookPromise(name, prog), indexPromise(name, prog)]);
}
