/* eslint-disable @typescript-eslint/unbound-method */
import config from '../config';
import { capitalizeFirstLetter } from '../utils';

import askContextConfig from './askContextConfig';
import askEntityName from './askEntityName';
import { Configs } from '../enums';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('../utils', () => ({
  __esModule: true,
  capitalizeFirstLetter: jest.fn(),
}));

jest.mock('./askEntityName', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askContextConfig', () => {
  it('sets context config if all fields filled in', async () => {
    const name = 'foo';

    const contextConfig = {
      name,
    };

    (config.get as jest.Mock).mockReturnValue(contextConfig);

    await askContextConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Context);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Context, contextConfig);
  });

  it('sets context config if config is empty', async () => {
    const name = 'foo';
    const capitalizedName = 'foo';

    const contextConfig = {
      name: null,
    };

    (config.get as jest.Mock).mockReturnValue(contextConfig);
    (capitalizeFirstLetter as jest.Mock).mockReturnValue(capitalizedName);
    (askEntityName as jest.Mock).mockResolvedValue(name);

    await askContextConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Context);

    expect(config.set).toHaveBeenCalledTimes(1);
    expect(config.set).toHaveBeenCalledWith(Configs.Context, {
      ...contextConfig,
      name: capitalizedName,
    });
  });
});
