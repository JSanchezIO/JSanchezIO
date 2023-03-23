import type { Linter } from 'eslint';
import { RuleSeverity } from './constants';

export const testingConfig = {
  files: ['**/*.test.*'],
  plugins: ['jest'],
  rules: {
    'jest/consistent-test-it': [RuleSeverity.Warn, { fn: 'test' }],
    'jest/no-conditional-expect': RuleSeverity.Warn,
    'jest/no-deprecated-functions': RuleSeverity.Warn,
    'jest/no-disabled-tests': RuleSeverity.Warn,
    'jest/no-export': RuleSeverity.Error,
    'jest/no-focused-tests': RuleSeverity.Warn,
    'jest/no-identical-title': RuleSeverity.Warn,
    'jest/no-interpolation-in-snapshots': RuleSeverity.Warn,
    'jest/no-jasmine-globals': RuleSeverity.Error,
    'jest/no-mocks-import': RuleSeverity.Warn,
    'jest/valid-describe-callback': RuleSeverity.Error,
    'jest/valid-expect-in-promise': RuleSeverity.Error,
    'jest/valid-expect': RuleSeverity.Error,
  },
  settings: {
    jest: {
      version: 27,
    },
  },
} satisfies Linter.ConfigOverride;
