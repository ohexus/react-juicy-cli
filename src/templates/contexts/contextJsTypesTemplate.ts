import { Quotes } from '../../enums';

const contextJsTypesTemplate = (
  name: string,
  quotes: Quotes,
): string => `export const CLEAR_STATE = ${quotes}CLEAR_STATE${quotes};
export const SET_STATUS = ${quotes}SET_STATUS${quotes};
export const TOGGLE_STATUS = ${quotes}TOGGLE_STATUS${quotes};
`;

export default contextJsTypesTemplate;
