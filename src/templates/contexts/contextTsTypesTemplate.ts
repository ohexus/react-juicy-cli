import { Quotes } from '../../enums';

export const contextTsTypesTemplate = (name: string, quotes: Quotes): string => `export enum ${name}ActionTypes {
  ClearState = ${quotes}CLEAR_STATE${quotes},
  SetStatus = ${quotes}SET_STATUS${quotes},
  ToggleStatus = ${quotes}TOGGLE_STATUS${quotes},
}

export interface Clear${name}Action {
  type: typeof ${name}ActionTypes.ClearState;
}

export interface Set${name}StatusAction {
  type: typeof ${name}ActionTypes.SetStatus;
  payload: {
    status: boolean;
  };
}

export interface Toggle${name}StatusAction {
  type: typeof ${name}ActionTypes.ToggleStatus;
}

export type ${name}Actions =
  | Clear${name}Action
  | Set${name}StatusAction
  | Toggle${name}StatusAction;

export interface ${name}State {
  status: boolean;
}
`;
