import { GenerationEntities, ProgLangNames, Quotes } from '../enums';

export interface GlobalConfig {
  entity: GenerationEntities;
  name: string;
  prog: ProgLangNames;
  quotes: Quotes;
}
