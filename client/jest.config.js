module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub" // Fix bug loading SCSS in Jest
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["<rootDir>/src/**/(*.)test.{js, jsx}"], // finds test
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1" // For using @ as shortcut path to src
  },
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFiles: ["jest-localstorage-mock"], // Mock localStorage in Jest
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};
