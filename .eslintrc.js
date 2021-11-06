module.exports = {
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-param-reassign': 'off'
  }
}
