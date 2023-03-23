declare namespace Commitlint {
  namespace API {
    type Casing =
      | 'camel-case'
      | 'kebab-case'
      | 'lower-case'
      | 'pascal-case'
      | 'sentence-case'
      | 'snake-case'
      | 'start-case'
      | 'upper-case';

    type Configuration = {
      parserPreset:
        | {
            parserOpts: {
              headerPattern: RegExp;
            };
          }
        | string;
      rules: Partial<{
        'body-case': RuleValue<Casing | Casing[]>;
        'body-empty': RuleValue<undefined>;
        'body-full-stop': RuleValue<string>;
        'body-leading-blank': RuleValue<undefined>;
        'body-max-length': RuleValue<number>;
        'body-max-line-length': RuleValue<number>;
        'body-min-length': RuleValue<number>;
        'footer-empty': RuleValue<undefined>;
        'footer-leading-blank': RuleValue<undefined>;
        'footer-max-length': RuleValue<number>;
        'footer-max-line-length': RuleValue<number>;
        'footer-min-length': RuleValue<number>;
        'header-case': RuleValue<Casing | Casing[]>;
        'header-full-stop': RuleValue<string>;
        'header-max-length': RuleValue<number>;
        'header-min-length': RuleValue<number>;
        'references-empty': RuleValue<undefined>;
        'scope-case': RuleValue<Casing | Casing[]>;
        'scope-empty': RuleValue<undefined>;
        'scope-enum': RuleValue<string[]>;
        'scope-max-length': RuleValue<number>;
        'scope-min-length': RuleValue<number>;
        'signed-off-by': RuleValue<string>;
        'subject-case': RuleValue<Casing | Casing[]>;
        'subject-empty': RuleValue<undefined>;
        'subject-exclamation-mark': RuleValue<undefined>;
        'subject-full-stop': RuleValue<string>;
        'subject-max-length': RuleValue<number>;
        'subject-min-length': RuleValue<number>;
        'trailer-exists': RuleValue<string>;
        'type-case': RuleValue<Casing | Casing[]>;
        'type-empty': RuleValue<undefined>;
        'type-enum': RuleValue<string[]>;
        'type-max-length': RuleValue<number>;
        'type-min-length': RuleValue<number>;
      }>;
    };

    type Rule<TValue> = TValue extends undefined
      ? [RuleLevel, RuleApplicability]
      : [RuleLevel, RuleApplicability, TValue];

    type RuleApplicability = 'always' | 'never';

    type RuleError = 2;

    type RuleHint = 0;

    type RuleLevel = RuleHint | RuleWarning | RuleError;

    type RuleValue<TValue> = Rule<TValue> | (() => Rule<TValue>) | (() => Promise<Rule<TValue>>);

    type RuleWarning = 1;
  }
}
