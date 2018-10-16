module.exports = {
  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  "plugins": [
   "react",
    "babel",
   "flowtype"
  ],
  "env": {
    "jest": true
  },
  "parser": "babel-eslint",
  "rules": {
    "strict": 2,
    "semi": 0,
    "quotes": 2,
    "no-unused-vars": 2,
    "camelcase": 2,
    "no-underscore-dangle": 2,
    "no-console": 0,
    "no-plusplus": 0,
    "no-debugger": 2,
    "comma-dangle": ["error", "only-multiline"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-unknown-property": [2, { "ignore": ["class", "for"] }],
    "react/require-default-props": 0,
    "react/forbid-prop-types": [0, { "forbid": ['array', 'object'] }],
    "class-methods-use-this": 0
  }
};