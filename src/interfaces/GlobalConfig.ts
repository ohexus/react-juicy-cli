import { GenerationEntities, ProgLangNames, Quotes } from '../enums';

export interface GlobalConfig {
  entity: GenerationEntities;
  prog: ProgLangNames;
  quotes: Quotes;
  skipStyles: boolean;
  skipTests: boolean;
}
