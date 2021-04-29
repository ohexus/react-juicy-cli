import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import {
  mockWriteDataSuccess,
  SUCCESS,
} from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt, switchComponentTemplate } from '../../switchHelpers';
import componentPromise from './componentPromise';

import { ProgLangNames, StyleLangs, Quotes } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
  switchComponentTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('componentPromise', () => {
  const dir = 'quuz';
  const name = 'foo';
  const lang = ProgLangNames.TS;
  const sslang = StyleLangs.CSS;
  const quotes = Quotes.Single;

  beforeEach(() => {
    (switchExt as jest.Mock).mockReturnValue('qux');
    (switchComponentTemplate as jest.Mock).mockReturnValue(jest.fn());
  });

  it('creates a file with component template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(componentPromise(dir, name, lang, sslang, quotes)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(componentPromise(dir, name, lang, sslang, quotes)).rejects.toEqual(ERROR);
  });
});
