import { Quotes } from '../../enums';

const providerTsTemplate = (
  name: string,
  quotes: Quotes,
): string => `import React, { ReactNode, useReducer, } from ${quotes}react${quotes};

import { ${name}, initial${name}State } from ${quotes}./${name}${quotes};
import { ${name}Reducer } from ${quotes}./${name}Reducer${quotes};
import { ${name}ActionTypes } from ${quotes}./${name}Types${quotes};

type ${name}ProviderProps = {
  children: ReactNode;
};

export const ${name}Provider: React.FC<${name}ProviderProps> = ({ children }) => {
  const [${name}State, dispatch${name}] = useReducer(${name}Reducer, initial${name}State);
  
  const clearState = () => {
    dispatch${name}({ type: ${name}ActionTypes.ClearState });
  };

  const setStatus = (status: boolean) => {
    dispatch${name}({ type: ${name}ActionTypes.SetStatus, payload: { status } });
  };

  const toggleStatus = () => {
    dispatch${name}({ type: ${name}ActionTypes.ToggleStatus });
  };

  return (
    <${name}.Provider value={{
      status: ${name}State.status,
      clearState,
      setStatus,
      toggleStatus,
    }}>
      {children}
    </${name}.Provider>
  );
};
`;

export default providerTsTemplate;
