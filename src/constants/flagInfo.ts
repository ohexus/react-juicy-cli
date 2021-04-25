import { cyanStr } from '../utils/chalkColored';

const FLAG_INFO = [
  {
    flags: ['-h', '--help'],
    desc: `display help for ${cyanStr('react-juicy-cli')}`,
  },
  {
    flags: ['-v', '--version'],
    desc: 'display current version',
  },
  {
    flags: ['--cmp', '--component <string>'],
    desc: `specify component name and tell CLI to generate a ${cyanStr('component')}`,
  },
  {
    flags: ['--ctx', '--context <string>'],
    desc: `specify context name and tell CLI to generate a ${cyanStr('context')}`,
  },
  {
    flags: ['--hk', '--hook <string>'],
    desc: `specify hook name and tell CLI to generate a ${cyanStr('hook')}`,
  },
  {
    flags: ['--test'],
    desc: `specify test name and tell CLI to generate a ${cyanStr('test')}`,
  },
  {
    flags: ['--js', '--javascript'],
    desc: `generate ${cyanStr('JavaScript')} component`,
  },
  {
    flags: ['--ts', '--typescript'],
    desc: `generate ${cyanStr('TypeScript')} component`,
  },
  {
    flags: ['--css'],
    desc: `generate ${cyanStr('CSS')}`,
  },
  {
    flags: ['--scss'],
    desc: `generate ${cyanStr('SCSS')}`,
  },
  {
    flags: ['--sass'],
    desc: `generate ${cyanStr('SASS')}`,
  },
  {
    flags: ['--less'],
    desc: `generate ${cyanStr('LESS')}`,
  },
  {
    flags: ['--enz', '--enzyme'],
    desc: `use ${cyanStr('enzyme')}`,
  },
  {
    flags: ['--test-lib', '--testing-library'],
    desc: `use ${cyanStr('React Testing Library')}`,
  },
  {
    flags: ['-u', '--unit'],
    desc: `generate .spec file according to your component ${cyanStr('extension (tsx | jsx)')}`,
  },
  {
    flags: ['-i', '--integration'],
    desc: `generate .test file according to your component ${cyanStr('extension (tsx | jsx)')}`,
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
    desc: `tell generator that you prefer ${cyanStr('single')}`,
  },
  {
    flags: ['--dq', '--double-quotes'],
    desc: `tell generator that you prefer ${cyanStr('double')}`,
  },
];

export default FLAG_INFO;
