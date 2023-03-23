/**
 * @see {@link https://eslint.org/docs/latest/use/configure/rules}
 */
export const RuleSeverity = {
  /**
   * Enables the rule and results in an exit code
   * of 1 when a violation is detected.
   */
  Error: 2,

  /**
   * Disables the rule.
   */
  Off: 0,

  /**
   * Enables the rule with no change to the exit
   * code when a violation is detected.
   */
  Warn: 1,
} as const;
