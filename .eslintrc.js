module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    'linebreak-style': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-console': 0,
  },
};
