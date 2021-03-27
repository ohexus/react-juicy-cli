import { ProgLangNames } from '../enums';

export interface ContextConfigBasic {
  prog: ProgLangNames | null;
  name: string | null;
}

export interface ContextConfig {
  prog: ProgLangNames;
  name: string;
}
