import fs from 'fs';
import config from '../config';

import { switchExt, switchHookTemplate } from './switchHelpers';
import { indexTemplate } from '../templates';
import { writeData } from '../utils';

import { Configs, ProgLangNames, Quotes } from '../enums';
import { GlobalConfig, HookConfig, PromiseReturnStatus } from '../interfaces';

function hookPromise(name: string, lang: ProgLangNames, quotes: Quotes): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchHookTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name, quotes))
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

const getHookConfig = (): HookConfig & { prog: GlobalConfig['prog']; quotes: GlobalConfig['quotes'] } => {
  const { prog, quotes } = config.get(Configs.Global) as GlobalConfig;
  const { name } = config.get(Configs.Hook) as HookConfig;

  return { name, prog, quotes };
};

async function generateHook(): Promise<PromiseReturnStatus[]> {
  const { name, prog, quotes } = getHookConfig();

  fs.mkdirSync(name, { recursive: true });

  return Promise.all([hookPromise(name, prog, quotes), indexPromise(name, prog)]);
}

export default generateHook;
