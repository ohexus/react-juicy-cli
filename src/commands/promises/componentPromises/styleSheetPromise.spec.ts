import { mockWriteDataError, ERROR } from '../../../__mocks__/writeDataMocks/mockWriteDataError';
import { mockWriteDataSuccess, SUCCESS } from '../../../__mocks__/writeDataMocks/mockWriteDataSuccess';

import styleSheetPromise from './styleSheetPromise';

import { StyleLangs } from '../../../enums';
import { cssTemplate, sassTemplate } from '../../../templates';
import { writeData } from '../../../utils';

jest.mock('../../../templates', () => ({
  __esModule: true,
  cssTemplate: jest.fn(),
  sassTemplate: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  __esModule: true,
  writeData: jest.fn(),
}));

describe('styleSheetPromise', () => {
  const name = 'quuz';
  const sslang = StyleLangs.CSS;

  beforeEach(() => {
    (cssTemplate as jest.Mock).mockReturnValue(jest.fn());
    (sassTemplate as jest.Mock).mockReturnValue(jest.fn());
  });

  it.each`
    lang
    ${StyleLangs.CSS}
    ${StyleLangs.LESS}
    ${StyleLangs.SASS}
    ${StyleLangs.SCSS}
  `('creates a file with template when style lang is $lang', async ({ lang }: { lang: StyleLangs }) => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataSuccess);

    await expect(styleSheetPromise(name, lang)).resolves.toEqual(SUCCESS);
  });

  it('throws an error', async () => {
    (writeData as jest.Mock).mockImplementation(mockWriteDataError);

    await expect(styleSheetPromise(name, sslang)).rejects.toEqual(ERROR);
  });
});
