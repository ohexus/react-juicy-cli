import { Quotes } from '../../enums';

export const reducerTsTemplate = (
  name: string,
  quotes: Quotes,
): string => `import { initial${name}State } from ${quotes}./${name}${quotes};
import { ${name}Actions, ${name}ActionTypes } from ${quotes}./${name}Types${quotes};

export const ${name}Reducer = (currentState = initial${name}State, action: ${name}Actions) => {
  switch (action.type) {
    case ${name}ActionTypes.ClearState:
      return initial${name}State;

    case TestContextActionTypes.SetStatus:
      return { status: action.payload.status };
  
    case TestContextActionTypes.ToggleStatus:
      return { status: !currentState.status };

    default:
      throw new Error(${quotes}Should not come here, something went wrong!${quotes});
  }
};
`;
