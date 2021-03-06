/* eslint-disable @typescript-eslint/unbound-method */
import config from '../config';
import { mockRejectedPromises, mockResolvedPromises } from '../__mocks__/mockGenerationPromises';

import generateTest from './generateTest';
import { testPromise } from './promises';

import { Configs } from '../enums';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

jest.mock('./promises', () => ({
  __esModule: true,
  testPromise: jest.fn(),
}));

jest.mock('../utils', () => ({
  __esModule: true,
  makeDir: jest.fn(),
}));

const promises = [testPromise];

describe('generateTest', () => {
  const testEntity = 'foo';
  const lib = 'bar';
  const name = 'baz';
  const path = 'corge';
  const prog = 'qux';
  const type = 'quux';

  const promiseSuccess = 'corge';
  const promiseError = 'waldo';

  const globalConfig = {
    path,
    prog,
    skipTests: false,
  };

  const testConfig = {
    lib,
    name,
    testEntity,
    type,
  };

  it('generates test at the specified path', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(testConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateTest()).resolves.toEqual([promiseSuccess]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(testPromise).toHaveBeenCalledTimes(1);
    expect(testPromise).toHaveBeenCalledWith(path, name, prog, lib, type, testEntity);
  });

  it('generates test without path', async () => {
    (config.get as jest.Mock)
      .mockReturnValueOnce({ ...globalConfig, path: null })
      .mockReturnValueOnce(testConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateTest()).resolves.toEqual([promiseSuccess]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(testPromise).toHaveBeenCalledTimes(1);
    expect(testPromise).toHaveBeenCalledWith(name, name, prog, lib, type, testEntity);
  });

  it('does not generate test', async () => {
    (config.get as jest.Mock)
      .mockReturnValueOnce({ ...globalConfig, skipTests: true })
      .mockReturnValueOnce(testConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateTest()).resolves.not.toThrow();

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(testPromise).not.toHaveBeenCalled();
  });

  it('rejects with error', async () => {
    (config.get as jest.Mock).mockReturnValueOnce(globalConfig).mockReturnValueOnce(testConfig);

    mockRejectedPromises(promises, promiseError);

    await expect(generateTest()).rejects.toEqual(promiseError);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Test);

    expect(testPromise).toHaveBeenCalledTimes(1);
    expect(testPromise).toHaveBeenCalledWith(path, name, prog, lib, type, testEntity);
  });
});
