import { StyleLangs } from '../../enums';

const cssImportTemplate = (name: string, cssExt: StyleLangs): string => {
  if (cssExt && cssExt.length && cssExt !== StyleLangs.Skip) {
    return '\n' + `import './${name}.${cssExt}';` + '\n';
  }

  return '';
};

export default cssImportTemplate;
