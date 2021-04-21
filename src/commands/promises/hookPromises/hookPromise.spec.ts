import { mockWriteDataError, ERROR } from '../../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import hookPromise from './hookPromise';

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

describe('hookPromise', () => {
  const name = 'foo';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchExt as jest.Mock).mockReturnValue('qux');
    (switchHookTemplate as jest.Mock).mockReturnValue(jest.fn());
  });

  it('returns test template promise', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(hookPromise(name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(hookPromise(name, lang)).rejects.toEqual(ERROR);
  });
});
