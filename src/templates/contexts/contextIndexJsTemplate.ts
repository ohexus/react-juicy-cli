const indexTemplate = (name: string): string => `export { ${name} } from './${name}';
export { ${name}Provider } from './${name}Provider';
export { ${name}Reducer } from './${name}Reducer';
export { CLEAR_STATE, SET_STATUS, TOGGLE_STATUS } from './${name}Types';
`;

export default indexTemplate;
