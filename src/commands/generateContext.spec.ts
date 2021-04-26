/* eslint-disable @typescript-eslint/unbound-method */
import { mockRejectedPromises, mockResolvedPromises } from '../__mocks__/mockGenerationPromises';
import config from '../config';

import generateContext from './generateContext';
import { contextIndexPromise, contextPromise, contextTypesPromise, providerPromise, reducerPromise } from './promises';

import { Configs } from '../enums';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

jest.mock('./promises', () => ({
  __esModule: true,
  contextIndexPromise: jest.fn(),
  contextPromise: jest.fn(),
  contextTypesPromise: jest.fn(),
  providerPromise: jest.fn(),
  reducerPromise: jest.fn(),
}));

jest.mock('../utils', () => ({
  __esModule: true,
  makeDir: jest.fn(),
}));

const promises = [contextIndexPromise, contextPromise, contextTypesPromise, providerPromise, reducerPromise];

describe('generateContext', () => {
  const name = 'foo';
  const prog = 'baz';

  const promiseSuccess = 'corge';
  const promiseError = 'waldo';

  const globalConfig = {
    prog,
  };

  const contextConfig = {
    name,
  };

  it('generates context', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(contextConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateContext()).resolves.toEqual(promises.map(() => promiseSuccess));

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Context);

    expect(contextPromise).toHaveBeenCalledTimes(1);
    expect(contextPromise).toHaveBeenCalledWith(name, prog);

    expect(contextIndexPromise).toHaveBeenCalledTimes(1);
    expect(contextIndexPromise).toHaveBeenCalledWith(name, prog);

    expect(contextTypesPromise).toHaveBeenCalledTimes(1);
    expect(contextTypesPromise).toHaveBeenCalledWith(name, prog);

    expect(providerPromise).toHaveBeenCalledTimes(1);
    expect(providerPromise).toHaveBeenCalledWith(name, prog);

    expect(reducerPromise).toHaveBeenCalledTimes(1);
    expect(reducerPromise).toHaveBeenCalledWith(name, prog);
  });

  it('rejects with error', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(contextConfig);

    mockRejectedPromises(promises, promiseError);

    await expect(generateContext()).rejects.toEqual(promiseError);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Context);

    expect(contextPromise).toHaveBeenCalledTimes(1);
    expect(contextPromise).toHaveBeenCalledWith(name, prog);

    expect(contextIndexPromise).toHaveBeenCalledTimes(1);
    expect(contextIndexPromise).toHaveBeenCalledWith(name, prog);

    expect(contextTypesPromise).toHaveBeenCalledTimes(1);
    expect(contextTypesPromise).toHaveBeenCalledWith(name, prog);

    expect(providerPromise).toHaveBeenCalledTimes(1);
    expect(providerPromise).toHaveBeenCalledWith(name, prog);

    expect(reducerPromise).toHaveBeenCalledTimes(1);
    expect(reducerPromise).toHaveBeenCalledWith(name, prog);
  });
});
