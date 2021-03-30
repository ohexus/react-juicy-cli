import { StyleLangExts } from '../../enums';

export const tsTemplate = (name: string = 'Component', cssExt: StyleLangExts = StyleLangExts.CSS): string => {
  const cssImport = cssExt === StyleLangExts.SKIP ? '' : '\n' + `import './${name}.${cssExt}';` + '\n';

  return `import React from 'react';
${cssImport}
interface ${name}Props {}

const ${name}: React.FC = (props: ${name}Props) => (
  <div className="${name.toLowerCase()}" data-testid="${name}.testId">
    ${name} works!
  </div>
);

export default ${name};
`;
};
