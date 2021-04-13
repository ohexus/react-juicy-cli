import { TestExts, TestTypes } from '../../enums';

export function switchTestExt(type: TestTypes): TestExts {
  if (type === TestTypes.Unit) {
    return TestExts.Unit;
  } else if (type === TestTypes.Integration) {
    return TestExts.Integration;
  }
  return TestExts.Unit;
}
