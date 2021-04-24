/* eslint-disable @typescript-eslint/unbound-method */
import config from '../../../config';

import { askGlobalConfig } from '../../../questions';
import capitalizeFirstLetter from '../../capitalizeFirstLetter';

import pregenerationSettings from './pregenerationSettings';

import { Configs, GenerationEntities } from '../../../enums';

jest.mock('../../../config', () => ({
  __esModule: true,
  default: { set: jest.fn() },
}));

jest.mock('../../../questions', () => ({
  __esModule: true,
  askGlobalConfig: jest.fn(),
}));

jest.mock('../../capitalizeFirstLetter', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('pregenerationSettings', () => {
  const name = 'foo';
  const capitalizedName = 'Foo';

  const lowercasedEntityConfig = { name };
  const capitalizedEntityConfig = { name: capitalizedName };

  it.each`
    entity                          | expectedConfig
    ${GenerationEntities.Component} | ${capitalizedEntityConfig}
    ${GenerationEntities.Context}   | ${capitalizedEntityConfig}
    ${GenerationEntities.Hook}      | ${lowercasedEntityConfig}
    ${GenerationEntities.Test}      | ${capitalizedEntityConfig}
  `('sets Global and $entity configs', async ({ entity, expectedConfig }) => {
    (capitalizeFirstLetter as jest.Mock).mockReturnValueOnce(capitalizedName);

    await pregenerationSettings(entity, { name });

    expect(config.set).toHaveBeenCalledTimes(2);
    expect(config.set).toHaveBeenNthCalledWith(1, `${Configs.Global}.entity`, entity);
    expect(config.set).toHaveBeenNthCalledWith(2, Configs[entity as GenerationEntities], expectedConfig);

    expect(askGlobalConfig).toHaveBeenCalledTimes(1);
  });
});
