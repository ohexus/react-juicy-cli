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

You can provide flags to skip questionnaire and generate component in 1 line of code. Example:

```bash
$ react-juicy-cli --component testComponent --javascript --scss
```

or

```bash
$ react-juicy-cli -c testComponent --ts --css
```

## Available flags

Don't worry if you miss a few flags, the CLI will ask you a question from a questionnaire about the missing info.

### Flags

| flag                | interface | description                                                            |
| ------------------- | --------- | ---------------------------------------------------------------------- |
| '--component'       | String    | specify component name and tell CLI to generate a component            |
| '--javascript'      | Boolean   | generate JavaScript component                                          |
| '--typescript'      | Boolean   | generate TypeScript component                                          |
| '--css'             | Boolean   | generate CSS file                                                      |
| '--scss'            | Boolean   | generate SCSS file                                                     |
| '--sass'            | Boolean   | generate SASS file                                                     |
| '--less'            | Boolean   | generate LESS file                                                     |
| '--enzyme'          | Boolean   | generate .spec file according to your component extension (tsx \| jsx) |
| '--testing-library' | Boolean   | generate .test file according to your component extension (tsx \| jsx) |

### Aliases

| alias        | flag                |
| ------------ | ------------------- |
| '-c'         | '--component'       |
| '--js'       | '--javascript'      |
| '--ts'       | '--typescript'      |
| '--enz'      | '--enzyme'          |
| '--test-lib' | '--testing-library' |

## License

react-juicy-cli is open source software licensed as MIT.
