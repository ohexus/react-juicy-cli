import { sassTemplate, cssTemplate } from '../../../templates';
import { writeData } from '../../../utils';

import { StyleLangs } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function styleSheetPromise(name: string, lang: StyleLangs): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}.${lang}`, (lang === StyleLangs.SASS ? sassTemplate : cssTemplate)(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
