export const contextJsTemplate = (name: string): string => `import React from 'react';

export const initial${name}State = {
  status: false,
};

export const ${name} = React.createContext(initial${name}State);
`;
