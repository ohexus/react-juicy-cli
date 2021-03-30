import { Quotes } from '../../enums';

export const contextJsTemplate = (name: string, quotes: Quotes): string => `import React from ${quotes}react${quotes};

export const initial${name}State = {
  status: false,
};

export const ${name} = React.createContext(initial${name}State);
`;
