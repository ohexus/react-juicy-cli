import { StyleLangs } from '../enums';

export interface ComponentConfigBasic {
  style: StyleLangs | null;
  name: string | null;
}

export interface ComponentConfig {
  style: StyleLangs;
  name: string;
}
