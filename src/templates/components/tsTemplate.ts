import { cssImportTemplate } from './cssImportTemplate';
import { Quotes, StyleLangExts } from '../../enums';

export const tsTemplate = (
  name: string,
  cssExt: StyleLangExts,
  quotes: Quotes,
): string => `import React from ${quotes}react${quotes};
${cssImportTemplate(name, cssExt, quotes)}
interface ${name}Props {}

const ${name}: React.FC<${name}Props> = ({}) => (
  <div className=${quotes}${name.toLowerCase()}${quotes} data-testid=${quotes}${name}.testId${quotes}>
    ${name} works!
  </div>
);

export default ${name};
`;
