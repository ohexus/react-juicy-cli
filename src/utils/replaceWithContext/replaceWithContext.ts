import capitalizeFirstLetter from './capitalizeFirstLetter';

const contextRegex = /^(c?o?n?t?e?x?t?)/i;

function replaceWithContext(str: string): string {
  if (!contextRegex.exec(str.slice(-7))) {
    return capitalizeFirstLetter(str) + 'Context';
  }

  const replaced = str.replace(contextRegex, 'Context');

  return capitalizeFirstLetter(replaced);
}

export default replaceWithContext;
