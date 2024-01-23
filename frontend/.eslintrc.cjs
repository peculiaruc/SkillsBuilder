module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'no-param-reassign': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
