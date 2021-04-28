import { writeData } from '../../utils';

import { PromiseReturnStatus } from '../../interfaces';

export default function generateEntity(path: string, template: string): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    writeData(path, template)
      .then((status) => resolve(status))
      .catch((error) => reject(error));
  });
}
