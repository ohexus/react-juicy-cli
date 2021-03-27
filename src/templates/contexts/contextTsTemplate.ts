export const contextTsTemplate = (name: string = 'ContextTemplate'): string => `import React from 'react';
import { ${name}State } from './types';

export const INITIAL_${name.toUpperCase}_STATE: ${name}State = {
  status: false,
};

export const ${name}Context = React.createContext<${name}State>(INITIAL_${name.toUpperCase}_STATE);
`;
