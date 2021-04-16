import cssImportTemplate from './cssImportTemplate';

import { Quotes, StyleLangs } from '../../enums';

const componentTsTemplate = (name: string, cssExt: StyleLangs, quotes: Quotes): string => `import React from 'react';
${cssImportTemplate(name, cssExt)}
export interface ${name}Props {}

const ${name}: React.FC<${name}Props> = ({}) => (
  <div className=${quotes}${name.toLowerCase()}${quotes} data-testid=${quotes}${name}.testId${quotes}>
    ${name} works!
  </div>
);

export default ${name};
`;

export default componentTsTemplate;
