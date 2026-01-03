export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "<rootDir>/*.ts",
    "!<rootDir>/jest.config.ts"
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist"]
};
