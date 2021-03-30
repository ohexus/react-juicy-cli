export const providerJsTemplate = (name: string): string => `import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { ${name}, initial${name}State } from './${name}';
import { ${name}Reducer } from './${name}Reducer';
import { CLEAR_STATE, SET_STATUS, TOGGLE_STATUS } from './${name}Types';

const ${name}ProviderPropsTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired;
};

export const ${name}Provider = ({ children }) => {
  const [${name}State, dispatch${name}] = useReducer(${name}Reducer, initial${name}State);
  
  const clearState = () => {
    dispatch${name}({ type: CLEAR_STATE });
  };

  const setStatus = (status) => {
    dispatch${name}({ type: SET_STATUS, payload: { status } });
  };

  const toggleStatus = () => {
    dispatch${name}({ type: TOGGLE_STATUS });
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

${name}Provider.propsTypes = ${name}ProviderPropsTypes;
`;
