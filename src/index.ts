import reactJuicyCLI from './cli';
import { clearTerminal, juicyFiglet } from './utils';

(async () => {
  clearTerminal();
  await juicyFiglet();
  await reactJuicyCLI(process.argv);
})();
