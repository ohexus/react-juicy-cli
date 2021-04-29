import { GenerationEntities, ProgLangNames, Quotes } from '../enums';

interface GlobalConfig {
  entity: GenerationEntities;
  path: string | null;
  prog: ProgLangNames;
  skipStyles: boolean;
  skipTests: boolean;
  quotes: Quotes;
}

export default GlobalConfig;
