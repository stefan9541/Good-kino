module.exports = {
  'plugins': [],
  'extends': ['airbnb'],
  'rules': {
    "quotes": [2, "double", { "avoidEscape": true }],
    "react/jsx-fragments": "off",
    "react/prop-types": "off",
    "react/prefer-stateless-function": "off",
    "linebreak-style": ["error", "windows"],
    'no-case-declarations': 'off',
    'array-bracket-spacing': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true, }],
    'indent': ['error', 2, { "SwitchCase": 1 }],
    'max-len': ['error', 120],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1 }],
    'no-inline-comments': ['error'],
    'no-param-reassign': ["error", { "props": false }],
    'no-underscore-dangle': 'off',
    'operator-linebreak': ['error', 'before'],
    'prefer-arrow-callback': ['error', { 'allowNamedFunctions': true }],
    'semi': ['error', 'always'],
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'import/prefer-default-export': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'import/no-named-as-default': 'off',
    'jsx-a11y/alt-text': 'off',
    'consistent-return': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'default-case': 'off',
    'no-console': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'arrow-body-style': 'off',
    
  },
  'globals': {
    'expectObservable': true,
    'hot': true,
    'cold': true,
    '__DEV__': false,
    'DEVELOPMENT_MODE': true
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  }
};