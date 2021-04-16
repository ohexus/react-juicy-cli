const contextTsTemplate = (name: string): string => `import React from 'react';
import { ${name}State } from './${name}Types';

export const initial${name}State: ${name}State = {
  status: false,
};

export const ${name} = React.createContext<${name}State>(initial${name}State);
`;

export default contextTsTemplate;
