/* eslint-disable @typescript-eslint/unbound-method */
import config from '../config';
import { Configs, TestLibs } from '../enums';

import askTestConfig from './askTestConfig';
import askEntityName from './askEntityName';
import askTestLib from './askTestLib';
import askTestType from './askTestType';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('./askProgLang', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./askEntityName', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./askTestLib', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./askTestType', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askTestConfig', () => {
  const lib = 'foo';
  const name = 'bar';
  const type = 'baz';

  const testConfig = {
    lib,
    name,
    type,
  };

  beforeEach(() => {
    (askEntityName as jest.Mock).mockResolvedValue(name);
    (askTestLib as jest.Mock).mockResolvedValue(lib);
    (askTestType as jest.Mock).mockResolvedValue(type);
  });

  it('sets test config if all fields filled in', async () => {
    const globalConfig = { skipTests: null };

    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(testConfig);

    await askTestConfig();

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Test, testConfig);
  });

  it('returns nothing if tests are skipped', async () => {
    const globalConfig = { skipTests: true };

    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(testConfig);

    await askTestConfig();

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(config.set).not.toHaveBeenCalled();
  });

  it('sets test config if config is empty', async () => {
    const globalConfig = { skipTests: null };
    const emptyTestConfig = {
      lib: null,
      name: null,
      type: null,
    };

    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(emptyTestConfig);

    await askTestConfig();

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Test, testConfig);
  });

  it('sets test config if config is empty and test lib is skipped', async () => {
    const globalConfig = { skipTests: null };
    const emptyTestConfig = {
      lib: null,
      name: null,
      type: null,
    };

    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(emptyTestConfig);
    (askTestLib as jest.Mock).mockResolvedValue(TestLibs.Skip);

    await askTestConfig();

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(`${Configs.Global}.skipTests`, true);
  });
});
