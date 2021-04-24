// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  cacheDirectory: '<rootDir>/.jestcache',

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/enums/',
    '/templates/',
    'index.ts',
    'askAndGenerate.ts',
    'chalkColored.ts',
    'clearTerminal.ts',
    'cliTables.ts',
    'config.ts',
    'juicyFiglet.ts',
  ],

  coverageReporters: [
    // 'json',
    ['text', { skipFull: true }],
    'text-summary',
    'lcov',
    // 'clover',
  ],

  coverageThreshold: {
    global: {
      statements: 86,
      branches: 77,
      functions: 94,
      lines: 85,
    },
  },

  errorOnDeprecated: true,

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  moduleDirectories: ['<rootDir>', 'node_modules', 'src'],

  moduleNameMapper: {
    'package.json': '<rootDir>/__mocks__/mock.package.json',
  },

  modulePaths: ['<rootDir>'],

  preset: 'ts-jest',

  resetMocks: true,

  roots: ['<rootDir>'],

  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
};
