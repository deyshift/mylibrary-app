module.exports = {
  preset: "ts-jest", // Use ts-jest to handle TypeScript files
  testEnvironment: "jest-environment-jsdom", // Use jsdom for React components
  setupFilesAfterEnv: ["./jest.setup.ts"], // Jest setup file
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json", // Use tsconfig.test.json for Jest
    },
  },
  moduleNameMapper: {
    "^@config$": "<rootDir>/config.ts", // Map @config to config.ts
    "^@src/(.*)$": "<rootDir>/src/$1", // Map @src/* to the src folder
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
};