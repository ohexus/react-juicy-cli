import generateEntity from '../../generateEntity';
import { switchExt, switchComponentTemplate } from '../../switchHelpers';

import { ProgLangNames, StyleLangs, Quotes } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function componentPromise(
  dir: string,
  name: string,
  lang: ProgLangNames,
  sslang: StyleLangs,
  quotes: Quotes,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchComponentTemplate(lang);

  return generateEntity(`${dir}/${name}.${ext}x`, template(name, sslang, quotes));
}
