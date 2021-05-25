/* eslint-disable @typescript-eslint/unbound-method */
import config from '../config';
import { mockRejectedPromises, mockResolvedPromises } from '../__mocks__/mockGenerationPromises';

import generateComponent from './generateComponent';
import { componentIndexPromise, componentPromise, styleSheetPromise } from './promises';

import { Configs } from '../enums';

jest.mock('../config', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

jest.mock('./promises', () => ({
  __esModule: true,
  componentIndexPromise: jest.fn(),
  componentPromise: jest.fn(),
  styleSheetPromise: jest.fn(),
}));

jest.mock('../utils', () => ({
  __esModule: true,
  makeDir: jest.fn(),
}));

const promises = [componentIndexPromise, componentPromise, styleSheetPromise];

describe('generateComponent', () => {
  const path = 'corge';
  const name = 'foo';
  const style = 'bar';
  const prog = 'baz';
  const quotes = 'qux';

  const promiseSuccess = 'corge';
  const promiseError = 'waldo';

  const globalConfig = {
    path,
    prog,
    quotes,
    skipStyles: false,
  };

  const componentConfig = {
    name,
    style,
  };

  it('generates component with styles', async () => {
    (config.get as jest.Mock)
      .mockReturnValueOnce(globalConfig)
      .mockReturnValueOnce(componentConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateComponent()).resolves.toEqual([
      promiseSuccess,
      promiseSuccess,
      promiseSuccess,
    ]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Component);

    expect(componentIndexPromise).toHaveBeenCalledTimes(1);
    expect(componentIndexPromise).toHaveBeenCalledWith(path, name, prog);

    expect(componentPromise).toHaveBeenCalledTimes(1);
    expect(componentPromise).toHaveBeenCalledWith(path, name, prog, style, quotes);

    expect(styleSheetPromise).toHaveBeenCalledTimes(1);
    expect(styleSheetPromise).toHaveBeenCalledWith(path, name, style);
  });

  it('generates component without styles', async () => {
    (config.get as jest.Mock)
      .mockReturnValueOnce({ ...globalConfig, skipStyles: true })
      .mockReturnValueOnce(componentConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateComponent()).resolves.toEqual([promiseSuccess, promiseSuccess]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Component);

    expect(componentIndexPromise).toHaveBeenCalledTimes(1);
    expect(componentIndexPromise).toHaveBeenCalledWith(path, name, prog);

    expect(componentPromise).toHaveBeenCalledTimes(1);
    expect(componentPromise).toHaveBeenCalledWith(path, name, prog, style, quotes);

    expect(styleSheetPromise).not.toHaveBeenCalled();
  });

  it('generates component without path', async () => {
    (config.get as jest.Mock)
      .mockReturnValueOnce({ ...globalConfig, path: null })
      .mockReturnValueOnce(componentConfig);

    mockResolvedPromises(promises, promiseSuccess);

    await expect(generateComponent()).resolves.toEqual([
      promiseSuccess,
      promiseSuccess,
      promiseSuccess,
    ]);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Component);

    expect(componentIndexPromise).toHaveBeenCalledTimes(1);
    expect(componentIndexPromise).toHaveBeenCalledWith(name, name, prog);

    expect(componentPromise).toHaveBeenCalledTimes(1);
    expect(componentPromise).toHaveBeenCalledWith(name, name, prog, style, quotes);

    expect(styleSheetPromise).toHaveBeenCalledTimes(1);
    expect(styleSheetPromise).toHaveBeenCalledWith(name, name, style);
  });

  it('rejects with error', async () => {
    (config.get as jest.Mock)
      .mockReturnValueOnce(globalConfig)
      .mockReturnValueOnce(componentConfig);

    mockRejectedPromises(promises, promiseError);

    await expect(generateComponent()).rejects.toEqual(promiseError);

    expect(config.get).toHaveBeenCalledTimes(2);
    expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
    expect(config.get).toHaveBeenNthCalledWith(2, Configs.Component);

    expect(componentIndexPromise).toHaveBeenCalledTimes(1);
    expect(componentIndexPromise).toHaveBeenCalledWith(path, name, prog);

    expect(componentPromise).toHaveBeenCalledTimes(1);
    expect(componentPromise).toHaveBeenCalledWith(path, name, prog, style, quotes);

    expect(styleSheetPromise).toHaveBeenCalledTimes(1);
    expect(styleSheetPromise).toHaveBeenCalledWith(path, name, style);
  });
});
