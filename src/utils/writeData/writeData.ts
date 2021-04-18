import fs from 'fs';

import { StatusMessages } from '../enums';
import { PromiseReturnStatus } from '../interfaces';

function writeData(path: string, data: string): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      resolve(StatusMessages.Success);
    });
  });
}

export default writeData;
