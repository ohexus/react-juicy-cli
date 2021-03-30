import { Quotes } from '../../enums';

export const contextTsTemplate = (name: string, quotes: Quotes): string => `import React from ${quotes}react${quotes};
import { ${name}State } from ${quotes}./${name}Types${quotes};

export const initial${name}State: ${name}State = {
  status: false,
};

export const ${name} = React.createContext<${name}State>(initial${name}State);
`;
