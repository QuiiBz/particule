module.exports = {
  extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
  },
};
