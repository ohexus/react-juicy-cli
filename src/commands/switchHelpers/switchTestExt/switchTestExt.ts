import { TestExts, TestTypes } from '../../../enums';

function switchTestExt(type: TestTypes): TestExts {
  switch (type) {
    case TestTypes.Integration:
      return TestExts.Integration;

    case TestTypes.Unit:
      return TestExts.Unit;

    default:
      return TestExts.Unit;
  }
}

export default switchTestExt;
