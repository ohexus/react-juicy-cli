function logHelp(): void {
  console.log(`
  Usage: react-juicy-cli [flags <string?>]

  Available flags:

  -h, --help                          display help for react-juicy-cli
  -v, --version                       display current version
  --cmp, --component <string>         specify component name and tell CLI to generate a component
  --ctx, --context <string>           specify context name and tell CLI to generate a context
  --hk, --hook <string>               specify hook name and tell CLI to generate a hook
  --js, --javascript                  generate JavaScript component
  --ts, --typescript                  generate TypeScript component
  -u, --unit                          generate unit test
  -i, --integration                   generate integration test
  --css                               generate CSS file
  --scss                              generate SCSS file
  --sass                              generate SASS file
  --less                              generate LESS file
  --enz, --enzyme                     generate .spec file according to your component extension (tsx \| jsx)
  --test-lib, --testing-library       generate .test file according to your component extension (tsx \| jsx)
  --skipS, --skip-styles              skip styles step and generate component with tests
  --skipT, --skip-tests               skip tests step and generate component with styles
  --skip                              skip styles and tests and generate only component
  --sq, --single-quotes               show the generator that you prefer single quotes
  --dq, --double-quotes               show the generator that you prefer double quotes

  Alternative flags:

  --skip-styles:                      --skip-style, --skipStyle, --skipStyles,
  --skip-tests:                       --skip-test, --skipTest, --skipTests,
  --testing-library:                  --testing-lib, --testingLib, --testingLibrary
`);
}

export default logHelp;
