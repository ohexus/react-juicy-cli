import config from '../config';
import { makeDir } from '../utils';

import { componentIndexPromise, componentPromise, styleSheetPromise } from './promises';

import { Configs } from '../enums';
import { ComponentConfig, GlobalConfig, PromiseReturnStatus } from '../interfaces';

const getComponentConfig = (): ComponentConfig & {
  path: GlobalConfig['path'];
  prog: GlobalConfig['prog'];
  quotes: GlobalConfig['quotes'];
  skipStyles: GlobalConfig['skipStyles'];
} => {
  const { path, prog, quotes, skipStyles } = config.get(Configs.Global) as GlobalConfig;
  const componentConfig = config.get(Configs.Component) as ComponentConfig;

  return {
    path,
    prog,
    quotes,
    skipStyles,
    ...componentConfig,
  };
};

async function generateComponent(): Promise<PromiseReturnStatus[]> {
  const { name, path, prog, quotes, style, skipStyles } = getComponentConfig();

  const dir = path ?? name;

  makeDir(dir);

  const promises = [
    componentPromise(dir, name, prog, style, quotes),
    componentIndexPromise(dir, name, prog),
  ];

  if (!skipStyles) {
    promises.push(styleSheetPromise(dir, name, style));
  }

  return Promise.all(promises);
}

export default generateComponent;
