<h1 align="center">junit-testrail-reporter</h1>

<div align="center">

[![NPM Package Version](https://img.shields.io/npm/v/junit-testrail-reporter)](https://www.npmjs.com/package/junit-testrail-reporter)

</div>

<br />

You've got some test cases in TestRail that are automated and the results are ouputted in a JUnit
format. This will report the results as a run in TestRail.

<br />

## Installation

<details>
  <summary><strong>npm</strong></summary>

```sh
npm install --save-dev junit-testrail-reporter
```

</details>

<br />

<details open>
  <summary><strong>pnpm</strong></summary>

```sh
pnpm install --save-dev junit-testrail-reporter
```

</details>

<br />

<details>
  <summary><strong>yarn</strong></summary>

```sh
yarn add --dev junit-testrail-reporter
```

</details>

<br />

## Usage

1. Add the test suite and case identifier in the title of your test:

   ```js
     ...

     it('S123456 C123456 given some scenario when an action is taken then something is true', () => {})

     // multiple test cases are supported as well
     test('S123456 C654321 C654321 C678901 given some scenario when an action is taken then something is true', () => {})

     // so are multiple test suites
     test('S123456 C123456 S654321 C654321 C678901 given some scenario when an action is taken then something is true', () => {})

     ...
   ```

2. Configure and run your tests to output a JUnit test report

   - https://github.com/jest-community/jest-junit
   - https://github.com/michaelleeallen/mocha-junit-reporter

3. Run

   ```sh
   npx junit-testrail-reporter --resultsPattern='test-results/*.xml'
   ```

   ```sh
   pnpm exec junit-testrail-reporter --resultsPattern='test-results/*.xml'
   ```

   ```sh
   yarn exec junit-testrail-reporter --resultsPattern='test-results/*.xml'
   ```

<br />

## Configuration

| Argument Name           | Environment Variable    | Description                                                               | Required | Default                                            |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------- | -------- | -------------------------------------------------- |
| `host` or `h`           | `TESTRAIL_HOST`         | The host of the TestRail server to send results to.                       | ✔️       | -                                                  |
| `keepOpen`              | `TESTRAIL_KEEP_OPEN`    | If true, the reporter will leave the test runs open in TestRail.          | ❌       | `false`                                            |
| -                       | `TESTRAIL_PASSWORD`     | The password, of the user, used to authenticate with TestRail.            | ✔️       | -                                                  |
| `milestoneId`           | `TESTRAIL_MILESTONE_ID` | The identifier, if any, of the milestone to group test results under.     | ✔️       | -                                                  |
| `projectId`             | `TESTRAIL_PROJECT_ID`   | The identifier of the TestRail project to send results to.                | ✔️       | -                                                  |
| `resultsPattern` or `p` | -                       | The glob pattern for test result files that will be reported to TestRail. | ✔️       | -                                                  |
| `runName` or `r`        | `TESTRAIL_RUN_NAME`     | A brief description used to identify the automated test run.              | ❌       | `"Automated Test Run via junit-testrail-reporter"` |
| `username` or `u`       | `TESTRAIL_USERNAME`     | The username of the account to authenticate with TestRail.                | ✔️       | -                                                  |

<br />

> The **password** configuration parameter can only be set via environment variable.

> The **resultsPattern** configuration parameter can only be set via command line arguments.
