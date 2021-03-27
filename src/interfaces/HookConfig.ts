import { ProgLangNames } from '../enums';

export interface HookConfigBasic {
  prog: ProgLangNames | null;
  name: string | null;
}

export interface HookConfig {
  prog: ProgLangNames;
  name: string;
}
