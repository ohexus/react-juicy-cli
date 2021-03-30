import { Quotes } from '../../enums';

export const indexTemplate = (
  name: string,
  quotes: Quotes,
): string => `export { default } from ${quotes}./${name}${quotes};
`;
