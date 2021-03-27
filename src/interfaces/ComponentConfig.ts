import { ProgLangNames, StyleLangNames, TestLibNames } from '../enums';

export interface ComponentConfigBasic {
  prog: ProgLangNames | null;
  style: StyleLangNames | null;
  testLib: TestLibNames | null;
  name: string | null;
}

export interface ComponentConfig {
  prog: ProgLangNames;
  style: StyleLangNames;
  testLib: TestLibNames;
  name: string;
}
