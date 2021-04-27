import { writeData } from '../../../utils';
import { switchExt, switchContextProviderTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function providerPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextProviderTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Provider.${ext}x`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
