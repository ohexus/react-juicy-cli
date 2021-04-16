import { switchExt } from '../../switchHelpers';
import { contextIndexTemplate } from '../../../templates';
import { writeData } from '../../../utils';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function contextIndexPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/index.${ext}`, contextIndexTemplate(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
