import logVersion from './logVersion';
import { version } from '../../../__mocks__/mock.package.json';

describe('logVersion', () => {
  it('logs version', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logVersion();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(version);
  });
});
