import capitalizeFirstLetter from './capitalizeFirstLetter';

const useRegex = /^(u?s?e?)/i;

function replaceWithUse(str: string): string {
  if (str.length <= 3 || !useRegex.exec(str.slice(0, 3))) {
    return 'use' + capitalizeFirstLetter(str);
  }

  const replaced = str.replace(useRegex, 'use');

  return replaced.slice(0, 3) + capitalizeFirstLetter(replaced.slice(3));
}

export default replaceWithUse;
