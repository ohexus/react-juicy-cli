import { StyleLangExts } from '../../enums';

export const cssImportTemplate = (name: string, cssExt: StyleLangExts): string => {
  if (cssExt && cssExt.length && cssExt !== StyleLangExts.Skip) {
    return '\n' + `import './${name}.${cssExt}';` + '\n';
  }

  return '';
};
