export const contextTsTemplate = (name: string = 'ContextTemplate'): string => `import React from 'react';
import { ${name}State } from './${name}Types';

export const INITIAL_${name.toUpperCase()}_STATE: ${name}State = {
  status: false,
};

export const ${name} = React.createContext<${name}State>(INITIAL_${name.toUpperCase()}_STATE);
`;
