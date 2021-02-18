module.exports = {
  displayName: {
    name: "prototype-jest",
    color: "bgBlue",
  },
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/dist/**",
    "!**/lib/**",
    "!**/migrations/**",
    "!**/*.config.js",
    "!**/index.tsx",
    "!**/*.d.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  verbose: true,
  watchPlugins: [
    "jest-watch-master",
    "jest-watch-select-projects",
    "jest-watch-suspend",
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
