import generateEntity from '../../generateEntity';
import { switchExt, switchContextReducerTemplate } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function reducerPromise(dir: string, name: string, lang: ProgLangNames): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const template = switchContextReducerTemplate(lang);

  return generateEntity(`${dir}/${name}Reducer.${ext}`, template(name));
}
