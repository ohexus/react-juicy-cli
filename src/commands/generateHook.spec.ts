/* eslint-disable @typescript-eslint/unbound-method */
import { mockRejectedPromises, mockResolvedPromises } from '../__mocks__/mockGenerationPromises';
import config from '../config';

import generateHook from './generateHook';
import { hookIndexPromise, hookPromise } from './promises';

import { Configs } from '../enums';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

jest.mock('./promises', () => ({
  __esModule: true,
  hookIndexPromise: jest.fn(),
  hookPromise: jest.fn(),
}));

jest.mock('../utils', () => ({
  __esModule: true,
  makeDir: jest.fn(),
}));

const promises = [hookIndexPromise, hookPromise];

describe('generateHook', () => {
  const dir = 'foo';
  const name = 'bar';
  const prog = 'baz';

  const promiseSuccess = 'corge';
  const promiseError = 'waldo';

  const globalConfig = {
    prog,
  };

  const hookConfig = {
    name,
  };

  it('generates hook at the specified path', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(hookConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateHook(dir)).resolves.toEqual([promiseSuccess, promiseSuccess]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Hook);

    expect(hookIndexPromise).toHaveBeenCalledTimes(1);
    expect(hookIndexPromise).toHaveBeenCalledWith(dir, name, prog);

    expect(hookPromise).toHaveBeenCalledTimes(1);
    expect(hookPromise).toHaveBeenCalledWith(dir, name, prog);
  });

  it('generates hook without path', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(hookConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateHook()).resolves.toEqual([promiseSuccess, promiseSuccess]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Hook);

    expect(hookIndexPromise).toHaveBeenCalledTimes(1);
    expect(hookIndexPromise).toHaveBeenCalledWith(name, name, prog);

    expect(hookPromise).toHaveBeenCalledTimes(1);
    expect(hookPromise).toHaveBeenCalledWith(name, name, prog);
  });

  it('rejects with error', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(hookConfig);

    mockRejectedPromises(promises, promiseError);

    await expect(generateHook(dir)).rejects.toEqual(promiseError);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Hook);

    expect(hookIndexPromise).toHaveBeenCalledTimes(1);
    expect(hookIndexPromise).toHaveBeenCalledWith(dir, name, prog);

    expect(hookPromise).toHaveBeenCalledTimes(1);
    expect(hookPromise).toHaveBeenCalledWith(dir, name, prog);
  });
});
