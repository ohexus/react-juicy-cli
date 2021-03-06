import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import {
  mockWriteDataSuccess,
  SUCCESS,
} from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt, switchContextTypesTemplate } from '../../switchHelpers';
import contextTypesPromise from './contextTypesPromise';

import { ProgLangNames } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
  switchContextTypesTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('contextTypesPromise', () => {
  const dir = 'quuz';
  const name = 'corge';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchContextTypesTemplate as jest.Mock).mockReturnValue(jest.fn());
    (switchExt as jest.Mock).mockReturnValue('qux');
  });

  it('creates a file with context types template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(contextTypesPromise(dir, name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(contextTypesPromise(dir, name, lang)).rejects.toEqual(ERROR);
  });
});
