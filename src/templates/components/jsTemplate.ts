import { cssImportTemplate } from './cssImportTemplate';
import { Quotes, StyleLangExts } from '../../enums';

export const jsTemplate = (
  name: string,
  cssExt: StyleLangExts,
  quotes: Quotes,
): string => `import React from ${quotes}react${quotes};
import PropTypes from ${quotes}prop-types${quotes};
${cssImportTemplate(name, cssExt, quotes)}
const ${name}PropTypes = {}

const ${name} = () => (
  <div className=${quotes}${name.toLowerCase()}${quotes} data-testid=${quotes}${name}.testId${quotes}>
    ${name} works!
  </div>
);

${name}.propTypes = ${name}PropTypes;

export default ${name};
`;
