import arg from 'arg';

import {
  GenerationEntities,
  ProgLangNames,
  Quotes,
  StyleLangs,
  TestLibs,
  TestTypes,
} from '../../../enums';

type Entities =
  | typeof GenerationEntities
  | typeof ProgLangNames
  | typeof Quotes
  | typeof StyleLangs
  | typeof TestLibs
  | typeof TestTypes;

type ValueOf<T> = T[keyof T];

function parseValues<EntityType>(entities: EntityType): ValueOf<EntityType> {
  return (Object.keys(entities).map(
    (k) => entities[k as keyof EntityType],
  ) as unknown) as ValueOf<EntityType>;
}

export default function switchEntity<Args extends arg.Spec>(
  args: arg.Result<Args>,
  flags: string[],
  entities: Entities,
): string | null {
  const index = flags.findIndex((flag) => args[flag]);

  return index !== -1 ? parseValues(entities)[index] : null;
}
