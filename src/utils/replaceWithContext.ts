import { capitalizeFirstLetter } from './capitalizeFirstLetter';

const contextRegex = /^(c?o?n?t?e?x?t?)/i;

export function replaceWithContext(str: string): string {
  if (!str.slice(-7).match(contextRegex)) {
    return capitalizeFirstLetter(str) + 'Context';
  }

  const replaced = str.replace(contextRegex, 'Context');

  return capitalizeFirstLetter(replaced);
}