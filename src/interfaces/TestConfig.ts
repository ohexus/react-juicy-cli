import { TestLibs, TestTypes } from '../enums';

interface TestConfig {
  lib: TestLibs;
  name: string;
  type: TestTypes;
}

export default TestConfig;
