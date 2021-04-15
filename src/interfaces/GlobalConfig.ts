import { GenerationEntities, ProgLangNames, Quotes } from '../enums';

interface GlobalConfig {
  entity: GenerationEntities;
  prog: ProgLangNames;
  skipStyles: boolean;
  skipTests: boolean;
  quotes: Quotes;
}

export default GlobalConfig;
