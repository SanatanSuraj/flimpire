// .eslintrc.js
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'] },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'spellcheck', 'prettier'],
  rules: {
    'react/prop-types': 'warn',
    'import/no-unresolved': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'babel',
      },
    ],
    'spellcheck/spell-checker': [
      'warn',
      {
        comments: true,
        strings: true,
        identifiers: true,
        lang: 'en_US',
        skipWords: [
          'redux',
          'mui',
          'eslint',
          'eslintrc',
          'jsx',
          'js',
          'webpack',
          'filmpire',
          'tmdb',
          'navbar',
          'prev',
          'png',
          'params',
          'axios',
          'href',
          'nowrap',
          'flexwrap',
          'subheader',
          'tooltip',
          'vidoes',
          'conatiner',
          'occurred',
          'ecma',
          'lang',
        ],
        skipIfMatch: ['http://[^s]*', '^[-\\w]+/[-\\w\\.]+$'],
        minLength: 3,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['src/legacy/**/*.js'],
      rules: {
        'react/prop-types': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
