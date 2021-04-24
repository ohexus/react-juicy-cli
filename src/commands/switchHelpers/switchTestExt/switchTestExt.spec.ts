import switchTestExt from './switchTestExt';

import { TestExts, TestTypes } from '../../../enums';

describe('switchTestExt', () => {
  it('switches extension', () => {
    const EXTS = [TestExts.Integration, TestExts.Unit];
    const TYPES = [TestTypes.Integration, TestTypes.Unit];

    TYPES.forEach((type, index) => {
      const ext = switchTestExt(type);

      expect(ext).toEqual(EXTS[index]);
    });
  });

  it('returns default extension', () => {
    const ext = switchTestExt(('foo' as unknown) as TestTypes);

    expect(ext).toEqual(TestExts.Unit);
  });
});
