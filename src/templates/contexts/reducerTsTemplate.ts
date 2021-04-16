const reducerTsTemplate = (name: string): string => `import { initial${name}State } from './${name}';
import { ${name}Actions, ${name}ActionTypes } from './${name}Types';

export const ${name}Reducer = (currentState = initial${name}State, action: ${name}Actions): ${name}State => {
  switch (action.type) {
    case ${name}ActionTypes.ClearState:
      return initial${name}State;

    case ${name}ActionTypes.SetStatus:
      return { status: action.payload.status };
  
    case ${name}ActionTypes.ToggleStatus:
      return { status: !currentState.status };

    default:
      throw new Error('Should not come here, something went wrong!');
  }
};
`;

export default reducerTsTemplate;
