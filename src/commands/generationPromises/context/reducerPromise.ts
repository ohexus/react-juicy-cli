import { switchExt, switchContextReducerTemplate } from '../../switchHelpers';
import { writeData } from '../../../utils';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function reducerPromise(name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextReducerTemplate(lang);

  return new Promise((resolve, reject) => {
    writeData(`${name}/${name}Reducer.${ext}`, template(name))
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
