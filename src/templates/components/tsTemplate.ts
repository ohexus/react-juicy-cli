import { cssImportTemplate } from './cssImportTemplate';
import { StyleLangExts } from '../../enums';

export const tsTemplate = (name: string, cssExt: StyleLangExts): string => `import React from 'react';
${cssImportTemplate(name, cssExt)}
interface ${name}Props {}

const ${name}: React.FC<${name}Props> = ({}) => (
  <div className="${name.toLowerCase()}" data-testid="${name}.testId">
    ${name} works!
  </div>
);

export default ${name};
`;
