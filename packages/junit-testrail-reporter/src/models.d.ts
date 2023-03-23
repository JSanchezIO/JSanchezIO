declare namespace JUnitTestRailReporter {
  type Configuration = {
    /** The host of the TestRail server to send results to. */
    host: string;

    /** If true, the reporter will leave the test runs open in TestRail. */
    keepOpen: boolean;

    /** The password, of the user, used to authenticate with TestRail. */
    password: string;

    /** The identifier of the TestRail project to send results to. */
    projectId: number;

    /** The glob pattern for test result files that will be reported to TestRail. */
    resultsPattern: string;

    /** A brief description used to identify the automated test run. */
    runName: string;

    /** The username of the account to authenticate with TestRail. */
    username: string;
  };

  type JUnitReport = {
    testsuites: {
      testsuite?: Array<JUnitReportTestSuite>;
    };
  };

  type JUnitReportTestSuite = {
    testcase?: Array<JUnitReportTestCase>;
  };

  type JUnitReportTestCase = {
    $: {
      name: string;
    };
    failure?: Array<string> | Array<{ _: string }>;
    skipped?: Array<string>;
  };

  type Status = 'failed' | 'passed' | 'skipped';

  type TestCaseResult = { case_id: number; comment?: string; status_id: number };
}
