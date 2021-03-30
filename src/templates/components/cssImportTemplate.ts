import { StyleLangExts } from '../../enums';

export const cssImportTemplate = (name: string = 'Component', cssExt: StyleLangExts = StyleLangExts.CSS): string => {
  if (cssExt && cssExt.length && cssExt !== StyleLangExts.Skip) {
    return '\n' + `import './${name}.${cssExt}';` + '\n';
  }

  return '';
};
