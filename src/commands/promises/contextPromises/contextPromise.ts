import generateEntity from '../../generateEntity';
import { switchExt, switchContextTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function contextPromise(dir: string, name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTemplate(lang);

  return generateEntity(`${dir}/${name}.${ext}`, template(name));
}
