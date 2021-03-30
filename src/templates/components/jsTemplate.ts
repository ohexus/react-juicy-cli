import { StyleLangExts } from '../../enums';

export const jsTemplate = (name: string = 'Component', cssExt: StyleLangExts = StyleLangExts.CSS): string => {
  const cssImport = cssExt === StyleLangExts.Skip ? '' : '\n' + `import './${name}.${cssExt}';` + '\n';

  return `import React from 'react';
import PropTypes from 'prop-types';
${cssImport}
const ${name}PropTypes = {}

const ${name} = () => (
  <div className="${name.toLowerCase()}" data-testid="${name}.testId">
    ${name} works!
  </div>
);

${name}.propTypes = ${name}PropTypes;

export default ${name};
`;
};
