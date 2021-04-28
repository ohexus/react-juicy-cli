import generateEntity from '../../generateEntity';
import { switchExt, switchContextTypesTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function contextTypesPromise(
  dir: string,
  name: string,
  lang: ProgLangNames,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTypesTemplate(lang);

  return generateEntity(`${dir}/${name}Types.${ext}`, template(name));
}
