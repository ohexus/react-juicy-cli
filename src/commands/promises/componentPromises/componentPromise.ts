import { switchExt, switchComponentTemplate } from '../../switchHelpers';
import { writeData } from '../../../utils';

import { ProgLangNames, StyleLangs, Quotes } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function componentPromise(
  name: string,
  lang: ProgLangNames,
  sslang: StyleLangs,
  quotes: Quotes,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchComponentTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}x`, template(name, sslang, quotes))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
