module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
  ],
  "plugins": [
    "jest"
  ],
  "env": {
    "jest/globals": true
  },
  "rules": {
    "react/jsx-filename-extension": 0
  },
  "overrides": {
    "files": ["*.test.js"],
    "rules": {
      "no-console": 0
    },
  }
};
