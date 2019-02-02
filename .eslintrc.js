module.exports = {
  extends: [
    "airbnb-base",
  ],
  env: {
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true
  },
  rules: {
    "import/prefer-default-export": 0,
    "max-lines-per-function": ["error", 25],
    "no-console": ["error", { allow: ["warn", "error"] }],
  }
};