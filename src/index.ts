#!/usr/bin/env node
import reactJuicyCLI from './cli';
import config from './config';
import { chalkColored, clearTerminal, juicyFiglet } from './utils';

(async () => {
  clearTerminal();
  await juicyFiglet();
  await reactJuicyCLI(process.argv);
  config.clear();
})().catch((err: Error) => {
  config.clear();
  console.log(chalkColored(`\n${err.message}\n`, 'Red'));
  process.exit(1);
});
