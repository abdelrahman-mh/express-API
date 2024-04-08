module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
   moduleFileExtensions: ['ts', 'js'],
   testMatch: ['<rootDir>/test/integration/**/*.test.ts'],
   globalSetup: '<rootDir>/test/integration/globalSetup.ts',
   globalTeardown: '<rootDir>/test/integration/globalTeardown.ts',
   setupFilesAfterEnv: ['<rootDir>/test/integration/setupFile.ts'],
   watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
