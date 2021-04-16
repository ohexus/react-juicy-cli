import chalk from 'chalk';

import { Colors } from '../enums';

function chalkColored(str: string, color: keyof typeof Colors): string {
  return chalk.hex(Colors[color])(str);
}

export const blueStr = (str: string): string => chalkColored(str, 'Blue');
export const cyanStr = (str: string): string => chalkColored(str, 'Cyan');
export const greenStr = (str: string): string => chalkColored(str, 'Green');
export const indigoStr = (str: string): string => chalkColored(str, 'Indigo');
export const redStr = (str: string): string => chalkColored(str, 'Red');
export const yellowStr = (str: string): string => chalkColored(str, 'Yellow');
