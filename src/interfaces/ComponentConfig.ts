import { ProgLangNames, StyleLangs, TestLibs, TestTypes } from '../enums';

export interface ComponentConfigBasic {
  prog: ProgLangNames | null;
  style: StyleLangs | null;
  testLib: TestLibs | null;
  testType: TestTypes | null;
  name: string | null;
  skipStyles: boolean;
  skipTests: boolean;
}

export interface ComponentConfig {
  prog: ProgLangNames;
  style: StyleLangs;
  testLib: TestLibs;
  testType: TestTypes;
  name: string;
  skipStyles: boolean;
  skipTests: boolean;
}
