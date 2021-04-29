import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import {
  mockWriteDataSuccess,
  SUCCESS,
} from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt, switchContextTemplate } from '../../switchHelpers';
import contextPromise from './contextPromise';

import { ProgLangNames } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchContextTemplate: jest.fn(),
  switchExt: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('contextPromise', () => {
  const dir = 'quuz';
  const name = 'baz';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchContextTemplate as jest.Mock).mockReturnValue(jest.fn());
    (switchExt as jest.Mock).mockReturnValue('qux');
  });

  it('creates a file with context template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(contextPromise(dir, name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(contextPromise(dir, name, lang)).rejects.toEqual(ERROR);
  });
});
