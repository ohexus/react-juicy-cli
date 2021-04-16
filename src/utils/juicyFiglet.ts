import figlet from 'figlet';
import { cyanStr, redStr } from './chalkColored';

function juicyFiglet(): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    figlet.text('Juicy CLI', { font: 'Cyberlarge' }, (err: Error | null, result?: string) => {
      if (err) {
        console.log(redStr('Something went wrong...'));
        console.dir(err);
        reject(err);
        return;
      }
      if (result) {
        console.log(cyanStr(result));
        resolve(result);
        return;
      }
    });
  });
}

export default juicyFiglet;
