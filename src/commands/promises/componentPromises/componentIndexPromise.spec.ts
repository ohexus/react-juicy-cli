import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt } from '../../switchHelpers';
import componentIndexPromise from './componentIndexPromise';

import { ProgLangNames } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('componentIndexPromise', () => {
  const dir = 'quuz';
  const name = 'foo';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchExt as jest.Mock).mockReturnValue('qux');
  });

  it('creates a file with component index template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(componentIndexPromise(dir, name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(componentIndexPromise(dir, name, lang)).rejects.toEqual(ERROR);
  });
});
