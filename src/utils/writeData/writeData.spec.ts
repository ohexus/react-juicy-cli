import fs from 'fs';

import writeData from './writeData';

jest.mock('fs');

describe('writeData', () => {
  const PATH = 'foo';
  const DATA = 'bar';

  it('returns success if data wrote', async () => {
    ((fs.writeFile as unknown) as jest.Mock).mockImplementation(
      (path: string, data: string, callback: () => void): void => {
        callback();
      },
    );

    await expect(writeData(PATH, DATA)).resolves.toEqual('Success');
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });

  it('throws error if something went wrong', async () => {
    const ERROR = 'baz';

    ((fs.writeFile as unknown) as jest.Mock).mockImplementation(
      (path: string, data: string, callback: (error: Error) => void): void => {
        callback(new Error(ERROR));
      },
    );

    await expect(writeData(PATH, DATA)).rejects.toThrow(new Error(ERROR));
  });
});
