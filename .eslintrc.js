module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["prettier"],
  parser: "babel-eslint",
  env: {
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    browser: true
  },
  rules: {
    "import/prefer-default-export": 0,
    "max-lines-per-function": ["error", 25],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "react/prop-types": 0,
    "import/imports-first": ["error", "absolute-first"],
    "import/newline-after-import": "error"
  },
  globals: {
    window: true,
    document: true
  }
};
