import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e"],
  moduleNameMapper: {
    // https://stackoverflow.com/questions/42260218/jest-setup-syntaxerror-unexpected-token-export
    "^lodash-es/(.*)$": "<rootDir>/node_modules/lodash/$1",
  },
};

export default createJestConfig(config);
