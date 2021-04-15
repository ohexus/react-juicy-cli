import { TestLibs, TestTypes } from '../enums';

export interface TestConfigBasic {
  name: string | null;
  type: TestTypes | null;
  lib: TestLibs | null;
}

export interface TestConfig {
  name: string;
  type: TestTypes;
  lib: TestLibs;
}
