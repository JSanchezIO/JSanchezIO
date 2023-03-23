import { getConfiguration } from './configuration';

export const run = (): Commitlint.API.Configuration => {
  const config = getConfiguration();
  const hasScopes = Boolean(config.scopes?.length);
  const maxLineLength = 120;
  const supportedCases: Commitlint.API.Casing[] = [
    'camel-case',
    'kebab-case',
    'lower-case',
    'pascal-case',
    'sentence-case',
    'snake-case',
    'start-case',
    'upper-case',
  ];

  return {
    parserPreset: 'conventional-changelog-ghostwriter',
    rules: {
      'body-leading-blank': [2, 'always'],
      'body-max-line-length': [2, 'always', maxLineLength],
      'footer-leading-blank': [2, 'always'],
      'footer-max-line-length': [2, 'always', maxLineLength],
      'header-max-length': [2, 'always', maxLineLength],
      'scope-enum': [hasScopes ? 2 : 0, 'always', config.scopes.map(({ type }) => type)],
      'scope-case': [0, 'always', supportedCases],
      'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
      'subject-empty': [2, 'never'],
      'subject-exclamation-mark': [2, 'never'],
      'subject-full-stop': [2, 'never', '.'],
      'type-case': [0, 'always', supportedCases],
      'type-empty': [2, 'never'],
      'type-enum': [2, 'always', config.types.map(({ type }) => type)],
    },
  };
};
