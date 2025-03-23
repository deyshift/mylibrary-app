module.exports = {
  preset: "ts-jest", // Use ts-jest to handle TypeScript files
  testEnvironment: "jest-environment-jsdom", // Explicitly specify the jsdom environment,
  setupFilesAfterEnv: ["./jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json", // Use tsconfig.test.json for tests
    },
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
};