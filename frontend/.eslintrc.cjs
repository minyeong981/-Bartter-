module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:import/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '**/routeTree.gen.*',
    'vite.config.*',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 0
  },
  settings:{
    react: {
      version: 'detect',
    },
  }
};