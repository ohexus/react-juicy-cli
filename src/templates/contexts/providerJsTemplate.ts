import { Quotes } from '../../enums';

const providerJsTemplate = (
  name: string,
  quotes: Quotes,
): string => `import React, { useReducer } from ${quotes}react${quotes};
import PropTypes from ${quotes}prop-types${quotes};

import { ${name}, initial${name}State } from ${quotes}./${name}${quotes};
import { ${name}Reducer } from ${quotes}./${name}Reducer${quotes};
import { CLEAR_STATE, SET_STATUS, TOGGLE_STATUS } from ${quotes}./${name}Types${quotes};

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

export default providerJsTemplate;
