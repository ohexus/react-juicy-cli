import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt, switchHookTemplate } from '../../switchHelpers';
import hookPromise from './hookPromise';

import { ProgLangNames } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
  switchHookTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('hookPromise', () => {
  const dir = 'quuz';
  const name = 'foo';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchExt as jest.Mock).mockReturnValue('qux');
    (switchHookTemplate as jest.Mock).mockReturnValue(jest.fn());
  });

  it('creates a file with hook template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(hookPromise(dir, name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(hookPromise(dir, name, lang)).rejects.toEqual(ERROR);
  });
});
