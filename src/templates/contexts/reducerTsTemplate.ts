export const reducerTsTemplate = (
  name: string = 'ContextTemplate',
): string => `import { initial${name}State } from './${name}';
import { ${name}Actions, ${name}ActionTypes } from './${name}Types';

export const ${name}Reducer = (currentState = initial${name}State, action: ${name}Actions) => {
  switch (action.type) {
    case ${name}ActionTypes.ClearState:
      return initial${name}State;

    case TestContextActionTypes.SetStatus:
      return { status: action.payload.status };
  
    case TestContextActionTypes.ToggleStatus:
      return { status: !currentState.status };

    default:
      throw new Error('Should not come here, something went wrong!');
  }
};
`;
