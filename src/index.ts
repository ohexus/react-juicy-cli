#!/usr/bin/env node
import reactJuicyCLI from './cli';
import config from './config';
import { clearTerminal, juicyFiglet, redStr } from './utils';

(async () => {
  clearTerminal();
  await juicyFiglet();
  await reactJuicyCLI(process.argv);
  config.clear();
})().catch((err: Error) => {
  config.clear();
  console.log(redStr(`\n${err.message}\n`));
  process.exit(1);
});
