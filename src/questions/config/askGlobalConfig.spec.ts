/* eslint-disable @typescript-eslint/unbound-method */
import config from '../../config';

import askPath from '../common/askPath';
import askProgLang from '../common/askProgLang';
import askQuotes from '../common/askQuotes';
import askWhichEntity from '../common/askWhichEntity';
import askGlobalConfig from './askGlobalConfig';

import { Configs, GenerationEntities } from '../../enums';

jest.mock('../../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('../common/askPath', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askProgLang', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askQuotes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askWhichEntity', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askGlobalConfig', () => {
  const entity = 'foo';
  const path = 'foo';
  const prog = 'foo';
  const quotes = 'bar';

  const globalConfig = {
    entity,
    path,
    prog,
    quotes,
  };

  beforeEach(() => {
    (askPath as jest.Mock).mockResolvedValue(path);
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
      path: null,
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
      path: null,
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
