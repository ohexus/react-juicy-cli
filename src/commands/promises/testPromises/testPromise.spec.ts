import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import {
  mockWriteDataSuccess,
  SUCCESS,
} from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../../utils';
import { switchExt, switchTestExt, switchTestLibTemplate } from '../../switchHelpers';
import testPromise from './testPromise';

import { ProgLangNames, TestLibs, TestTypes, GenerationEntities } from '../../../enums';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchExt: jest.fn(),
  switchTestExt: jest.fn(),
  switchTestLibTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('testPromise', () => {
  const dir = 'quuz';
  const name = 'corge';
  const lang = ProgLangNames.TS;
  const lib = TestLibs.Enzyme;
  const type = TestTypes.Unit;
  const entity = GenerationEntities.Test;

  beforeEach(() => {
    (switchExt as jest.Mock).mockReturnValue('qux');
    (switchTestExt as jest.Mock).mockReturnValue('quux');
    (switchTestLibTemplate as jest.Mock).mockReturnValue(jest.fn());
  });

  it('creates a file with test template', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(testPromise(dir, name, lang, lib, type, entity)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(testPromise(dir, name, lang, lib, type, entity)).rejects.toEqual(ERROR);
  });
});
