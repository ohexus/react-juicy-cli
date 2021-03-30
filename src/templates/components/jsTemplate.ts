import { cssImportTemplate } from './cssImportTemplate';
import { StyleLangExts } from '../../enums';

export const jsTemplate = (name: string, cssExt: StyleLangExts): string => `import React from 'react';
import PropTypes from 'prop-types';
${cssImportTemplate(name, cssExt)}
const ${name}PropTypes = {}

const ${name} = () => (
  <div className="${name.toLowerCase()}" data-testid="${name}.testId">
    ${name} works!
  </div>
);

${name}.propTypes = ${name}PropTypes;

export default ${name};
`;
