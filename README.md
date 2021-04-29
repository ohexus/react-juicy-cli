# react-juicy-cli

This is a Node.js CLI for quickly generating React components!

## Install

npm:

```bash
$ npm install -g react-juicy-cli
```

yarn:

```bash
$ yarn global add react-juicy-cli
```

## Usage

### With questionnaire

Just run

```bash
$ react-juicy-cli
```

and you will get questions about what your component should be.

### With flags

You can provide flags to skip questionnaire and generate component in 1 line. Example:

```bash
$ react-juicy-cli --component TestComponent --typescript --scss --unit --enzyme --double-quotes --path path/to/directory
```

or

```bash
$ react-juicy-cli --cmp TestComponent --js --skip
```

## Available flags

Don't worry if you miss a few flag, the CLI will ask you a question from a questionnaire about missing information.\
The only thing you should know is that the generator uses single quotes and the current directory by default, you will only get the quotes and path questions if no flags are specified.\
If you use arguments and want to swap quotes, use the --single-quotes (--sq) or --double-quotes (--dq) flag.
If you use arguments and want to change path, use the --path (-p) flag.

### Flags

| flag              | interface | description                                                                                              |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| --help            | Boolean   | display help for react-juicy-cli                                                                         |
| --version         | Boolean   | display current version                                                                                  |
| --path            | String    | relative path where to generate a Component/Context/Hook/Test (the current directory is used by default) |
| --component       | String    | specify component name and tell CLI to generate a component                                              |
| --context         | String    | specify context name and tell CLI to generate a context                                                  |
| --hook            | String    | specify hook name and tell CLI to generate a hook                                                        |
| --test            | String    | specify test name and tell CLI to generate a test                                                        |
| --javascript      | Boolean   | generate JavaScript component                                                                            |
| --typescript      | Boolean   | generate TypeScript component                                                                            |
| --css             | Boolean   | generate CSS                                                                                             |
| --scss            | Boolean   | generate SCSS                                                                                            |
| --sass            | Boolean   | generate SASS                                                                                            |
| --less            | Boolean   | generate LESS                                                                                            |
| --enzyme          | Boolean   | use enzyme                                                                                               |
| --testing-library | Boolean   | use React Testing Library                                                                                |
| --unit            | Boolean   | generate .spec file according to the extension of your component (tsx or jsx)                            |
| --integration     | Boolean   | generate .test file according to the extension of your component (tsx or jsx)                            |
| --skip-styles     | Boolean   | skip styles step and generate component with tests                                                       |
| --skip-tests      | Boolean   | skip tests step and generate component with styles                                                       |
| --skip            | Boolean   | skip styles and tests and generate only component                                                        |
| --single-quotes   | Boolean   | tell generator that you prefer single quotes (default)                                                   |
| --double-quotes   | Boolean   | tell generator that you prefer double quotes                                                             |

### Aliases

| alias      | flag              |
| ---------- | ----------------- |
| -h         | --help            |
| -v         | --version         |
| -p         | --path            |
| --cmp      | --component       |
| --ctx      | --context         |
| --hk       | --hook            |
| --js       | --javascript      |
| --ts       | --typescript      |
| --enz      | --enzyme          |
| --test-lib | --testing-library |
| -u         | --unit            |
| -i         | --integration     |
| --skipS    | --skip-styles     |
| --skipT    | --skip-tests      |
| --sq       | --single-quotes   |
| --dq       | --double-quotes   |

### Alternatives

| flag              | alternatives                                  |
| ----------------- | --------------------------------------------- |
| --skip-styles     | --skip-style, --skipStyle, --skipStyles       |
| --skip-tests      | --skip-test, --skipTest, --skipTests          |
| --testing-library | --testing-lib, --testingLib, --testingLibrary |

## Maintainers

- [Taras Moskalenko](https://github.com/ohexus)

## License

MIT.
