import { GenerationEntities, Quotes } from '../enums';

export interface GlobalConfig {
  entity: GenerationEntities;
  name: string;
  quotes: Quotes;
}
