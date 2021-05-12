/* eslint-disable @typescript-eslint/unbound-method */
import config from '../../config';

import askEntityName from '../common/askEntityName';
import askHookConfig from './askHookConfig';

import { Configs } from '../../enums';

jest.mock('../../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('../common/askEntityName', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askHookConfig', () => {
  const name = 'foo';

  const hookConfig = {
    name,
  };

  beforeEach(() => {
    (askEntityName as jest.Mock).mockResolvedValue(name);
  });

  it('sets hook config if all fields filled in', async () => {
    (config.get as jest.Mock).mockReturnValue(hookConfig);

    await askHookConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Hook);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Hook, hookConfig);
  });

  it('sets hook config if config is empty', async () => {
    const emptyGlobalConfig = {
      name: null,
    };

    (config.get as jest.Mock).mockReturnValue(emptyGlobalConfig);

    await askHookConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Hook);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Hook, hookConfig);
  });
});
