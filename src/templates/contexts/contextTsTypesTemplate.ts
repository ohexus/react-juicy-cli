export const contextTsTypesTemplate = (name: string = 'ContextTemplate'): string => `export enum ${name}ActionTypes {
  ClearState = 'CLEAR_STATE',
  SetStatus = 'SET_STATUS',
  ToggleStatus = 'TOGGLE_STATUS',
}

export interface Clear${name}Action {
  type: typeof ${name}ActionTypes.ClearState;
}

export interface Set${name}StatusAction {
  type: typeof ${name}ActionTypes.SetStatus;
  payload: {
    status: boolean;
  }
}

export interface Toggle${name}StatusAction {
  type: typeof ${name}ActionTypes.ClearState;
}

export type ${name}Actions =
| Clear${name}Action;
| Set${name}StatusAction;
| Toggle${name}StatusAction;

export interface ${name}State {
  status: boolean;
}
`;
