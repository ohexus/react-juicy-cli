import { Quotes } from '../../enums';

export const reducerJsTemplate = (
  name: string,
  quotes: Quotes,
): string => `import { initial${name}State } from ${quotes}./${name}${quotes};
import { CLEAR_STATE, SET_STATUS, TOGGLE_STATUS } from ${quotes}./${name}Types${quotes};

export const ${name}Reducer = (currentState = initial${name}State, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return initial${name}State;

    case SET_STATUS:
      return { status: action.payload.status };
  
    case TOGGLE_STATUS:
      return { status: !currentState.status };

    default:
      throw new Error(${quotes}Should not come here, something went wrong!${quotes});
  }
};
`;
