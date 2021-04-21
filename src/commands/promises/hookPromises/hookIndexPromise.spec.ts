import { mockWriteDataError, ERROR } from '../../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import hookIndexPromise from './hookIndexPromise';

import { ProgLangNames } from '../../../enums';
import { writeData } from '../../../utils';
import { switchExt, switchHookTemplate } from '../../switchHelpers';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
  switchHookTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('hookIndexPromise', () => {
  const name = 'foo';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchExt as jest.Mock).mockReturnValue('qux');
    (switchHookTemplate as jest.Mock).mockReturnValue(jest.fn());
  });

  it('creates a file with hook index template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(hookIndexPromise(name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(hookIndexPromise(name, lang)).rejects.toEqual(ERROR);
  });
});
