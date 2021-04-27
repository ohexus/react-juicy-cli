const relativePaths = '{.,..,../..,../../..,../../../..}';

module.exports = {
  reportUnusedDisableDirectives: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    project: './src/tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
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
        groups: ['builtin', 'external', 'internal', 'index', 'parent', 'sibling', 'object'],
        pathGroups: [
          {
            pattern: `${relativePaths}/config`,
            group: 'internal',
            position: 'before',
          },
          {
            pattern: `${relativePaths}/{commands,constants,questions,templates,utils}`,
            group: 'index',
            position: 'before',
          },
          {
            pattern: `${relativePaths}/{enums,interfaces}`,
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'sort-imports': 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 'off',
    'max-len': ['error', { code: 120, ignoreTemplateLiterals: true, tabWidth: 2 }],
    'no-console': 'off',
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