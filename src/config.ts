import Configstore from 'configstore';
import { Configs } from './enums';

const config = new Configstore('react-juicy-cli');

config.set(Configs.Global, {
  entity: null,
  path: null,
  prog: null,
  skipStyles: false,
  skipTests: false,
  quotes: null,
});

config.set(Configs.Component, {
  style: null,
  name: null,
});

config.set(Configs.Context, {
  name: null,
});

config.set(Configs.Hook, {
  name: null,
});

config.set(Configs.Test, {
  lib: null,
  name: null,
  testEntity: null,
  type: null,
});

export default config;
