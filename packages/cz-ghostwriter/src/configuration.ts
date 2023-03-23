/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import { sync as findUpSync } from 'find-up';
import { readFileSync } from 'fs';

type OptionalConfigProps = Pick<Partial<Ghostwriter.Models.Configuration>, 'issueReferencesPrefix'>;

type RequiredConfigProps = Pick<Ghostwriter.Models.Configuration, 'scopes' | 'types'>;

type NonPresetConfig = { preset: undefined } & Ghostwriter.Models.Configuration &
  OptionalConfigProps;

type PresetConfig = { preset: 'github' } & RequiredConfigProps & OptionalConfigProps;

const SUPPORTED_FILES = ['.changelogrc.js', '.changelogrc.json', '.changelogrc'];

let cachedConfig: Ghostwriter.Models.Configuration;

export const getConfiguration = (): Ghostwriter.Models.Configuration => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = findUpSync(SUPPORTED_FILES);

  if (!configPath) {
    throw new Error(
      `You must provide one of the configuration files: ${SUPPORTED_FILES.join(', ')}`
    );
  }

  const config: NonPresetConfig | PresetConfig = configPath.endsWith('.js')
    ? require(configPath)
    : JSON.parse(readFileSync(configPath).toString());

  if (config.scopes?.length) {
    config.scopes = config.scopes.map((scope) => {
      const sanitizedScopeType = scope.type.trim();

      if (!sanitizedScopeType) {
        throw new Error('You provided an empty scope');
      }

      return {
        description: scope.description,
        type: sanitizedScopeType,
      };
    });
  }

  if (!config.types?.length) {
    throw new Error('You must provide types');
  }

  if (!config.issueReferencesPrefix) {
    config.issueReferencesPrefix = 'for';
  }

  if (config.preset === 'github') {
    cachedConfig = {
      issuePrefixes: ['#'],
      issueReferencesPrefix: config.issueReferencesPrefix,
      scopes: config.scopes,
      types: config.types,
    };

    return cachedConfig;
  }

  if (!config.issuePrefixes?.length) {
    throw new Error('You must provide issuePrefixes');
  }

  config.issuePrefixes = config.issuePrefixes.map((issuePrefix) => {
    const sanitizedIssuePrefix = issuePrefix.trim();

    if (!sanitizedIssuePrefix) {
      throw new Error('You provided an empty issue prefix');
    }

    return sanitizedIssuePrefix;
  });

  cachedConfig = config;

  return cachedConfig;
};
