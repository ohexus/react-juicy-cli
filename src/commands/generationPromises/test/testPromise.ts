import { switchExt, switchTestExt, switchTestLib } from '../../switchHelpers';
import { writeData } from '../../../utils';

import { ProgLangNames, TestLibs, TestTypes, GenerationEntities } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function testPromise(
  name: string,
  lang: ProgLangNames,
  lib: TestLibs,
  type: TestTypes,
  entity: GenerationEntities,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const testExt = switchTestExt(type);
  const template = switchTestLib(lib, entity, lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${testExt}.${ext}x`, template(name, type))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
