import { TestLibs, TestTypes } from '../enums';

export interface TestConfigBasic {
  lib: TestLibs | null;
  name: string | null;
  type: TestTypes | null;
}

export interface TestConfig {
  lib: TestLibs;
  name: string;
  type: TestTypes;
}
