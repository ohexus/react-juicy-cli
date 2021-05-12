/* eslint-disable @typescript-eslint/unbound-method */
import config from '../../config';

import askEntityName from '../common/askEntityName';
import askTestEntity from '../common/askTestEntity';
import askTestLib from '../common/askTestLib';
import askTestType from '../common/askTestType';
import askTestConfig from './askTestConfig';

import { Configs, TestLibs } from '../../enums';

jest.mock('../../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('../common/askEntityName', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askTestEntity', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askTestLib', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askTestType', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askTestConfig', () => {
  const lib = 'foo';
  const name = 'bar';
  const testEntity = 'baz';
  const type = 'qux';

  const testConfig = {
    lib,
    name,
    testEntity,
    type,
  };

  beforeEach(() => {
    (askEntityName as jest.Mock).mockResolvedValue(name);
    (askTestEntity as jest.Mock).mockResolvedValue(testEntity);
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
      testEntity: null,
      type: null,
    };

    (config.get as jest.Mock)
      .mockReturnValueOnce(globalConfig)
      .mockReturnValueOnce(emptyTestConfig);

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
      testEntity: null,
      type: null,
    };

    (config.get as jest.Mock)
      .mockReturnValueOnce(globalConfig)
      .mockReturnValueOnce(emptyTestConfig);
    (askTestLib as jest.Mock).mockResolvedValue(TestLibs.Skip);

    await askTestConfig();

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(`${Configs.Global}.skipTests`, true);
  });
});
