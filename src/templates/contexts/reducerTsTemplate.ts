export const reducerTsTemplate = (
  name: string = 'ContextTemplate',
): string => `import { ${name}Actions, ${name}ActionTypes } from './${name}Types';

import { INITIAL_${name.toUpperCase()}_STATE } from './${name}';

export const ${name}Reducer = (
  currentState = INITIAL_${name.toUpperCase()}_STATE,
  action: ${name}Actions,
) => {
  switch (action.type) {
    case ${name}ActionTypes.ClearState:
      return INITIAL_${name.toUpperCase()}_STATE;

    case TestContextActionTypes.SetStatus:
      return { status: action.payload.status };
  
    case TestContextActionTypes.ToggleStatus:
      return { status: !currentState.status };

    default:
      throw new Error('Should not come here, something went wrong!');
  }
};
`;
