import { basicIndexTemplate } from '../../../templates';
import { writeData } from '../../../utils';
import { switchExt } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function componentIndexPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/index.${ext}`, basicIndexTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
