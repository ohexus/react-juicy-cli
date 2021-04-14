import reactJuicyCLI from './cli';
import { chalkColored, clearTerminal, juicyFiglet } from './utils';

(async () => {
  clearTerminal();
  await juicyFiglet();
  await reactJuicyCLI(process.argv);
})().catch((err: Error) => {
  console.log(chalkColored(`\n${err.message}\n`, 'Red'));
  process.exit(1);
});
