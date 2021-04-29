import generateEntity from '../../generateEntity';
import { switchExt, switchTestExt, switchTestLibTemplate } from '../../switchHelpers';

import { ProgLangNames, TestLibs, TestTypes, GenerationEntities } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function testPromise(
  dir: string,
  name: string,
  lang: ProgLangNames,
  lib: TestLibs,
  type: TestTypes,
  entity: GenerationEntities,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const testExt = switchTestExt(type);
  const template = switchTestLibTemplate(lib, entity, lang);

  return generateEntity(`${dir}/${name}.${testExt}.${ext}x`, template(name, type));
}
