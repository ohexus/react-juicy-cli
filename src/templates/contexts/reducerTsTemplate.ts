export const reducerTsTemplate = (name: string = 'ContextTemplate'): string => `import {
  ${name}Actions,
  ${name}ActionTypes,
  ${name}State,
} from './${name}ContextTypes';

import { INITIAL_${name.toUpperCase}_STATE } from './${name}Context';

export const ${name}Reducer = (
  currentState = INITIAL_${name.toUpperCase}_STATE,
  action: ${name}Actions,
) => {
  switch (action.type) {
    case ${name}ActionTypes.ClearState:
      return INITIAL_${name.toUpperCase}_STATE;

    default:
      throw new Error('Should not come here, something went wrong!');
  }
};
`;
