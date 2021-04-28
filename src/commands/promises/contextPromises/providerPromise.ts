import generateEntity from '../../generateEntity';
import { switchExt, switchContextProviderTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function providerPromise(dir: string, name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextProviderTemplate(lang);

  return generateEntity(`${dir}/${name}Provider.${ext}x`, template(name));
}
