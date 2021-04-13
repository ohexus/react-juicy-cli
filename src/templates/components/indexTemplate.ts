const indexTemplate = (name: string): string => `export { default } from './${name}';
`;

export default indexTemplate;
