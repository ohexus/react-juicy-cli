import { basicIndexTemplate } from '../../../templates';
import generateEntity from '../../generateEntity';
import { switchExt } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function hookIndexPromise(dir: string, name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return generateEntity(`${dir}/index.${ext}`, basicIndexTemplate(name));
}
