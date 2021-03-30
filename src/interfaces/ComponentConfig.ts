import { ProgLangNames, StyleLangNames, TestLibNames } from '../enums';

export interface ComponentConfigBasic {
  prog: ProgLangNames | null;
  style: StyleLangNames | null;
  testLib: TestLibNames | null;
  name: string | null;
  skipStyles: boolean;
  skipTests: boolean;
}

export interface ComponentConfig {
  prog: ProgLangNames;
  style: StyleLangNames;
  testLib: TestLibNames;
  name: string;
  skipStyles: boolean;
  skipTests: boolean;
}
