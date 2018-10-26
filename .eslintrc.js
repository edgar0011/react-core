module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "babel",
    "flowtype",
    "react",
    "promise"
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "globals": {
    "describe": true,
    "test": true,
    "expect": true,
    "it": true,
    "SyntheticEvent": true,
    "SyntheticKeyboardEvent": true,
    "SyntheticMouseEvent": true,
    "SyntheticTouchEvent": true
  },
  "rules": {
    "no-console": "off",
    "arrow-parens": "off",
    "no-shadow": "off",
    "no-unused-expressions": "off",
    "no-useless-constructor": "off",
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "jsx-quotes": [
      "error",
      "prefer-single"
    ],
    "max-len": [
      "error",
      120,
      2
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "prop-types": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/prop-types": "off",
    "react/forbid-prop-types": "off",
    "react/require-default-props": "off",
    "semi": 0,
    "react/jsx-no-bind": [
      "error",
      {
        "ignoreRefs": false,
        "allowArrowFunctions": false,
        "allowBind": false
      }
    ],
    "react/no-unknown-property": [2, {"ignore": ["class", "for"]}],
    "object-curly-newline": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "jsx-a11y/click-events-have-key-events": 1,
    "react/no-multi-comp": 0
  }
}