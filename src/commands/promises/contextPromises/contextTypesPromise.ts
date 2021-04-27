import { writeData } from '../../../utils';
import { switchExt, switchContextTypesTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function contextTypesPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextTypesTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Types.${ext}`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
