import fs from 'fs';

import { StatusMessages } from '../../enums';
import { PromiseReturnStatus } from '../../interfaces';

function writeData(path: string, data: string): Promise<PromiseReturnStatus> {
  return new Promise((resolve) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        throw error;
      }
      resolve(StatusMessages.Success);
    });
  });
}

export default writeData;
