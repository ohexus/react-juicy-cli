import chalk from 'chalk';

import { Colors } from '../enums';

function chalkColored(str: string, color: keyof typeof Colors): string {
  return chalk.hex(Colors[color])(str);
}

export default chalkColored;
