import { cyanStr as cyan } from '../utils/chalkColored';

const component = cyan('Component');
const context = cyan('Context');
const hook = cyan('Hook');
const test = cyan('Test');
const extension = cyan('extension (tsx | jsx)');

const FLAG_INFO = [
  {
    flags: ['-h', '--help'],
    desc: `display help for ${cyan('react-juicy-cli')}`,
  },
  {
    flags: ['-v', '--version'],
    desc: 'display current version',
  },
  {
    flags: ['-p', '--path'],
    desc: `relative path where to generate a ${component}/${context}/${hook}/${test} (creates a separate folder by default)`,
  },
  {
    flags: ['--cmp', '--component <string>'],
    desc: `specify component name and tell CLI to generate a ${component}`,
  },
  {
    flags: ['--ctx', '--context <string>'],
    desc: `specify context name and tell CLI to generate a ${context}`,
  },
  {
    flags: ['--hk', '--hook <string>'],
    desc: `specify hook name and tell CLI to generate a ${hook}`,
  },
  {
    flags: ['--test'],
    desc: `specify test name and tell CLI to generate a ${test}`,
  },
  {
    flags: ['--js', '--javascript'],
    desc: `generate ${cyan('JavaScript')} component`,
  },
  {
    flags: ['--ts', '--typescript'],
    desc: `generate ${cyan('TypeScript')} component (default)`,
  },
  {
    flags: ['--css'],
    desc: `generate ${cyan('CSS')}`,
  },
  {
    flags: ['--scss'],
    desc: `generate ${cyan('SCSS')} (default)`,
  },
  {
    flags: ['--sass'],
    desc: `generate ${cyan('SASS')}`,
  },
  {
    flags: ['--less'],
    desc: `generate ${cyan('LESS')}`,
  },
  {
    flags: ['--enz', '--enzyme'],
    desc: `use ${cyan('enzyme')} (default)`,
  },
  {
    flags: ['--test-lib', '--testing-library'],
    desc: `use ${cyan('React Testing Library')}`,
  },
  {
    flags: ['-u', '--unit'],
    desc: `generate .spec file according to your component ${extension} (default)`,
  },
  {
    flags: ['-i', '--integration'],
    desc: `generate .test file according to your component ${extension}`,
  },
  {
    flags: ['--skipS', '--skip-styles'],
    desc: 'skip styles step and generate component with tests',
  },
  {
    flags: ['--skipT', '--skip-tests'],
    desc: 'skip tests step and generate component with styles',
  },
  {
    flags: ['--skip'],
    desc: 'skip styles and tests and generate only component',
  },
  {
    flags: ['--sq', '--single-quotes'],
    desc: `tell generator that you prefer ${cyan('single')}`,
  },
  {
    flags: ['--dq', '--double-quotes'],
    desc: `tell generator that you prefer ${cyan('double')}`,
  },
];

export default FLAG_INFO;
