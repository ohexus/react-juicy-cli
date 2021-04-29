import { sassTemplate, cssTemplate } from '../../../templates';
import generateEntity from '../../generateEntity';

import { StyleLangs } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function styleSheetPromise(
  dir: string,
  name: string,
  lang: StyleLangs,
): Promise<PromiseReturnStatus> {
  return generateEntity(
    `${dir}/${name}.${lang}`,
    (lang === StyleLangs.SASS ? sassTemplate : cssTemplate)(name),
  );
}
