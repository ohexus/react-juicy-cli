const genRelativePaths = (depth) => {
  const paths = ['.'];

  for (let i = 1; i <= depth; i++) {
    paths.push(new Array(i).fill('..').join('/'));
  }

  return `{${paths.join(',')}}`;
};

// Increase number if structure depth grows.
// Unfortunately import/order doesn't want to handle leading paths like this: '**'
const relativePaths = genRelativePaths(6);

module.exports = {
  reportUnusedDisableDirectives: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    project: './src/tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', 'jest', '@typescript-eslint'],
  rules: {
    // typescript-eslint overrides.
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'import/extensions': ['error', 'never', { json: 'always' }],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: `${relativePaths}/__mocks__{,/*}`,
            group: 'internal',
            position: 'before',
          },
          {
            pattern: `${relativePaths}/config`,
            group: 'internal',
            position: 'after',
          },
          {
            pattern: `${relativePaths}/{enums,interfaces}`,
            group: 'index',
            position: 'after',
          },
          {
            pattern: `./**`,
            group: 'sibling',
            position: 'after',
          },
          {
            pattern: `${relativePaths}/**`,
            group: 'parent',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'sort-imports': 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-mocks-import': 'off',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-expect': 'error',
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 'off',
    'max-len': ['error', { code: 100, ignoreTemplateLiterals: true, tabWidth: 2 }],
    'no-console': 'off',
    'no-multiple-empty-lines': 'error',
    'object-curly-newline': ['error', { consistent: true }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        project: './src',
      },
    },
  },
};
