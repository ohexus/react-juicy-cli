const indexTemplate = (name: string): string => `export { ${name} } from './${name}';
export { ${name}Provider } from './${name}Provider';
export { ${name}Reducer } from './${name}Reducer';
export {
  ${name}ActionTypes,
  Clear${name}Action,
  Set${name}StatusAction,
  Toggle${name}StatusAction,
  ${name}Actions,
  ${name}State,
} from './${name}Types';
`;

export default indexTemplate;
