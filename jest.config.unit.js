module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
   moduleFileExtensions: ['ts', 'js'],
   testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
   globalTeardown: '<rootDir>/test/unit/setup/globalTeardown.ts',
   setupFilesAfterEnv: ['<rootDir>/test/unit/setup/setupFile.ts'],
   watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
