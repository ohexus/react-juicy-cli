import { mockWriteDataError, ERROR } from '../../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import contextIndexPromise from './contextIndexPromise';

import { ProgLangNames } from '../../../enums';
import { writeData } from '../../../utils';
import { switchContextIndexTemplate, switchExt } from '../../switchHelpers';

jest.mock('../../switchHelpers', () => ({
  __esModule: true,
  switchContextIndexTemplate: jest.fn(),
  switchExt: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('contextIndexPromise', () => {
  const name = 'baz';
  const lang = ProgLangNames.TS;

  beforeEach(() => {
    (switchContextIndexTemplate as jest.Mock).mockReturnValue(jest.fn());
    (switchExt as jest.Mock).mockReturnValue('qux');
  });

  it('returns test template promise', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(contextIndexPromise(name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(contextIndexPromise(name, lang)).rejects.toEqual(ERROR);
  });
});
