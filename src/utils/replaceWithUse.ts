import { capitalizeFirstLetter } from './capitalizeFirstLetter';

const useRegex = /^(u?s?e?)/i;

export function replaceWithUse(str: string): string {
  if (str.length <= 3 || !str.slice(0, 3).match(useRegex)) {
    return 'use' + capitalizeFirstLetter(str);
  }

  const replaced = str.replace(useRegex, 'use');

  return replaced.slice(0, 3) + capitalizeFirstLetter(replaced.slice(3));
}
