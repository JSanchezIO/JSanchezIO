/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import { sync as findUpSync } from 'find-up';
import { readFileSync } from 'fs';

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

  const config: Partial<Ghostwriter.Models.Configuration> = configPath.endsWith('.js')
    ? require(configPath)
    : JSON.parse(readFileSync(configPath).toString());

  config.scopes =
    config.scopes?.map((scope) => {
      const sanitizedScopeType = scope.type.trim();

      if (!sanitizedScopeType) {
        throw new Error('You provided an empty scope');
      }

      return {
        description: scope.description,
        type: sanitizedScopeType,
      };
    }) ?? [];

  if (!config.types?.length) {
    throw new Error('You must provide types');
  }

  cachedConfig = config as Ghostwriter.Models.Configuration;

  return cachedConfig;
};
