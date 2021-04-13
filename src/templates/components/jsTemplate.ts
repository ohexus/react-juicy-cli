import cssImportTemplate from './cssImportTemplate';

import { Quotes, StyleLangs } from '../../enums';

const jsTemplate = (name: string, cssExt: StyleLangs, quotes: Quotes): string => `import React from 'react';
import PropTypes from 'prop-types';
${cssImportTemplate(name, cssExt)}
const ${name}PropTypes = {}

const ${name} = () => (
  <div className=${quotes}${name.toLowerCase()}${quotes} data-testid=${quotes}${name}.testId${quotes}>
    ${name} works!
  </div>
);

${name}.propTypes = ${name}PropTypes;

export default ${name};
`;

export default jsTemplate;
