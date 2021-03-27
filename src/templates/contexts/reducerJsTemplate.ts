export const reducerJsTemplate = (
  name: string = 'ContextTemplate',
): string => `import { initial${name}State } from './${name}';
import { CLEAR_STATE, SET_STATUS, TOGGLE_STATUS } from './${name}Types';

export const ${name}Reducer = (currentState = initial${name}State, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return initial${name}State;

    case SET_STATUS:
      return { status: action.payload.status };
  
    case TOGGLE_STATUS:
      return { status: !currentState.status };

    default:
      throw new Error('Should not come here, something went wrong!');
  }
};
`;
