import { TestExts, TestTypes } from '../../enums';

function switchTestExt(type: TestTypes): TestExts {
  if (type === TestTypes.Unit) {
    return TestExts.Unit;
  } else if (type === TestTypes.Integration) {
    return TestExts.Integration;
  }
  return TestExts.Unit;
}

export default switchTestExt;
