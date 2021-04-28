import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt, switchContextProviderTemplate } from '../../switchHelpers';
import providerPromise from './providerPromise';

import { ProgLangNames } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
  switchContextProviderTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('providerPromise', () => {
  const dir = 'quuz';
  const name = 'baz';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchContextProviderTemplate as jest.Mock).mockReturnValue(jest.fn());
    (switchExt as jest.Mock).mockReturnValue('qux');
  });

  it('creates a file with context provider template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(providerPromise(dir, name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(providerPromise(dir, name, lang)).rejects.toEqual(ERROR);
  });
});
