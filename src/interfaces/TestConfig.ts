import TestEntity from './TestEntity';

import { TestLibs, TestTypes } from '../enums';

interface TestConfig {
  testEntity: TestEntity;
  lib: TestLibs;
  name: string;
  type: TestTypes;
}

export default TestConfig;
