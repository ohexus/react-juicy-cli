export const providerTsTemplate = (name: string = 'ContextTemplate'): string => `import React, {
  FC,
  ReactNode,
  useReducer,
} from 'react';

import { ${name}, INITIAL_${name.toUpperCase()}_STATE } from './${name}';
import { ${name}Reducer } from './${name}Reducer';
import { ${name}ActionTypes } from './${name}Types';

type ${name}ProviderProps = {
  children: ReactNode;
};

export const ${name}Provider: FC<${name}ProviderProps> = ({ children }) => {
  const [${name}State, dispatch${name}] = useReducer(${name}Reducer, INITIAL_${name.toUpperCase()}_STATE);
  
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
