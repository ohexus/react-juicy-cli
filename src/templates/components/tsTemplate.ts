import cssImportTemplate from './cssImportTemplate';

import { Quotes, StyleLangs } from '../../enums';

const tsTemplate = (name: string, cssExt: StyleLangs, quotes: Quotes): string => `import React from 'react';
${cssImportTemplate(name, cssExt)}
interface ${name}Props {}

const ${name}: React.FC<${name}Props> = ({}) => (
  <div className=${quotes}${name.toLowerCase()}${quotes} data-testid=${quotes}${name}.testId${quotes}>
    ${name} works!
  </div>
);

export default ${name};
`;

export default tsTemplate;
