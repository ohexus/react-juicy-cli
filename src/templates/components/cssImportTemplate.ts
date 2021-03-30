import { Quotes, StyleLangExts } from '../../enums';

export const cssImportTemplate = (name: string, cssExt: StyleLangExts, quotes: Quotes): string => {
  if (cssExt && cssExt.length && cssExt !== StyleLangExts.Skip) {
    return '\n' + `import ${quotes}./${name}.${cssExt}${quotes};` + '\n';
  }

  return '';
};
