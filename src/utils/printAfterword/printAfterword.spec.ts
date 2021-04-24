/* eslint-disable @typescript-eslint/unbound-method */
import config from '../../config';

import printAfterword from './printAfterword';

import { Configs, GenerationEntities } from '../../enums';

jest.mock('../../config', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

jest.mock('../chalkColored', () => ({
  __esModule: true,
  yellowStr: jest.fn(),
  greenStr: jest.fn(),
}));

describe('printAfterword', () => {
  const name = 'foo';

  it.each`
    entity                          | consoleLogCalls
    ${GenerationEntities.Component} | ${2}
    ${GenerationEntities.Context}   | ${2}
    ${GenerationEntities.Hook}      | ${2}
    ${GenerationEntities.Test}      | ${2}
  `(
    'logs $consoleLogCalls times',
    ({ entity, consoleLogCalls }: { entity: GenerationEntities; consoleLogCalls: number }) => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      (config.get as jest.Mock)
        .mockReturnValueOnce({ entity, skipStyles: false, skipTests: false })
        .mockReturnValueOnce({ name });

      printAfterword();

      expect(config.get).toHaveBeenCalledTimes(2);
      expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
      expect(config.get).toHaveBeenNthCalledWith(2, Configs[entity]);

      expect(consoleLogSpy).toHaveBeenCalledTimes(consoleLogCalls);
    },
  );

  it.each`
    entity                          | consoleLogCalls
    ${GenerationEntities.Component} | ${5}
    ${GenerationEntities.Context}   | ${4}
    ${GenerationEntities.Hook}      | ${4}
    ${GenerationEntities.Test}      | ${2}
  `(
    'logs $consoleLogCalls times if tests and styles are skipped',
    ({ entity, consoleLogCalls }: { entity: GenerationEntities; consoleLogCalls: number }) => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      (config.get as jest.Mock)
        .mockReturnValueOnce({ entity, skipStyles: true, skipTests: true })
        .mockReturnValueOnce({ name });

      printAfterword();

      expect(config.get).toHaveBeenCalledTimes(2);
      expect(config.get).toHaveBeenNthCalledWith(1, Configs.Global);
      expect(config.get).toHaveBeenNthCalledWith(2, Configs[entity]);

      expect(consoleLogSpy).toHaveBeenCalledTimes(consoleLogCalls);
    },
  );

  it('does not log anything', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    (config.get as jest.Mock).mockReturnValueOnce({ entity: null, skipStyles: true, skipTests: true });

    printAfterword();

    expect(config.get).toHaveBeenCalledTimes(1);
    expect(config.get).toHaveBeenCalledWith(Configs.Global);

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
