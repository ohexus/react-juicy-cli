import generateEntity from '../../generateEntity';
import { switchExt, switchHookTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function hookPromise(
  dir: string,
  name: string,
  lang: ProgLangNames,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchHookTemplate(lang);

  return generateEntity(`${dir}/${name}.${ext}`, template(name));
}
