module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/application/interfaces/**/*',
    '!<rootDir>/src/infra/factories/**/*',
    '!<rootDir>/src/infra/shared/config/**/*',
    '!<rootDir>/src/infra/http/**/*',
    '!<rootDir>/src/infra/adapters/controllers/healthcheck/**/*',
    '!<rootDir>/src/infra/adapters/controllers/probes/**/*',
    '!<rootDir>/src/infra/middleware/**/*',
    '!<rootDir>/src/infra/database/**/*',
    '!<rootDir>/src/infra/shared/helpers/**/*',
    '!<rootDir>/src/infra/shared/errors/**/*'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
}
