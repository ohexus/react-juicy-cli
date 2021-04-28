import fs from 'fs';

import makeDir from './makeDir';

jest.mock('fs');

describe('makeDir', () => {
  it('creates new directory or does not create if one already exists', () => {
    const DIR = 'foo';

    makeDir(DIR);

    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(DIR, { recursive: true });
  });

  it('does not create new directory', () => {
    const DIR = '.';

    makeDir(DIR);

    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});
