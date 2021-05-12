/* eslint-disable @typescript-eslint/unbound-method */
import config from '../../config';
import { capitalizeFirstLetter } from '../../utils';

import askEntityName from '../common/askEntityName';
import askStyleLang from '../common/askStyleLang';
import askComponentConfig from './askComponentConfig';

import { Configs, StyleLangs } from '../../enums';

jest.mock('../../config', () => ({
  __esModule: true,
  default: { get: jest.fn(), set: jest.fn() },
}));

jest.mock('../../utils', () => ({
  __esModule: true,
  capitalizeFirstLetter: jest.fn(),
}));

jest.mock('../common/askEntityName', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../common/askStyleLang', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('askComponentConfig', () => {
  const name = 'foo';
  const capitalizedName = 'Foo';
  const style = 'bar';

  beforeEach(() => {
    (capitalizeFirstLetter as jest.Mock).mockReturnValue(capitalizedName);
    (askEntityName as jest.Mock).mockResolvedValue(name);
  });

  it('sets component config if all fields filled in', async () => {
    const componentConfig = {
      name,
      style,
    };

    (config.get as jest.Mock).mockReturnValue(componentConfig);

    await askComponentConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Component);

    expect(config.set).toHaveBeenCalledTimes(2);
    expect(config.set).toHaveBeenNthCalledWith(1, Configs.Component, componentConfig);
    expect(config.set).toHaveBeenNthCalledWith(2, `${Configs.Test}.name`, name);
  });

  it('sets component config if config is empty', async () => {
    const emptyComponentConfig = {
      name: null,
      style: null,
    };

    (config.get as jest.Mock).mockReturnValueOnce(emptyComponentConfig);
    (askStyleLang as jest.Mock).mockResolvedValueOnce(style);

    await askComponentConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Component);

    expect(config.set).toHaveBeenCalledTimes(2);
    expect(config.set).toHaveBeenNthCalledWith(1, Configs.Component, {
      style,
      name: capitalizedName,
    });
    expect(config.set).toHaveBeenNthCalledWith(2, `${Configs.Test}.name`, capitalizedName);
  });

  it('sets skip styles on skip', async () => {
    const emptyComponentConfig = {
      name: null,
      style: null,
    };

    (config.get as jest.Mock).mockReturnValueOnce(emptyComponentConfig);
    (askStyleLang as jest.Mock).mockResolvedValueOnce(StyleLangs.Skip);

    await askComponentConfig();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Component);

    expect(config.set).toHaveBeenCalledTimes(3);
    expect(config.set).toHaveBeenNthCalledWith(1, `${Configs.Global}.skipStyles`, true);
    expect(config.set).toHaveBeenNthCalledWith(2, Configs.Component, {
      ...emptyComponentConfig,
      name: capitalizedName,
    });
    expect(config.set).toHaveBeenNthCalledWith(3, `${Configs.Test}.name`, capitalizedName);
  });
});
