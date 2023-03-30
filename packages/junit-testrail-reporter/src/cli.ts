#!/usr/bin/env node

import { argv } from 'process';
import * as yargs from 'yargs';
import { logger } from './logger';
import { Reporter } from './reporter';

const execute = async () => {
  const cli = yargs
    .command('$0', 'Reports JUnit test results to TestRail', (args) => {
      args.demandCommand(0, 0).usage(`Reports JUnit test results to TestRail

  Usage:
    junit-testrail-reporter [options]`);
    })
    .option('host', {
      alias: 'h',
      default: process.env.TESTRAIL_HOST,
      describe: 'The host of the TestRail server to send results to.',
      type: 'string',
    })
    .option('milestoneId', {
      default: process.env.TESTRAIL_MILESTONE_ID,
      describe: 'The identifier, if any, of the milestone to group test results under.',
      type: 'number',
    })
    .option('keepOpen', {
      default: process.env.TESTRAIL_KEEP_OPEN === 'true',
      describe: 'If true, the reporter will leave the test runs open in TestRail.',
      type: 'boolean',
    })
    .option('projectId', {
      default: process.env.TESTRAIL_PROJECT_ID,
      describe: 'The identifier of the TestRail project to send results to.',
      type: 'number',
    })
    .option('resultsPattern', {
      alias: 'p',
      describe: 'Test Results Pattern',
      requiresArg: true,
      type: 'string',
    })
    .option('runName', {
      alias: 'r',
      default: process.env.TESTRAIL_RUN_NAME ?? 'Automated Test Run via junit-testrail-reporter',
      describe: 'A brief description used to identify the automated test run.',
      type: 'string',
    })
    .option('username', {
      alias: 'u',
      default: process.env.TESTRAIL_USERNAME,
      describe: 'The username of the account to authenticate with TestRail.',
      type: 'string',
    });

  const options: Partial<
    Omit<JUnitTestRailReporter.Configuration, 'milestoneId' | 'projectId'> & {
      milestoneId?: string | number;
      projectId?: string | number;
    }
  > = cli.parseSync(argv.slice(2));

  const reporter = new Reporter({
    host: options.host,
    keepOpen: options.keepOpen,
    milestoneId:
      options.milestoneId === undefined ? undefined : parseInt(options.milestoneId.toString(), 10),
    password: process.env.TESTRAIL_PASSWORD,
    projectId:
      options.projectId === undefined ? undefined : parseInt(options.projectId.toString(), 10),
    resultsPattern: options.resultsPattern,
    runName: options.runName,
    username: options.username,
  });

  await reporter.reportResults();
};

execute()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    logger.error(error);
    process.exit(-1);
  });
