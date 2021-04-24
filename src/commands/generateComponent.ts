import config from '../config';
import { makeDir } from '../utils';

import { componentIndexPromise, componentPromise, styleSheetPromise } from './promises';

import { Configs } from '../enums';
import { ComponentConfig, GlobalConfig, PromiseReturnStatus } from '../interfaces';

const getComponentConfig = (): ComponentConfig & {
  prog: GlobalConfig['prog'];
  quotes: GlobalConfig['quotes'];
  skipStyles: GlobalConfig['skipStyles'];
} => {
  const { prog, quotes, skipStyles } = config.get(Configs.Global) as GlobalConfig;
  const componentConfig = config.get(Configs.Component) as ComponentConfig;

  return {
    prog,
    quotes,
    skipStyles,
    ...componentConfig,
  };
};

async function generateComponent(): Promise<PromiseReturnStatus[]> {
  const { name, prog, quotes, style, skipStyles } = getComponentConfig();

  makeDir(name);

  const promises = [componentPromise(name, prog, style, quotes), componentIndexPromise(name, prog)];

  if (!skipStyles) {
    promises.push(styleSheetPromise(name, style));
  }

  return Promise.all(promises);
}

export default generateComponent;
