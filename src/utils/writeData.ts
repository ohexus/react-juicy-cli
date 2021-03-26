import fs from 'fs';

import { PromiseReturnStatus } from '../interfaces';

export function writeData(path: string, data: string): Promise<PromiseReturnStatus> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      resolve('Success!');
    });
  });
}
