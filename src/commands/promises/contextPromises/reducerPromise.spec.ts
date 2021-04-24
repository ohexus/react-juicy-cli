import { mockWriteDataError, ERROR } from '../../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import reducerPromise from './reducerPromise';

import { ProgLangNames } from '../../../enums';
import { writeData } from '../../../utils';
import { switchExt, switchContextReducerTemplate } from '../../switchHelpers';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchContextReducerTemplate: jest.fn(),
  switchExt: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('reducerPromise', () => {
  const name = 'baz';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchContextReducerTemplate as jest.Mock).mockReturnValue(jest.fn());
    (switchExt as jest.Mock).mockReturnValue('qux');
  });

  it('creates a file with context reducer template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(reducerPromise(name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(reducerPromise(name, lang)).rejects.toEqual(ERROR);
  });
});
