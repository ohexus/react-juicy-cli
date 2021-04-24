/* eslint-disable @typescript-eslint/unbound-method */
import config from '../config';
import { Configs, GenerationEntities } from '../enums';

import askGlobalConfig from './askGlobalConfig';
import askProgLang from './askProgLang';
import askQuotes from './askQuotes';
import askWhichEntity from './askWhichEntity';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('./askProgLang', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./askQuotes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./askWhichEntity', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askGlobalConfig', () => {
  const entity = 'foo';
  const prog = 'foo';
  const quotes = 'bar';

  const globalConfig = {
    entity,
    prog,
    quotes,
  };

  beforeEach(() => {
    (askProgLang as jest.Mock).mockResolvedValue(prog);
    (askQuotes as jest.Mock).mockResolvedValue(quotes);
    (askWhichEntity as jest.Mock).mockResolvedValue(entity);
  });

  it('sets global config if all fields filled in', async () => {
    (config.get as jest.Mock).mockReturnValue(globalConfig);

    await askGlobalConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Global);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Global, globalConfig);
  });

  it('sets global config if config is empty', async () => {
    const emptyGlobalConfig = {
      entity: null,
      prog: null,
      quotes: null,
    };

    (config.get as jest.Mock).mockReturnValue(emptyGlobalConfig);

    await askGlobalConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Global);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Global, {
      ...globalConfig,
      quotes: null,
    });
  });

  it('sets global config if entity is component', async () => {
    const emptyGlobalConfig = {
      entity: null,
      prog: null,
      quotes: null,
    };

    (config.get as jest.Mock).mockReturnValue(emptyGlobalConfig);
    (askWhichEntity as jest.Mock).mockResolvedValue(GenerationEntities.Component);

    await askGlobalConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Global);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Global, {
      ...globalConfig,
      entity: GenerationEntities.Component,
    });
  });
});
