import * as chalk from 'chalk';

export const logger = {
  error: (...optionalParams: unknown[]) => {
    console.error(chalk.red(`[junit-testrail-reporter] `, ...optionalParams));
  },
  info: (...optionalParams: unknown[]) => {
    console.log(chalk.blue(`[junit-testrail-reporter] `, ...optionalParams));
  },
  success: (...optionalParams: unknown[]) => {
    console.log(chalk.green(`[junit-testrail-reporter] `, ...optionalParams));
  },
  warning: (...optionalParams: unknown[]) => {
    console.warn(chalk.yellow(`[junit-testrail-reporter] `, ...optionalParams));
  },
};
