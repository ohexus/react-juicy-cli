import figlet from 'figlet';

import { chalkColored } from './chalkColored';

export function juicyFiglet() {
  return new Promise((resolve, reject) => {
    figlet.text('Juicy CLI', { font: 'Cyberlarge' }, (err: Error | null, result?: string) => {
      if (err) {
        console.log(chalkColored('Something went wrong...', 'Red'));
        console.dir(err);
        reject(err);
        return;
      }
      if (result) {
        console.log(chalkColored(result, 'Cyan'));
        resolve(result);
        return;
      }
    });
  });
}
