import { mockWriteDataError, ERROR } from '../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import { writeData } from '../../utils';
import generateEntity from './generateEntity';

jest.mock('../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('generateEntity', () => {
  const path = 'foo';
  const template = 'bar';

  it('generates a file from template in provided path', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(generateEntity(path, template)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(generateEntity(path, template)).rejects.toEqual(ERROR);
  });
});
