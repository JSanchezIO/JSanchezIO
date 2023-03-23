/* eslint-disable no-console */

import chalk from 'chalk';

export class ChalkConsoleLoggingService implements Infrastructure.ILoggingService {
  public error: Infrastructure.ILoggingService['error'] = (message, ...optionalParams) => {
    console.error(chalk.red(message), ...optionalParams);
  };

  public info: Infrastructure.ILoggingService['info'] = (message, ...optionalParams) => {
    console.info(chalk.blue(message), ...optionalParams);
  };

  public log: Infrastructure.ILoggingService['log'] = (message, ...optionalParams) => {
    console.log(chalk.green(message), ...optionalParams);
  };

  public warn: Infrastructure.ILoggingService['warn'] = (message, ...optionalParams) => {
    console.warn(chalk.yellow(message), ...optionalParams);
  };
}
