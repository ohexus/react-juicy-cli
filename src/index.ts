#!/usr/bin/env node
import clear from 'clear';
import reactJuicyCLI from './cli';
import { juicyFiglet } from './utils';

(async () => {
  clear();
  await juicyFiglet();
  reactJuicyCLI(process.argv);
})();
