import cssImportTemplate from './cssImportTemplate';

import { Quotes, StyleLangs } from '../../enums';

const componentTsTemplate = (
  name: string,
  cssExt: StyleLangs,
  quotes: Quotes,
): string => `import React, { FC } from 'react';
${cssImportTemplate(name, cssExt)}
export type ${name}Props = {};

const ${name}: FC<${name}Props> = () => (
  <div className=${quotes}${name.toLowerCase()}${quotes} data-testid=${quotes}${name}.testId${quotes}>
    ${name} works!
  </div>
);

export default ${name};
`;

export default componentTsTemplate;
