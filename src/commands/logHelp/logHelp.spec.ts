import logHelp from './logHelp';

jest.mock('../../utils', () => ({
  __esModule: true,
  blueStr: jest.fn(),
  cyanStr: jest.fn(),
  indigoStr: jest.fn(),
  yellowStr: jest.fn(),
  TableBody: jest.fn().mockImplementation(() => ({ push: jest.fn(), toString: jest.fn() })),
  TableHeader: jest.fn().mockImplementation(() => ({ push: jest.fn(), toString: jest.fn() })),
}));

describe('logHelp', () => {
  it('logs version', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logHelp();

    expect(consoleSpy).toHaveBeenCalledTimes(7);
  });
});
