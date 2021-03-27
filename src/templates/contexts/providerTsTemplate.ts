export const providerTsTemplate = (name: string = 'ContextTemplate'): string => `import React, {
  FC,
  ReactNode,
  useReducer,
} from 'react';

import { ${name}ActionTypes } from './${name}ContextTypes';

import { ${name}Context, INITIAL_${name.toUpperCase}_STATE } from './${name}Context';

type ${name}ContextProviderProps = {
  children: ReactNode;
};

export const ${name}ContextProvider: FC<${name}ContextProviderProps> = ({ children }) => {
  const [${name}State, dispatch${name}] = useReducer(${name}Reducer, INITIAL_${name.toUpperCase}_STATE);
  
  const clearState = () => {
    dispatchCharacter({ type: ${name}ActionTypes.ClearState });
  };

  const setStatus = (status: boolean) => {
    dispatchCharacter({ type: ${name}ActionTypes.SetStatus, payload: { status } });
  };

  const toggleStatus = (color) => {
    dispatchCharacter({ type: ${name}ActionTypes.ToggleStatus });
  };

  return (
    <${name}Context.Provider value={{
      status: ${name}State.status,
      clearState,
      setStatus,
      toggleStatus,
    }}>
      {children}
    </${name}Context.Provider>
  );
};
`;
