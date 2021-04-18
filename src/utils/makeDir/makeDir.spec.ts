import fs from 'fs';

import makeDir from './makeDir';

jest.mock('fs');

describe('makeDir', () => {
  it('creates new directory or does not create if one already exists', () => {
    const NAME = 'foo';

    makeDir(NAME);

    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(NAME, { recursive: true });
  });
});
