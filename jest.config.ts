export default {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/docs/', 'types.ts', 'types'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  verbose: true,
};
