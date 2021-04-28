import generateEntity from '../../generateEntity';
import { switchContextIndexTemplate, switchExt } from '../../switchHelpers';

import { ProgLangNames } from '../../../enums';
import { PromiseReturnStatus } from '../../../interfaces';

export default function contextIndexPromise(
  dir: string,
  name: string,
  lang: ProgLangNames,
): Promise<PromiseReturnStatus> {
  const ext = switchExt(lang);
  const indexTemplate = switchContextIndexTemplate(lang);

  return generateEntity(`${dir}/index.${ext}`, indexTemplate(name));
}
