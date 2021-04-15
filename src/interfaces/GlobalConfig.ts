import { GenerationEntities, ProgLangNames, Quotes } from '../enums';

export interface GlobalConfig {
  entity: GenerationEntities;
  prog: ProgLangNames;
  skipStyles: boolean;
  skipTests: boolean;
  quotes: Quotes;
}
