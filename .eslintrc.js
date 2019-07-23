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
    "react/jsx-filename-extension": 0,
    "indent": ["error", 2],
    "react/destructuring-assignment": 0,
  },
  "overrides": [
    {
      "files": ["*.test.js"],
      "globals": {
        "Event": true,
        "KeyboardEvent": true,
        "MouseEvent": true,
        "window": true,
      },
      "rules": {
        "no-console": 0,
        "no-empty": 0,
      },
    },
  ],
};
