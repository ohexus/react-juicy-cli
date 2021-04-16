import { switchExt, switchHookTemplate } from '../../switchHelpers';
import { writeData } from '../../../utils';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function hookPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchHookTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${ext}`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
