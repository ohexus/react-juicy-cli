const ALTERNATIVE_FLAGS = [
  {
    flag: '--skip-styles',
    alts: ['--skip-style', '--skipStyle', '--skipStyles'],
  },
  {
    flag: '--skip-tests',
    alts: ['--skip-test', '--skipTest', '--skipTests'],
  },
  {
    flag: '--testing-library',
    alts: ['--testing-lib', '--testingLib', '--testingLibrary'],
  },
  {
    flag: '--test-component',
    alts: ['--tCmp', '--testCmp', '--testComponent'],
  },
  {
    flag: '--test-hook',
    alts: ['--tHk', '--testHk', '--testHook'],
  },
];

export default ALTERNATIVE_FLAGS;
