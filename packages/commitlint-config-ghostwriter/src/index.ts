import { getConfiguration } from './configuration';

const config = getConfiguration();
const hasScopes = Boolean(config.scopes?.length);
const maxLineLength = 120;

module.exports = {
  parserPreset: 'conventional-changelog-ghostwriter',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', maxLineLength],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', maxLineLength],
    'header-max-length': [2, 'always', maxLineLength],
    'scope-enum': [hasScopes ? 2 : 0, 'always', config.scopes.map(({ type }) => type)],
    'scope-case': [hasScopes ? 0 : 2, 'always', 'kebab-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', config.types.map(({ type }) => type)],
  },
};
