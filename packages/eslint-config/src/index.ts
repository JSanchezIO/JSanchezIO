import type { Linter } from 'eslint';
import { RuleSeverity } from './constants';
import { reactConfigs } from './react';
import { testingConfig } from './testing';

const config = {
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['**/dist/**/*.*'],
  overrides: [
    ...reactConfigs,
    testingConfig,
    {
      files: ['*.ts{,x}'],
      rules: {
        '@typescript-eslint/no-var-requires': RuleSeverity.Off,
        '@typescript-eslint/consistent-type-imports': RuleSeverity.Warn,
      },
    },
    {
      files: ['*.js'],
      plugins: ['import'],
      rules: {
        'import/no-unresolved': [
          RuleSeverity.Error,
          {
            commonjs: true,
          },
        ],
        '@typescript-eslint/no-var-requires': RuleSeverity.Off,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
} satisfies Linter.Config;

export = config;
