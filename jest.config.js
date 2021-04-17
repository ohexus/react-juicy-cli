// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  cacheDirectory: '<rootDir>/.jestcache',

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['/node_modules/'],

  coverageReporters: [
    // 'json',
    ['text', { skipFull: true }],
    'text-summary',
    'lcov',
    // 'clover',
  ],

  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
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

  testMatch: ['**/*.spec.ts?(x)', '**/*.test.ts?(x)'],
};
