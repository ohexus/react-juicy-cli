import chalk from 'chalk';

import { Colors } from '../enums';

export function chalkColored(str: string, color: keyof typeof Colors): string {
  return chalk.hex(Colors[color])(str);
}
